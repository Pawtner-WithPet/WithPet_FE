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

import SearchBar from "../../../components/Lost/SearchBar";
import PetCard, { PetCardData } from "../../../components/Lost/PetCard";
import Fab from "../../../components/Lost/Button";
import PetSelectorDropdown from "../../../components/Lost/PetSelectorDropdown";
import SelectModal from "../../../components/Lost/SelectModal";



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





// [ADD] 카드에 맞춘 목데이터 타입 (화면에서 쓰는 CombinedPetData와 필드 일치)
type MockItem = {
  id: string;
  status: "실종" | "발견";
  dateTime: string;
  location: string;
  breed: string;
  image?: any;
  postId: number;
  sex: string;
  imgUrl?: string | null;
  // (필요 시 gender/name/age/feature 등 더 추가 가능)
};

// [ADD] 실제로 화면에 띄울 목데이터
const MOCK_DATA: MockItem[] = [
  {
    id: "found-101",
    status: "발견",
    dateTime: "2025-09-08 14:20",
    location: "서울 강남구 삼성동",
    breed: "말티즈",
    image: happy1,
    postId: 101,
    sex: "FEMALE",
  },
  {
    id: "lost-88",
    status: "실종",
    dateTime: "2025-09-07 18:40",
    location: "경기 남양주시 화도읍",
    breed: "포메라니안",
    image: happy1,
    postId: 88,
    sex: "MALE",
  },
  {
    id: "found-77",
    status: "발견",
    dateTime: "2025-09-06 09:10",
    location: "서울 마포구 합정동",
    breed: "시바 이누",
    image: happy1,
    postId: 77,
    sex: "MALE",
  },
];














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
  const MOCK_MODE = true;


  const [activeTab, setActiveTab] = useState("전체");
  const [isExpanded, setIsExpanded] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const PET_ITEMS = [
    { label: "코코", value: 101 },
    { label: "보리", value: 202 },
    { label: "초코", value: 303 },
  ];
  const [searchText, setSearchText] = useState("");

  // API 데이터 상태
  const [lostPets, setLostPets] = useState<LostPet[]>([]);
  const [foundPets, setFoundPets] = useState<FoundPet[]>([]);
  const [combinedPets, setCombinedPets] = useState<CombinedPetData[]>(
  MOCK_MODE ? (MOCK_DATA as any) : []
);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 사용자 실종 반려견 목록 상태 추가
  const [userLostPets, setUserLostPets] = useState<UserLostPet[]>([]);


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
  if (MOCK_MODE) return; // ✅ 목모드면 API 콜 자체를 막기
  if (showLoading) setIsLoading(true);
  try {
    const [lostData, foundData] = await Promise.all([
      fetchLostPetList(),
      fetchFoundPetList(),
    ]);
    setLostPets(lostData);
    setFoundPets(foundData);
    setCombinedPets(transformPetData(lostData, foundData));
  } catch (e) {
    console.error("데이터 로딩 중 오류:", e);
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
  if (MOCK_MODE) {
    const sorted = [...MOCK_DATA].sort(
      (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
    );
    setCombinedPets(sorted as any);
    console.log("[MOCK] 세팅됨:", sorted.length);
    return; // <- 이 return이 핵심! 아래 실제 API 호출 막기
  }

  // 기존 로직
  loadPetData();
  loadUserLostPets();
}, []);

  // 화면이 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    React.useCallback(() => {
      if (MOCK_MODE) return; // ✅ 포커스될 때 API 재호출 금지
      loadPetData(false);
      loadUserLostPets();
    }, [])
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

  // 카드 렌더링
  const renderItem = ({ item }: { item: CombinedPetData }) => {
    const cardData: PetCardData = {
      id: item.id,
      status: item.status,        
      dateTime: item.dateTime,     
      location: item.location,     
      breed: item.breed,           
      image: item.image ?? happy1,  
    };

    return (
      <PetCard
        item={cardData}
        arrowIconSource={icon_detail_page}
        onPress={() => handleCardPress(item)}
      />
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

        <SearchBar
          value={searchText}
          onChange={setSearchText}
          onSubmit={handleSearch}
          iconSource={icon_search}
        />

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
          <PetSelectorDropdown
            visible={isPetToggleVisible}
            expanded={isDropdownVisible}
            onToggleExpand={() => setDropdownVisible((prev) => !prev)}
            items={PET_ITEMS}
            onSelect={(value) => {
              // 목데이터 확인용: 선택 시 닫기 + 로그
              setDropdownVisible(false);
              setPetToggleVisible(false);
              console.log("[PetSelector] selected:", value);
              // 실제 연동 시:
              // navigation.navigate("AIScreen", { selectedPet: label, petId: value });
            }}
          />
          <Fab
            icon={icon_search}
            onPress={() => setPetToggleVisible(prev => !prev)}
          />

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

          <Fab
            label="+"
            onPress={() => setIsExpanded(prev => !prev)}
          />
        </View>
      </View>
      <SelectModal
        open={registerModalOpen}
        title="반려견 선택"
        items={PET_ITEMS} // ← 목데이터. 실제 연동 시 userLostPets 매핑
        emptyText="등록된 반려견이 없습니다"
        onSelect={(petId) => {
          setRegisterModalOpen(false);

          // 목데이터: label이 필요하면 여기서 찾아도 됨
          const petName = PET_ITEMS.find(p => p.value === petId)?.label ?? "";

          // 실제 연동 시:
          // const petName = PET_NAMES.find(n => getPetIdByName(userLostPets, n) === petId) ?? "";

          navigation.navigate("LostPetRegister", {
            petName,
            petId,
          });
        }}
        onClose={() => setRegisterModalOpen(false)}
      />


-
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
  listContainer: {
    padding: 16,
    paddingBottom: 120, 
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
  dropdownButtons: {
    position: "absolute",
    bottom: 80,
    right: 0,
    alignItems: "flex-end",
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

});

export default LostPetListScreen;
