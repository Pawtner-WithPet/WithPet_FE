import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
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
      console.log("🎯 카메라 권한 granted?", granted);
      if (!granted) {
        Alert.alert("카메라 권한이 필요합니다.");
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
      console.log("📸 촬영된 사진 URI:", photo.path);

      // 사진 촬영 후 NoseImagePick으로 이동하면서 사진 URI 전달
      navigation.navigate("NoseImagePick", {
        imageUri: `file://${photo.path}`,
      });
    } catch (error) {
      console.error("사진 촬영 오류:", error);
    } finally {
      setIsTakingPhoto(false);
    }
  };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        selectionLimit: 1,
      });

      if (result.assets?.[0]?.uri) {
        console.log("🖼️ 갤러리 사진 URI:", result.assets[0].uri);

        // 갤러리에서 사진 선택 후 NoseImagePick으로 이동하면서 사진 URI 전달
        navigation.navigate("NoseImagePick", {
          imageUri: result.assets[0].uri,
        });
      }
    } catch (error) {
      console.error("갤러리 열기 오류:", error);
    }
  };

  if (!hasPermission || !device) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      {device && (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
      )}

      <View style={styles.buttonContainer}>
        {/* 갤러리 버튼 */}
        <TouchableOpacity onPress={openGallery}>
          <Image
            source={require("../../../assets/Camera/gallay_button.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* 촬영 버튼 */}
        <TouchableOpacity onPress={takePhoto}>
          <Image
            source={require("../../../assets/Camera/camera_button.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* 뒤로가기 버튼 */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/Camera/list_button.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    width: 60,
    height: 60,
  },
});

export default NoseCamera;
