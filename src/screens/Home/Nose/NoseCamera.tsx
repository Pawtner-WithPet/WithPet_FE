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
import { useRoute } from "@react-navigation/native";
import NoseImagePickModal from "./NoseImagePickModal";
import NoseImageRModal from "./NoseImageRModal";
import { uploadNoseprintImage } from "../../../services/api/NoseRegister";

type NoseCameraRouteParams = {
  fromScreen?: "PetDetail" | "NoseList";
  petId?: string;
};

type NoseStackParamList = {
  NoseCamera: NoseCameraRouteParams;
};

type NoseCameraNavigationProp = NativeStackNavigationProp<
  NoseStackParamList,
  "NoseCamera"
>;

const NoseCamera = () => {
  const navigation = useNavigation<NoseCameraNavigationProp>();
  const route = useRoute<RouteProp<NoseStackParamList, "NoseCamera">>();
  const { fromScreen, petId } = route.params || {};

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

      if (fromScreen === "PetDetail") {
        setShowNoseImageRModal(true);
      } else {
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

        if (fromScreen === "PetDetail") {
          setShowNoseImageRModal(true);
        } else {
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
    // 실종 동물 신고 화면으로 네비게이션
    // navigation.navigate("LostPetReport", { imageUri: capturedImageUri });
  };

  const handleFoundPet = () => {
    console.log("발견 동물 신고");
    setShowNoseImagePickModal(false);
    // 발견 동물 신고 화면으로 네비게이션
    // navigation.navigate("FoundPetReport", { imageUri: capturedImageUri });
  };

  const handleRegister = async () => {
    console.log("비문 등록하기 클릭");

    // petId가 없으면 경고
    if (!petId) {
      Alert.alert("오류", "반려동물 정보를 찾을 수 없습니다.");
      return;
    }

    // 이미지 URI가 없으면 경고
    if (!capturedImageUri) {
      Alert.alert("오류", "등록할 이미지를 찾을 수 없습니다.");
      return;
    }

    setIsUploading(true);

    try {
      // API 호출
      const result = await uploadNoseprintImage(
        capturedImageUri,
        parseInt(petId),
        1, // ownerId - 실제 사용자 ID로 변경 필요
      );

      if (result) {
        Alert.alert("성공", "비문이 성공적으로 등록되었습니다!", [
          {
            text: "확인",
            onPress: () => {
              setShowNoseImageRModal(false);
              setCapturedImageUri("");
              navigation.goBack(); // 이전 화면으로 돌아가기
            },
          },
        ]);
      } else {
        Alert.alert("실패", "비문 등록에 실패했습니다. 다시 시도해주세요.");
      }
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

      <View style={styles.buttonContainer}>
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
        <TouchableOpacity onPress={navigation.goBack} style={styles.sideButton}>
          <Image source={ListButton} style={styles.sideIcon} />
        </TouchableOpacity>
      </View>

      {/* 모달들 */}
      <NoseImagePickModal
        visible={showNoseImagePickModal}
        imageUri={capturedImageUri}
        onClose={handleClosePickModal}
        onTryAgain={handleTryAgain}
        onLostPet={handleLostPet}
        onFoundPet={handleFoundPet}
      />

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
});

export default NoseCamera;
