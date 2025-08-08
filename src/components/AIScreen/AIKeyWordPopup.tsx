import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

// 아이콘은 react-native-vector-icons나 다른 아이콘 라이브러리 사용
// 예시로는 텍스트로 대체
const XIcon = () => <Text style={styles.iconText}>✕</Text>;
const EditIcon = () => <Text style={styles.iconText}>✎</Text>;

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
    const updatedKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(updatedKeywords);
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
              <XIcon />
            </TouchableOpacity>
          </View>

          {/* 메인 텍스트 */}
          <View style={styles.mainContent}>
            <Text style={styles.title}>다음 키워드로 탐색을 실시합니다.</Text>
            <Text style={styles.subtitle}>
              필요시 키워드를 추가·수정하세요.
            </Text>
          </View>

          {/* 키워드 섹션 */}
          <View style={styles.keywordSection}>
            <View style={styles.keywordHeader}>
              <View style={styles.addKeywordContainer}>
                <TextInput
                  style={styles.keywordInput}
                  placeholder="입력..."
                  value={newKeyword}
                  onChangeText={setNewKeyword}
                  onSubmitEditing={handleAddKeyword}
                  returnKeyType="done"
                />
                <TouchableOpacity
                  onPress={handleAddKeyword}
                  style={styles.editButton}
                >
                  <EditIcon />
                </TouchableOpacity>
              </View>
            </View>

            {/* 키워드 태그들 */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.keywordContainer}>
                {keywords.map((keyword, index) => (
                  <View key={index} style={styles.keywordTag}>
                    <Text style={styles.keywordText}>{keyword}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveKeyword(index)}
                      style={styles.removeButton}
                    >
                      <Text style={styles.removeText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

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
  editButton: {
    padding: 4,
    borderRadius: 12,
  },
  keywordContainer: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 4,
  },
  keywordTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  keywordText: {
    fontSize: 12,
    color: "#1976D2",
    fontWeight: "500",
  },
  removeButton: {
    marginLeft: 6,
    padding: 2,
  },
  removeText: {
    fontSize: 12,
    color: "#666",
  },
  popup: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 340,
  },
  header: {
    alignItems: "flex-end",
    marginBottom: 16,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
  },
  iconText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "500",
  },
  mainContent: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  keywordSection: {
    marginBottom: 32,
  },
  keywordHeader: {
    marginBottom: 12,
  },
  addKeywordContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  keywordInput: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  startButton: {
    backgroundColor: "#2196F3",
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
