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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NoseStackParamList } from "../../../navigation/NoseStack";
import GalleryButton from "../../../assets/Camera/gallay_button.png";
import CameraButton from "../../../assets/Camera/camera_button.png";
import ListButton from "../../../assets/Camera/list_button.png";
import focus from "../../../assets/Camera/focus.png";
import back from "../../../assets/Camera/back.png";

type NoseCameraNavigationProp = NativeStackNavigationProp<
  NoseStackParamList,
  "NoseCamera"
>;

const NoseCamera = () => {
  const navigation = useNavigation<NoseCameraNavigationProp>();
  const cameraRef = useRef<Camera>(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === "back");
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);

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

      navigation.navigate("NoseImagePick", {
        imageUri: `file://${photo.path}`,
      });
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
        navigation.navigate("NoseImagePick", {
          imageUri: result.assets[0].uri,
        });
      }
    } catch (error) {
      Alert.alert("갤러리 오류", "갤러리를 열 수 없습니다. 다시 시도해주세요.");
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
          <Text style={styles.guideText}>코가 잘 보이도록{"\n"}촬영해주세요</Text>
        </View>
      </View>
      
      <Image source={focus} style={styles.focus} />

      <View style={styles.bottomOverlay}>
        <View style={styles.buttonContainer}>
          {/* 갤러리 버튼 */}
          <TouchableOpacity onPress={openGallery} style={styles.sideButton}>
            <Image source={GalleryButton} style={styles.sideIcon} />
          </TouchableOpacity>

          {/* 촬영 버튼 */}
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
          {/* 뒤로가기 버튼 */}
          <TouchableOpacity onPress={navigation.goBack} style={styles.sideButton}>
            <Image source={ListButton} style={styles.sideIcon} />
          </TouchableOpacity>
        </View>
      </View>
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
    transform: [{ translateX: -200 }, { translateY: -240 }, ],
    zIndex: 10,
    resizeMode: "contain",
  },
  guideRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8, 
    paddingLeft: 20,
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
