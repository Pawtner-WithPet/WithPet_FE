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
import { fetchDogs, Dog } from "../../../services/api/dogs";

const NoseScreen: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDogListVisible, setIsDogListVisible] = useState(false);
  const [isRegisterDogListVisible, setIsRegisterDogListVisible] =
    useState(false);
  const [dogList, setDogList] = useState<NoseprintPet[]>([]);
  const [registerDogList, setRegisterDogList] = useState<Dog[]>([]);
  const [noseData, setNoseData] = useState<NoseprintSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRegisterDogs, setIsLoadingRegisterDogs] = useState(false);
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

  const loadRegisterDogList = async () => {
    setIsLoadingRegisterDogs(true);
    try {
      const userId = 1; // 실제 사용자 ID로 교체
      const dogs = await fetchDogs(userId);
      setRegisterDogList(dogs);
    } catch (error) {
      console.error("등록용 강아지 목록 불러오기 실패:", error);
    } finally {
      setIsLoadingRegisterDogs(false);
    }
  };

  const handleDogButtonPress = () => {
    setIsExpanded((prev) => !prev);
    if (isDogListVisible) setIsDogListVisible(false);
    if (isRegisterDogListVisible) setIsRegisterDogListVisible(false);
  };

  const handleLoadNoseDataToggle = () => {
    setIsDogListVisible((prev) => !prev);
    if (!isDogListVisible) {
      loadDogList();
    }
  };

  const handleNoseRegisterPress = () => {
    setIsRegisterDogListVisible((prev) => !prev);
    if (!isRegisterDogListVisible) {
      loadRegisterDogList();
    }
  };

  const handleRegisterDogSelect = (dog: Dog) => {
    console.log("등록용 선택된 강아지:", dog.dogNm, "ID:", dog.id);
    setIsRegisterDogListVisible(false);
    setIsExpanded(false);
    // 비문 등록/수정 로직 추가
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
        {/* 왼쪽 버튼 그룹 */}
        <View style={styles.leftButtonGroup}>
          {/* 비문 등록/수정용 강아지 목록 드롭다운 - 비문 등록/수정 버튼 위에 위치 */}
          {isRegisterDogListVisible && (
            <View style={styles.dogListContainer}>
              <ScrollView>
                {isLoadingRegisterDogs ? (
                  <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>로딩 중...</Text>
                  </View>
                ) : registerDogList.length > 0 ? (
                  registerDogList.map((dog, index) => (
                    <TouchableOpacity
                      key={dog.id || index}
                      style={styles.dogItem}
                      onPress={() => handleRegisterDogSelect(dog)}
                    >
                      <View style={styles.dogItemContent}>
                        <Text style={styles.dogItemText}>{dog.dogNm}</Text>
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

          {/* 비문 등록/수정 버튼 */}
          {isExpanded && (
            <TouchableOpacity
              style={styles.expandedButton}
              onPress={handleNoseRegisterPress}
            >
              <View style={styles.expandedButtonContent}>
                <Text style={styles.expandedButtonText}>비문 등록/수정</Text>
                <Text style={styles.sortArrow}>▲</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* 비문 불러오기용 강아지 목록 드롭다운 - 비문 등록/수정과 비문 불러오기 사이에 위치 */}
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

          {/* 비문 불러오기 버튼 */}
          {isExpanded && (
            <TouchableOpacity
              style={styles.expandedButton}
              onPress={handleLoadNoseDataToggle}
            >
              <View style={styles.expandedButtonContent}>
                <Text style={styles.expandedButtonText}>비문 불러오기</Text>
                <Text style={styles.sortArrow}>▲</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* 강아지 버튼 */}
          <FloatingBtn icon={dogIcon} onPress={handleDogButtonPress} />
        </View>
      </View>

      {/* 카메라 버튼 - 독립적으로 고정 */}
      <View style={styles.cameraButtonContainer}>
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
    fontWeight: "bold",
    color: "#000",
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  floatingButtonsContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  leftButtonGroup: {
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
  },
  cameraButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  expandedButton: {
    backgroundColor: "#4262FF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    width: 151,
    borderRadius: 8,
    marginBottom: 8,
    zIndex: 2,
  },
  expandedButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expandedButtonText: {
    color: "white",
    fontSize: 17,
  },
  sortArrow: {
    marginLeft: 10,
    fontSize: 17,
    color: "#FFFFFF",
  },
  dogListContainer: {
    backgroundColor: "#A1B4FF",
    width: 151,
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 3,
  },
  dogItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#A1B4FF",
  },
  dogItemText: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
  },
  dogItemContent: {
    flex: 1,
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
});

export default NoseScreen;
