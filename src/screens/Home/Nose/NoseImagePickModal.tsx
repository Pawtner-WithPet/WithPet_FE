import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Modal,
  StatusBar,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface NoseImagePickModalProps {
  visible: boolean;
  imageUri: string;
  onClose: () => void;
  onLostPet: () => void;
  onFoundPet: () => void;
  onTryAgain: () => void;
}

const NoseImagePickModal: React.FC<NoseImagePickModalProps> = ({
  visible,
  imageUri,
  onClose,
  onLostPet,
  onFoundPet,
  onTryAgain,
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

            {/* 질문 텍스트 */}
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                촬영한 동물이 실종동물인가요?
              </Text>
              <Text style={styles.questionText}>발견 동물인가요?</Text>
            </View>

            {/* 선택 버튼들 */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.choiceButton, styles.lostButton]}
                onPress={onLostPet}
              >
                <Text style={styles.choiceButtonText}>실종 동물</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.choiceButton, styles.foundButton]}
                onPress={onFoundPet}
              >
                <Text style={styles.choiceButtonText}>발견 동물</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 24,
    minWidth: 120,
    alignItems: "center",
  },
  retakeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  questionContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  questionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 27,
    width: "100%",
    justifyContent: "center",
  },
  choiceButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    maxWidth: 140,
  },
  lostButton: {
    backgroundColor: "#161F40",
  },
  foundButton: {
    backgroundColor: "#161F40",
  },
  choiceButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default NoseImagePickModal;
