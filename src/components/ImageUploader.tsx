import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from "react-native-image-picker";

interface ProfileImagePickerProps {
  imageUri?: string;
  onImageSelected: (uri: string) => void;
}

export const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({
  imageUri,
  onImageSelected,
}) => {
  const showImagePicker = () => {
    Alert.alert("사진 선택", "프로필 사진을 어떻게 추가하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "카메라", onPress: openCamera },
      { text: "갤러리", onPress: openGallery },
    ]);
  };

  const openCamera = () => {
    const options = {
      mediaType: "photo" as MediaType,
      quality: 0.8 as const, // ✅ 수정됨
      maxWidth: 800,
      maxHeight: 800,
    };

    launchCamera(options, handleImageResponse);
  };

  const openGallery = () => {
    const options = {
      mediaType: "photo" as MediaType,
      quality: 0.8 as const, // ✅ 수정됨
      maxWidth: 800,
      maxHeight: 800,
    };

    launchImageLibrary(options, handleImageResponse);
  };

  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.didCancel || response.errorMessage) {
      return;
    }

    if (response.assets && response.assets[0]) {
      const asset = response.assets[0];
      if (asset.uri) {
        onImageSelected(asset.uri);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={showImagePicker}>
        <View style={styles.profileImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>+</Text>
              <Text style={styles.placeholderSubText}>사진 추가</Text>
            </View>
          )}
          <View style={styles.cameraIcon}>
            <Text style={styles.cameraText}>📷</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 30,
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e8f0ff",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
  },
  placeholderText: {
    fontSize: 24,
    color: "#999999",
    marginBottom: 4,
  },
  placeholderSubText: {
    fontSize: 12,
    color: "#999999",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  cameraText: {
    fontSize: 16,
  },
});
