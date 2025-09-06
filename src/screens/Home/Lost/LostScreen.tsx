import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
} from "react-native";
import Header from "../../../components/Header";
import { Colors } from "../../../constants/colors";
import icon_search from "../../../assets/icons/search.png";
import icon_detail_page from "../../../assets/icons/icon_detail_page.png";
import happy1 from "../../../assets/images/happy1.png";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  fetchLostPetList,
  fetchFoundPetList,
  fetchPetDetail,
  formatDate,
  getSexInKorean,
  LostPet,
  FoundPet,
  PostType,
  getPetIdByName,
  fetchCurrentUserLostPets,
  UserLostPet,
} from "../../../services/api/AIScreen";

// 통합된 Pet 타입 정의
interface CombinedPetData {
  id: string;
  status: "실종" | "발견";
  gender?: "male" | "female";
  name?: string;
  age?: string;
  breed: string; // kindNm
  height?: string;
  weight?: string;
  feature?: string;
  extra?: string;
  dateTime: string; // lostDate 또는 foundDate를 포맷팅한 것
  location: string; // lostLocation 또는 foundLocation
  image?: any;
  postId: number;
  sex: string;
  imgUrl?: string | null;
}

const LostPetListScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const [isExpanded, setIsExpanded] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // API 데이터 상태
  const [lostPets, setLostPets] = useState<LostPet[]>([]);
  const [foundPets, setFoundPets] = useState<FoundPet[]>([]);
  const [combinedPets, setCombinedPets] = useState<CombinedPetData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 사용자 실종 반려견 목록 상태 추가
  const [userLostPets, setUserLostPets] = useState<UserLostPet[]>([]);

  const [selectedPet, setSelectedPet] = useState();
  const [isPetToggleVisible, setPetToggleVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // 동적으로 사용자 반려견 이름 목록 생성
  const PET_NAMES = userLostPets.map((pet) => pet.dogNm);
  const navigation = useNavigation<any>();

  // 성별 변환 함수
  const convertGender = (sex: string): "male" | "female" | undefined => {
    if (sex === "MALE" || sex === "수컷") return "male";
    if (sex === "FEMALE" || sex === "암컷") return "female";
    return undefined;
  };

  // API 데이터를 화면에 표시할 형태로 변환
  const transformPetData = (
    lostPets: LostPet[],
    foundPets: FoundPet[],
  ): CombinedPetData[] => {
    const transformedLost: CombinedPetData[] = lostPets.map((pet) => ({
      id: `lost-${pet.postId}`,
      status: "실종" as const,
      gender: convertGender(pet.sex),
      breed: pet.kindNm,
      dateTime: formatDate(pet.lostDate),
      location: pet.lostLocation,
      postId: pet.postId,
      sex: pet.sex,
      imgUrl: pet.imgUrl,
      image: pet.imgUrl ? { uri: pet.imgUrl } : happy1,
    }));

    const transformedFound: CombinedPetData[] = foundPets.map((pet) => ({
      id: `found-${pet.postId}`,
      status: "발견" as const,
      gender: convertGender(pet.sex),
      breed: pet.kindNm,
      dateTime: formatDate(pet.foundDate),
      location: pet.foundLocation,
      postId: pet.postId,
      sex: pet.sex,
      imgUrl: pet.imgUrl,
      image: pet.imgUrl ? { uri: pet.imgUrl } : happy1,
    }));

    return [...transformedLost, ...transformedFound].sort(
      (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
    );
  };

  // 사용자 실종 반려견 목록 로드 함수
  const loadUserLostPets = async () => {
    try {
      console.log("사용자 실종 반려견 목록 로딩 중...");
      const userPets = await fetchCurrentUserLostPets();
      setUserLostPets(userPets);
      console.log("사용자 실종 반려견 목록 로딩 완료:", userPets);
    } catch (error) {
      console.error("사용자 실종 반려견 목록 로딩 오류:", error);
      setUserLostPets([]); // 오류 시 빈 배열로 설정
    }
  };

  // 데이터 로드 함수
  const loadPetData = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);

    try {
      console.log("반려동물 데이터 로딩 시작...");

      const [lostData, foundData] = await Promise.all([
        fetchLostPetList(),
        fetchFoundPetList(),
      ]);

      console.log("실종동물 데이터:", lostData);
      console.log("발견동물 데이터:", foundData);

      setLostPets(lostData);
      setFoundPets(foundData);

      const combined = transformPetData(lostData, foundData);
      setCombinedPets(combined);

      console.log("데이터 로딩 완료, 총", combined.length, "건");
    } catch (error) {
      console.error("데이터 로딩 중 오류:", error);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  // 새로고침 함수
  const onRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([loadPetData(false), loadUserLostPets()]);
    setIsRefreshing(false);
  };

  // 검색 함수
  const handleSearch = () => {
    if (!searchText.trim()) {
      // 검색어가 없으면 전체 데이터 표시
      const combined = transformPetData(lostPets, foundPets);
      setCombinedPets(combined);
      return;
    }

    const searchKeyword = searchText.trim().toLowerCase();
    const combined = transformPetData(lostPets, foundPets);

    const filtered = combined.filter(
      (pet) =>
        pet.location.toLowerCase().includes(searchKeyword) ||
        pet.breed.toLowerCase().includes(searchKeyword),
    );

    setCombinedPets(filtered);
    console.log(`검색 결과: ${filtered.length}건 (검색어: ${searchKeyword})`);
  };

  // 탭에 따른 데이터 필터링
  const filteredData = combinedPets.filter((item) => {
    if (activeTab === "전체") return true;
    if (activeTab === "실종동물") return item.status === "실종";
    if (activeTab === "발견동물") return item.status === "발견";
    return true;
  });

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadPetData();
    loadUserLostPets();
  }, []);

  // 화면이 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    React.useCallback(() => {
      loadPetData(false);
      loadUserLostPets();
    }, []),
  );

  // 카드 클릭 시 상세 정보 조회 및 네비게이션
  const handleCardPress = async (item: CombinedPetData) => {
    try {
      setIsLoading(true);
      console.log("카드 클릭:", item.id, item.status);

      const postType: PostType = item.status === "실종" ? "LOST" : "FOUND";
      const detailData = await fetchPetDetail(item.postId, postType);

      if (detailData) {
        console.log("상세 데이터 조회 성공:", detailData);

        const postData = {
          id: item.id,
          status: item.status,
          name: detailData.dogNm || item.name,
          breed: detailData.kindNm || item.breed,
          gender: convertGender(detailData.sex),
          age: detailData.age?.toString(),
          height: detailData.height?.toString(),
          weight: detailData.weight?.toString(),
          location: item.location,
          lostDateTime: item.status === "실종" ? item.dateTime : undefined,
          foundDateTime: item.status === "발견" ? item.dateTime : undefined,
          feature: detailData.features,
          extra: detailData.description,
          familiar: detailData.favoritePlace,
          image: detailData.imgUrl ? { uri: detailData.imgUrl } : item.image,
        };

        navigation.navigate("LostPostDetail", {
          post: postData,
          from: "LostPetListScreen",
        });
      } else {
        // 상세 정보 조회 실패 시 기본 정보로 이동
        console.warn("상세 정보 조회 실패, 기본 정보로 이동");

        const fallbackData = {
          id: item.id,
          status: item.status,
          breed: item.breed,
          gender: item.gender,
          location: item.location,
          lostDateTime: item.status === "실종" ? item.dateTime : undefined,
          foundDateTime: item.status === "발견" ? item.dateTime : undefined,
          image: item.image,
        };

        navigation.navigate("LostPostDetail", {
          post: fallbackData,
          from: "LostPetListScreen",
        });
      }
    } catch (error) {
      console.error("카드 클릭 처리 중 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 카드 렌더링 함수
  const renderItem = ({ item }: { item: CombinedPetData }) => {
    const isLost = item.status === "실종";

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handleCardPress(item)}
        style={styles.card}
      >
        <View
          style={[styles.badge, isLost ? styles.badgeLost : styles.badgeFound]}
        >
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>

        <Image
          source={item.image}
          style={styles.image}
          defaultSource={happy1}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.dateText}>{item.dateTime}</Text>
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.breedText}>{item.breed}</Text>
        </View>
        <Image source={icon_detail_page} style={styles.arrowIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Header />

        <View style={styles.tabWrapper}>
          {["전체", "실종동물", "발견동물"].map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setActiveTab(label)}
              style={styles.tabItem}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === label && styles.tabTextActive,
                ]}
              >
                {label}
              </Text>
              {activeTab === label && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="지역 또는 견종으로 검색"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Image source={icon_search} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={["#3366FF"]}
              tintColor="#3366FF"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {isLoading
                  ? "데이터를 불러오는 중..."
                  : searchText.trim()
                    ? "검색 결과가 없습니다"
                    : "등록된 정보가 없습니다"}
              </Text>
            </View>
          }
          contentContainerStyle={styles.listContainer}
        />

        <View style={styles.floatingWrapper}>
          {isPetToggleVisible && (
            <View style={styles.petDropdownWrapper}>
              <TouchableOpacity
                style={styles.petToggleBtn}
                onPress={() => setDropdownVisible((prev) => !prev)}
              >
                <Text style={styles.petToggleText}>탐색할 반려견 ▲</Text>
              </TouchableOpacity>

              {isDropdownVisible && (
                <View style={styles.dropdown}>
                  {PET_NAMES.map((pet) => {
                    const petId = getPetIdByName(userLostPets, pet);
                    return (
                      <TouchableOpacity
                        key={pet}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setDropdownVisible(false);
                          setPetToggleVisible(false);
                          navigation.navigate("AIScreen", {
                            selectedPet: pet,
                            petId: petId,
                          });
                        }}
                      >
                        <Text style={styles.dropdownText}>{pet}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          )}
          <TouchableOpacity
            style={styles.fab}
            onPress={() => setPetToggleVisible((prev) => !prev)}
          >
            <Image source={icon_search} style={styles.fabIcon} />
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.dropdownButtons}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#F64C4C" }]}
                onPress={() => setRegisterModalOpen(true)}
              >
                <Text style={styles.actionButtonText}>실종동물 등록</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#4262FF" }]}
                onPress={() => navigation.navigate("FoundPetRegister")}
              >
                <Text style={styles.actionButtonText}>발견동물 등록</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.fab}
            onPress={() => setIsExpanded((prev) => !prev)}
          >
            <Text style={styles.fabPlus}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={registerModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setRegisterModalOpen(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setRegisterModalOpen(false)}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>반려견 선택</Text>

            {PET_NAMES.length > 0 ? (
              PET_NAMES.map((pet) => (
                <TouchableOpacity
                  key={pet}
                  style={styles.modalItem}
                  onPress={() => {
                    setRegisterModalOpen(false);
                    const petId = getPetIdByName(userLostPets, pet);
                    navigation.navigate("LostPetRegister", {
                      petName: pet,
                      petId: petId,
                    });
                  }}
                >
                  <Text style={styles.modalItemText}>{pet}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.modalItem}>
                <Text style={[styles.modalItemText, { color: "#999" }]}>
                  등록된 반려견이 없습니다
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setRegisterModalOpen(false)}
            >
              <Text style={styles.modalCloseText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 18,
    color: "#aaa",
    fontWeight: "bold",
  },
  tabTextActive: {
    color: "#1A1A1A",
  },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: "80%",
    backgroundColor: "#222",
  },
  searchWrapper: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: "#333",
    paddingVertical: 12,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: "#000",
    marginLeft: 8,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 120, // 플로팅 버튼 공간 확보
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -6,
    left: -6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeLost: {
    backgroundColor: "#F64C4C",
    width: 60,
    height: 30,
    top: 5,
    left: 10,
  },
  badgeFound: {
    width: 60,
    height: 30,
    top: 5,
    left: 10,
    backgroundColor: "#0086FF",
  },
  badgeText: {
    color: "#fff",
    fontSize: 18,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  locationText: {
    fontSize: 17,
    color: "#999",
  },
  breedText: {
    fontSize: 17,
    color: "#999",
  },
  arrowIcon: {
    width: 40,
    height: 40,
    tintColor: "#000",
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  floatingWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
  },
  fab: {
    backgroundColor: "#3366FF",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  fabIcon: {
    width: 40,
    height: 40,
    tintColor: "#fff",
  },
  fabPlus: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    marginTop: -4,
  },
  dropdownButtons: {
    position: "absolute",
    bottom: 80,
    right: 0,
    alignItems: "flex-end",
  },
  petDropdownWrapper: {
    position: "absolute",
    bottom: 80,
    right: 230,
    alignItems: "flex-end",
    zIndex: 10,
  },
  petToggleBtn: {
    backgroundColor: "#3366FF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    left: 10,
  },
  petToggleText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    bottom: 44,
    right: -8,
    backgroundColor: "#A5BFFF",
    borderRadius: 10,
    overflow: "hidden",
    zIndex: 20,
    minWidth: 150,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 1,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    width: "84%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
    textAlign: "center",
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#F2F4F8",
    marginVertical: 6,
    borderRadius: 10,
  },
  modalItemText: {
    fontSize: 16,
    color: "#111",
    fontWeight: "600",
  },
  modalCloseBtn: {
    alignSelf: "center",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#3366FF",
    borderRadius: 10,
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default LostPetListScreen;
