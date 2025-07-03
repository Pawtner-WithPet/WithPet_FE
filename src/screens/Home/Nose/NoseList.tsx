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
} from "../../../services/api/NoseList";

const NoseScreen: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDogListVisible, setIsDogListVisible] = useState(false);
  const [dogList, setDogList] = useState<NoseprintPet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    loadDogList();
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
  };

  const noseData = [
    {
      id: 1,
      date: "2025.03.01 11:25",
      location: "서울특별시 도봉구",
      percentage: "99%",
      image: {
        uri: "https://via.placeholder.com/100x100/FFB6C1/000000?text=👃",
      },
    },
    {
      id: 2,
      date: "2025.03.01 11:25",
      location: "서울특별시 도봉구",
      percentage: "95%",
      image: {
        uri: "https://via.placeholder.com/100x100/87CEEB/000000?text=👃",
      },
    },
    {
      id: 3,
      date: "2025.03.01 11:25",
      location: "서울특별시 도봉구",
      percentage: "94%",
      image: {
        uri: "https://via.placeholder.com/100x100/98FB98/000000?text=👃",
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>반려견 찾기</Text>
        </View>
        {noseData.map((item) => (
          <NoseCard
            key={item.id}
            date={item.date}
            location={item.location}
            percentage={item.percentage}
            image={item.image}
          />
        ))}
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
                            <Text style={styles.dogItemSubText}>
                              {pet.kindNm} • {pet.sexNm} • {pet.dogAge}세
                            </Text>
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
    backgroundColor: "#f5f5f5",
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
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    fontSize: 16,
    color: "#000",
    marginRight: 8,
  },
  sortArrow: {
    marginLeft: 10,
    fontSize: 12,
    color: "#FFFFFF",
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
  floatingButton: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: "#4262FF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonIcon: {
    width: 50,
    height: 50,
    tintColor: "white",
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
  dogItemSubText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});

export default NoseScreen;
