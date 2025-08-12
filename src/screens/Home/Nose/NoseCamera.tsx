import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import {
  Camera,
  useCameraDevices,
  useCameraPermission,
  PhotoFile,
} from "react-native-vision-camera";
import { launchImageLibrary } from "react-native-image-picker";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import GalleryButton from "../../../assets/Camera/gallery_button.png";
import CameraButton from "../../../assets/Camera/camera_button.png";
import ListButton from "../../../assets/Camera/list_button.png";
import focus from "../../../assets/Camera/focus.png";
import back from "../../../assets/Camera/back.png";
import { useRoute } from "@react-navigation/native";
import NoseImagePickModal from "./NoseImagePickModal";
import NoseImageRModal from "./NoseImageRModal";
import { RootStackParamList } from "../../../types/NoseCamera";
import { useNavigation as useTabNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { TabParamList } from "../../../navigation/TabNavigator";
import {
  updateNoseprintImage,
  uploadNoseprintImage,
} from "../../../services/api/NoseRegister";

type NoseCameraRouteParams = {
  fromScreen?: "PetDetail" | "NoseList" | "NoseScreen";
  petId?: string;
  hasNoseprint?: boolean;
};

type NoseStackParamList = {
  NoseCamera: NoseCameraRouteParams;
  NoseList: undefined;
};

type NoseCameraRouteProp = RouteProp<RootStackParamList, "NoseCamera">;

const NoseCamera = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const tabNavigation =
    useTabNavigation<BottomTabNavigationProp<TabParamList>>();
  const route = useRoute<RouteProp<NoseStackParamList, "NoseCamera">>();
  const { fromScreen, petId, hasNoseprint } = route.params || {};

  const cameraRef = useRef<Camera>(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === "back");
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 모달 상태 관리
  const [showNoseImagePickModal, setShowNoseImagePickModal] = useState(false);
  const [showNoseImageRModal, setShowNoseImageRModal] = useState(false);
  const [capturedImageUri, setCapturedImageUri] = useState<string>("");

  useEffect(() => {
    (async () => {
      const granted = await requestPermission();
      if (!granted) {
        Alert.alert(
          "카메라 권한 필요",
          "반려동물 코 촬영을 위해 카메라 권한이 필요합니다.",
          [{ text: "확인" }],
        );
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (isTakingPhoto || !cameraRef.current) return;
    setIsTakingPhoto(true);

    try {
      const photo: PhotoFile = await cameraRef.current.takePhoto({
        flash: "off",
      });

      const imageUri = `file://${photo.path}`;
      setCapturedImageUri(imageUri);

      // fromScreen에 따라 다른 모달 열기
      if (fromScreen === "NoseList" || fromScreen === "NoseScreen") {
        // 비문 등록/수정 모달 열기
        setShowNoseImageRModal(true);
      } else {
        // 실종/발견 동물 선택 모달 열기 (기본값)
        setShowNoseImagePickModal(true);
      }
    } catch (error) {
      Alert.alert("촬영 실패", "사진 촬영에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsTakingPhoto(false);
    }
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        selectionLimit: 1,
        quality: 0.8,
      });

      if (result.assets?.[0]?.uri) {
        setCapturedImageUri(result.assets[0].uri);

        // fromScreen에 따라 다른 모달 열기
        if (fromScreen === "NoseList" || fromScreen === "NoseScreen") {
          // 비문 등록/수정 모달 열기
          setShowNoseImageRModal(true);
        } else {
          // 실종/발견 동물 선택 모달 열기 (기본값)
          setShowNoseImagePickModal(true);
        }
      }
    } catch (error) {
      Alert.alert("갤러리 오류", "갤러리를 열 수 없습니다. 다시 시도해주세요.");
    }
  };

  // 모달 핸들러들
  const handleClosePickModal = () => {
    setShowNoseImagePickModal(false);
    setCapturedImageUri("");
  };

  const handleCloseRModal = () => {
    setShowNoseImageRModal(false);
    setCapturedImageUri("");
  };

  const handleTryAgain = () => {
    setShowNoseImagePickModal(false);
    setShowNoseImageRModal(false);
    setCapturedImageUri("");
  };

  const handleLostPet = () => {
    console.log("실종 동물 신고");
    setShowNoseImagePickModal(false);
    // 실종 동물 신고 - 내 반려동물을 찾는 경우이므로 type을 'found'로 설정
    navigation.navigate("NoseResult", {
      dogId: 1, // 실제 검색 결과 ID로 교체 필요
      type: "found", // 실종된 내 반려동물을 찾는 경우
      from: "capture",
    });
  };

  const handleFoundPet = () => {
    console.log("발견 동물 신고");
    setShowNoseImagePickModal(false);
    // 발견 동물 신고 - 다른 사람의 반려동물을 발견한 경우이므로 type을 'lost'로 설정
    navigation.navigate("NoseResult", {
      dogId: 1, // 실제 검색 결과 ID로 교체 필요
      type: "lost", // 발견한 동물과 실종 동물을 매칭하는 경우
      from: "capture",
    });
  };

  const handleRegister = async () => {
    if (!petId) {
      Alert.alert("오류", "반려동물 정보를 찾을 수 없습니다.");
      return;
    }

    if (!capturedImageUri) {
      Alert.alert("오류", "등록할 이미지를 찾을 수 없습니다.");
      return;
    }

    setIsUploading(true);

    try {
      let result;

      if (hasNoseprint) {
        // ✅ 이미 등록된 경우 → 비문 수정 API 호출
        result = await updateNoseprintImage(parseInt(petId), capturedImageUri);
      } else {
        // ✅ 등록되지 않은 경우 → 신규 등록 API 호출
        result = await uploadNoseprintImage(
          capturedImageUri,
          parseInt(petId),
          1,
        );
      }

      if (result) {
        Alert.alert("성공", "비문이 성공적으로 등록되었습니다!", [
          {
            text: "확인",
            onPress: () => {
              setShowNoseImageRModal(false);
              setCapturedImageUri("");
              navigation.goBack();
            },
          },
        ]);
      } else {
        Alert.alert("실패", "비문 등록에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("비문 등록 중 오류 발생:", error);
      Alert.alert(
        "오류",
        "비문 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>카메라 권한이 필요합니다</Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>권한 요청</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>카메라를 사용할 수 없습니다</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      <View style={styles.topOverlay}>
        <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
          <Image source={back} style={styles.backIcon} />
        </TouchableOpacity>

        <View style={styles.guideTextContainer}>
          <Text style={styles.guideText}>
            코가 잘 보이도록{"\n"}촬영해주세요
          </Text>
        </View>
      </View>

      <Image source={focus} style={styles.focus} />

      <View style={styles.bottomOverlay}>
        <View style={styles.buttonContainer}>
          {/* 갤러리 버튼 */}
          <TouchableOpacity onPress={openGallery} style={styles.sideButton}>
            <Image source={GalleryButton} style={styles.sideIcon} />
          </TouchableOpacity>

          {/* 카메라 버튼 */}
          <TouchableOpacity
            onPress={takePhoto}
            style={[styles.cameraButton, isTakingPhoto && styles.takingPhoto]}
            disabled={isTakingPhoto}
          >
            <Image source={CameraButton} style={styles.cameraIcon} />
            {isTakingPhoto && (
              <View style={styles.loadingOverlay}>
                <Text style={styles.loadingText}>촬영 중...</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* 리스트 버튼 */}
          <TouchableOpacity
            onPress={() =>
              tabNavigation.navigate("Nose", { screen: "NoseListScreen" })
            }
            style={styles.sideButton}
          >
            <Image source={ListButton} style={styles.sideIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 실종/발견 동물 선택 모달 (기본 카메라 사용시) */}
      <NoseImagePickModal
        visible={showNoseImagePickModal}
        imageUri={capturedImageUri}
        onClose={handleClosePickModal}
        onTryAgain={handleTryAgain}
        onLostPet={handleLostPet}
        onFoundPet={handleFoundPet}
      />

      {/* 비문 등록/수정 모달 (NoseScreen이나 PetDetail에서 온 경우) */}
      <NoseImageRModal
        visible={showNoseImageRModal}
        imageUri={capturedImageUri}
        onClose={handleCloseRModal}
        onTryAgain={handleTryAgain}
        onRegister={handleRegister}
        isUploading={isUploading} // 업로드 상태 전달
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  permissionText: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  permissionButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  sideButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  sideIcon: {
    width: 50,
    height: 50,
  },
  cameraButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cameraIcon: {
    width: 80,
    height: 80,
  },
  takingPhoto: {
    opacity: 0.6,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 40,
  },
  loadingText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  topOverlay: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 120,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    zIndex: 2,
  },

  bottomOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 200,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
    paddingBottom: 20,
    zIndex: 2,
  },

  guideText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 22,
  },

  focus: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 400,
    height: 400,
    transform: [{ translateX: -200 }, { translateY: -240 }],
    zIndex: 10,
    resizeMode: "contain",
  },

  backIcon: {
    width: 40,
    height: 40,
    marginLeft: 8,
    marginTop: 10,
  },
  guideTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 16,
    padding: 8,
    zIndex: 3,
  },
});

export default NoseCamera;
