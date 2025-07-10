import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface NoseImageRModalProps {
  visible: boolean;
  imageUri: string;
  onClose: () => void;
  onTryAgain: () => void;
  onRegister: () => void;
  isUploading?: boolean;
}

const NoseImageRModal: React.FC<NoseImageRModalProps> = ({
  visible,
  imageUri,
  onClose,
  onTryAgain,
  onRegister,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.8)"
      />

      <View style={styles.modalContainer}>
        {/* 배경 터치 시 닫기 */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* 닫기 버튼 */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>

        {/* 메인 컨텐츠 */}
        <View style={styles.contentContainer}>
          <View style={styles.imageCard}>
            <Image source={{ uri: imageUri }} style={styles.capturedImage} />

            {/* 다시 촬영하기 버튼 */}
            <TouchableOpacity style={styles.retakeButton} onPress={onTryAgain}>
              <Text style={styles.retakeButtonText}>다시 촬영하기</Text>
            </TouchableOpacity>

            {/* 등록하기 버튼 */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={onRegister}
            >
              <Text style={styles.registerButtonText}>비문 등록하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1000,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 24,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  imageCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    maxWidth: width * 0.9,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  capturedImage: {
    width: width * 0.7,
    height: width * 0.9,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 20,
  },
  retakeButton: {
    backgroundColor: "#4262FF",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
    minWidth: 120,
    alignItems: "center",
  },
  retakeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "#161F40",
    paddingHorizontal: 100,
    paddingVertical: 12,
    borderRadius: 10,
    minWidth: 120,
    alignItems: "center",
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default NoseImageRModal;
