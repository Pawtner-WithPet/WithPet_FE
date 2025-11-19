import React, { useState, useEffect } from "react";
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
import { getPetDetail } from "../../services/api/PetDetail";
import { PetDetail } from "../../types/PetTypes";

interface RealTimeSearchPopupProps {
  visible: boolean;
  onClose: () => void;
  onStart: (keywords: string[]) => void;
  petId: number; // petId를 props로 받도록 수정
}

const AIKeyWordPopup: React.FC<RealTimeSearchPopupProps> = ({
  visible,
  onClose,
  onStart,
  petId,
}) => {
  const [keywords, setKeywords] = useState<string[]>([]); // 빈 배열로 초기화
  const [newKeyword, setNewKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 반려견 정보 자동 설정
  useEffect(() => {
    const fetchPetDetail = async () => {
      try {
        const petDetail: PetDetail = await getPetDetail(petId); // petId로 반려견 정보 가져오기
        const newKeywords = [
          petDetail.kindNm, // 견종
          petDetail.sexNm, // 성별
        ];

        // 기존 키워드 배열에 추가
        setKeywords(newKeywords);
      } catch (error) {
        console.error("반려견 정보 불러오기 실패:", error);
        Alert.alert("오류", "반려견 정보를 불러오는 데 실패했습니다.");
      }
    };

    if (petId) {
      fetchPetDetail();
    }
  }, [petId]);

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

      console.log("실시간 AI 탐색 시작 요청:", {
        userId: 1,
        petId: 1,
        status: "lost",
        keywords: keywords.join(", "),
        keywordsArray: keywords,
      });

      // 실시간 검색 API 호출
      const response = await startRealtimeSearchWithKeywords(
        1, // 임시 userId
        1, // 임시 petId
        "lost", // 상태
        keywords,
      );

      console.log("실시간 검색 응답:", response);

      if (response.status === 200) {
        console.log("실시간 검색 시작 성공:", response);
        onStart(keywords);
        onClose();
        Alert.alert("성공", "실시간 AI 탐색이 시작되었습니다.");
      } else {
        console.error("실시간 검색 시작 실패 - 응답:", response);
        Alert.alert("오류", response.message);
      }
    } catch (error: any) {
      console.error("실시간 검색 시작 중 예상치 못한 오류:", error);
      Alert.alert(
        "오류",
        "예상치 못한 오류가 발생했습니다. 다시 시도해주세요.",
      );
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
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>
            다음 키워드로 탐색을 실시합니다.
            {"\n"}
            필요시 키워드를 추가, 수정하세요.
          </Text>

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
    marginTop: -8,
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
    paddingRight: 40,
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
