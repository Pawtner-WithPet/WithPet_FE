import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";

interface ImageUploaderProps {
  imageUri: string | null;
  onChangeImage: (uri: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageUri,
  onChangeImage,
}) => {
  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
      },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.error("ImagePicker Error:", response.errorMessage);
          return;
        }

        const uri = response.assets?.[0]?.uri;
        if (uri) {
          onChangeImage(uri);
        }
      },
    );
  };

  return (
    <Pressable onPress={handleSelectImage} style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Icon name="camera" size={32} color="#aaa" />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageUploader;
