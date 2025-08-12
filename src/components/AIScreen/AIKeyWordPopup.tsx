import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";

interface RealTimeSearchPopupProps {
  visible: boolean;
  onClose: () => void;
  onStart: (keywords: string[]) => void;
}

const AIKeyWordPopup: React.FC<RealTimeSearchPopupProps> = ({
  visible,
  onClose,
  onStart,
}) => {
  const [keywords, setKeywords] = useState<string[]>([
    "포메라니안",
    "흰색",
    "도봉구",
  ]);
  const [newKeyword, setNewKeyword] = useState("");

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const handleStartSearch = () => {
    onStart(keywords);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {/* 헤더 */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* 메인 텍스트 */}
          <Text style={styles.title}>
            다음 키워드로 탐색을 실시합니다.
            {"\n"}
            필요시 키워드를 추가, 수정하세요.
          </Text>

          {/* 키워드 입력 */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.keywordInput}
              placeholder="키워드 입력"
              value={newKeyword}
              onChangeText={setNewKeyword}
              onSubmitEditing={handleAddKeyword}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={handleAddKeyword}
              style={styles.addButton}
            >
              <Image
                source={require("../../assets/icons/search.png")}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>

          {/* 키워드 태그들 */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.keywordContainer}>
              {keywords.map((keyword, index) => (
                <View key={index} style={styles.keywordTag}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                  <TouchableOpacity onPress={() => handleRemoveKeyword(index)}>
                    <Text style={styles.removeText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* 시작 버튼 */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartSearch}
          >
            <Text style={styles.startButtonText}>실시간 AI 탐색 시작하기</Text>
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
  },
  header: {
    alignItems: "flex-end",
    marginBottom: 16,
    marginTop: -8, // 상단 여백 조정
  },
  closeButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "400",
  },
  title: {
    fontSize: 19,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  inputContainer: {
    position: "relative",
    marginBottom: 12,
  },
  keywordInput: {
    backgroundColor: "#D9D9D940",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingRight: 40, // 아이콘 공간 확보
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  addButton: {
    position: "absolute",
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  keywordContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 32,
  },
  keywordTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  keywordText: {
    fontSize: 12,
    color: "#000000",
    fontWeight: "500",
    marginRight: 6,
  },
  removeText: {
    fontSize: 12,
    color: "#EA4335",
    padding: 2,
  },
  startButton: {
    backgroundColor: "#161F40",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  startButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AIKeyWordPopup;
