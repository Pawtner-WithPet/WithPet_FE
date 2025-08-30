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
  Alert,
} from "react-native";
import { startRealtimeSearchWithKeywords } from "../../services/api/AIBtn";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const handleStartSearch = async () => {
    if (keywords.length === 0) {
      Alert.alert("알림", "최소 하나의 키워드를 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);

      // 키워드를 쉼표와 공백으로 구분된 문자열로 변환
      const keywordsString = keywords.join(", ");

      console.log("실시간 AI 탐색 시작 요청:", {
        userId: 1,
        petId: 1,
        status: "lost",
        keywords: keywordsString,
        keywordsArray: keywords,
      });

      // 실시간 검색 API 호출
      const response = await startRealtimeSearchWithKeywords(
        1, // 임시 userId
        1, // 임시 petId
        "lost", // status
        keywords,
      );

      if (response && response.status === 200) {
        console.log("실시간 검색 시작 성공:", response);

        // 성공 시 기존 onStart 콜백 호출
        onStart(keywords);
        onClose();

        Alert.alert("성공", "실시간 AI 탐색이 시작되었습니다.");
      } else {
        console.error("실시간 검색 시작 실패 - 응답:", response);
        Alert.alert(
          "오류",
          response?.message ||
            "실시간 탐색 시작에 실패했습니다. 다시 시도해주세요.",
        );
      }
    } catch (error: any) {
      console.error("실시간 검색 시작 중 오류:", error);

      // 더 상세한 에러 정보 로깅
      if (error.response) {
        console.error("에러 응답 상태:", error.response.status);
        console.error("에러 응답 데이터:", error.response.data);
        console.error("에러 응답 헤더:", error.response.headers);
      }

      let errorMessage = "네트워크 오류가 발생했습니다.";
      if (error.response?.status === 500) {
        errorMessage =
          "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      } else if (error.response?.status === 400) {
        errorMessage = "요청 데이터에 문제가 있습니다. 키워드를 확인해주세요.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Alert.alert("오류", errorMessage);
    } finally {
      setIsLoading(false);
    }
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
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={handleAddKeyword}
              style={styles.addButton}
              disabled={isLoading}
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
                  <TouchableOpacity
                    onPress={() => handleRemoveKeyword(index)}
                    disabled={isLoading}
                  >
                    <Text style={styles.removeText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* 시작 버튼 */}
          <TouchableOpacity
            style={[
              styles.startButton,
              isLoading && styles.startButtonDisabled,
            ]}
            onPress={handleStartSearch}
            disabled={isLoading}
          >
            <Text style={styles.startButtonText}>
              {isLoading ? "시작 중..." : "실시간 AI 탐색 시작하기"}
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
  startButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },
  startButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AIKeyWordPopup;
