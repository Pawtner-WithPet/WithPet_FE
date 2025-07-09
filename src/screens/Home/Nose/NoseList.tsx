import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "../../../components/Header";
import { Colors } from "../../../constants/colors";
import NoseCard from "../../../components/NoseList/NoseCard";
import FloatingBtn from "../../../components/NoseList/FloatingBtn";
import { useNavigation } from "@react-navigation/native";
import dogIcon from "../../../assets/icons/dog.png";
import cameraIcon from "../../../assets/icons/camera.png";
import {
  fetchNoseprintPets,
  NoseprintPet,
  fetchNoseprintSearchList,
  NoseprintSearchResult,
} from "../../../services/api/NoseList";

const NoseScreen: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDogListVisible, setIsDogListVisible] = useState(false);
  const [dogList, setDogList] = useState<NoseprintPet[]>([]);
  const [noseData, setNoseData] = useState<NoseprintSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingNoseData, setIsLoadingNoseData] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    loadDogList();
    loadNoseprintList();
  }, []);

  const loadDogList = async () => {
    setIsLoading(true);
    try {
      const userId = 1; // 실제 사용자 ID로 교체
      const pets = await fetchNoseprintPets(userId);
      setDogList(pets);
    } catch (error) {
      console.error("강아지 목록 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadNoseprintList = async () => {
    setIsLoadingNoseData(true);
    try {
      const ownerId = 1; // 임시로 프론트에서 넘김.
      const data = await fetchNoseprintSearchList(ownerId);
      console.log("🎯 비문 탐색 결과 불러오기 성공:", data);
      setNoseData(data);
    } catch (error) {
      console.error("❌ 비문 탐색 결과 불러오기 실패:", error);
    } finally {
      setIsLoadingNoseData(false);
    }
  };

  const handleDogButtonPress = () => {
    setIsExpanded((prev) => !prev);
    if (isDogListVisible) setIsDogListVisible(false);
  };

  const handleLoadNoseDataToggle = () => {
    setIsDogListVisible((prev) => !prev);
    if (!isDogListVisible) {
      loadDogList();
    }
  };

  const handleDogSelect = (pet: NoseprintPet) => {
    console.log("선택된 강아지:", pet.dogNm, "ID:", pet.id);
    setIsDogListVisible(false);
    setIsExpanded(false);
    // 이 부분에서 특정 강아지로 필터링해서 탐색 결과 다시 불러오려면 로직 추가 가능
  };

  const formatDate = (datetime: string): string => {
    const date = new Date(datetime);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>반려견 찾기</Text>
        </View>

        {isLoadingNoseData ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              비문 탐색 결과 불러오는 중...
            </Text>
          </View>
        ) : noseData.length > 0 ? (
          noseData.map((item) => (
            <NoseCard
              key={item.searchId}
              date={formatDate(item.searchDatetime)}
              location={item.searchLocation}
              percentage={`${item.highestScore}`}
              image={{ uri: item.nosePrintImg }}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>탐색 결과가 없습니다</Text>
          </View>
        )}
      </ScrollView>

      {/* 하단 플로팅 버튼들 */}
      <View style={styles.floatingButtonsContainer}>
        {/* 왼쪽 버튼들 */}
        <View style={styles.leftButtonGroup}>
          <FloatingBtn icon={dogIcon} onPress={handleDogButtonPress} />

          {isExpanded && (
            <View>
              <TouchableOpacity
                style={styles.expandedButton}
                onPress={handleLoadNoseDataToggle}
              >
                <View style={styles.expandedButtonContent}>
                  <Text style={styles.expandedButtonText}>비문 불러오기</Text>
                  <Text style={styles.sortArrow}>▼</Text>
                </View>
              </TouchableOpacity>

              {isDogListVisible && (
                <View style={styles.dogListContainer}>
                  <ScrollView>
                    {isLoading ? (
                      <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>로딩 중...</Text>
                      </View>
                    ) : dogList.length > 0 ? (
                      dogList.map((pet, index) => (
                        <TouchableOpacity
                          key={pet.id || index}
                          style={styles.dogItem}
                          onPress={() => handleDogSelect(pet)}
                        >
                          <View style={styles.dogItemContent}>
                            <Text style={styles.dogItemText}>{pet.dogNm}</Text>
                          </View>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                          등록된 반려견이 없습니다
                        </Text>
                      </View>
                    )}
                  </ScrollView>
                </View>
              )}
            </View>
          )}
        </View>

        {/* 오른쪽 카메라 버튼 */}
        <FloatingBtn
          icon={cameraIcon}
          onPress={() => navigation.navigate("NoseCamera")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 30,
  },
  title: {
    fontSize: 19,
    fontWeight: "semibold",
    color: "#000",
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  floatingButtonsContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  expandedButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  expandedButton: {
    backgroundColor: "#3D5AFE",
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginLeft: 10,
    width: 130,
  },
  expandedButtonText: {
    color: "white",
    fontSize: 14,
  },
  sortArrow: {
    marginLeft: 10,
    fontSize: 12,
    color: "#FFFFFF",
  },
  dogListContainer: {
    backgroundColor: "#809fff",
    overflow: "hidden",
    marginLeft: 10,
    width: 130,
  },
  dogItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  dogItemText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  leftButtonGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
  },
  dogItemContent: {
    flex: 1,
  },
});

export default NoseScreen;
