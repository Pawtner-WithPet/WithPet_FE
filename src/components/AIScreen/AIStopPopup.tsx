import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

interface AIStopPopupProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AIStopPopup: React.FC<AIStopPopupProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const currentKeywords = ["포메라니안", "흰색", "도봉구"];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {/* 닫기 버튼 */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {/* 키워드 문장 */}
          <Text style={styles.keywordSentence}>
            '포메라니안', '흰색', '도봉구'{"\n"}
            키워드로 탐색 중입니다.
          </Text>

          {/* 질문 텍스트 */}
          <Text style={styles.questionText}>
            탐색을 정말로 종료하시겠습니까?
          </Text>

          {/* 확인 버튼 */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={onConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>
              실시간 AI 탐색 종료하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  popup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 24,
    right: 24,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "400",
  },
  keywordSentence: {
    fontSize: 18.69,
    color: "#000000",
    textAlign: "center",
    marginBottom: 38,
    marginTop: 40,
    lineHeight: 22,
    fontWeight: "bold",
  },
  questionText: {
    fontSize: 18.69,
    color: "#000000",
    textAlign: "center",
    marginBottom: 50,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#161F40",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    width: "100%",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default AIStopPopup;
