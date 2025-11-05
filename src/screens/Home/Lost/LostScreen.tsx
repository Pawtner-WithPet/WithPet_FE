import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
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
  formatDate,
  LostPet,
  FoundPet,
  fetchCurrentUserLostPets,
  UserLostPet,
} from "../../../services/api/AIScreen";
import { 
  fetchSearchAllList, 
  fetchSearchDetail, 
  toLostPostForUI, 
  fetchLostPetsForUser, 
  PostItem, 
  PostType 
} from "../../../services/api/SearchPet";

type SelectItem = { label: string; value: number | string };
// 통합된 Pet 타입 정의
interface CombinedPetData {
  id: string;
  status: "실종" | "발견";
  gender?: "male" | "female";
  name?: string;
  age?: string;
  breed: string;
  height?: string;
  weight?: string;
  feature?: string;
  extra?: string;
  dateTime: string; 
  location: string; 
  image?: any;
  postId: number;
  sex: string;
  imgUrl?: string | null;
}


const mapAllToCombined = (rows: PostItem[]): CombinedPetData[] =>
  rows.map((r) => ({
    id: r.id,
    status: r.status,         
    gender: r.gender,
    breed: r.breed,
    dateTime: r.dateTime,
    location: r.location,
    image: r.image ?? happy1,
    postId: r.postId,
    sex: r.sex ?? "",
    imgUrl: r.raw?.imgUrl ?? null,
  }));


const LostPetListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState("전체");
  const [isExpanded, setIsExpanded] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // API 데이터 상태
  const [lostPets, setLostPets] = useState<LostPet[]>([]);

  const [foundPets, setFoundPets] = useState<FoundPet[]>([]);
  const [allPosts, setAllPosts] = useState<CombinedPetData[]>([]); 
  const [basePets, setBasePets] = useState<CombinedPetData[]>([]);
  const [combinedPets, setCombinedPets] = useState<CombinedPetData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const USER_ID = 11;

const [isPetListLoading, setPetListLoading] = useState(false);
const [petListLoaded, setPetListLoaded] = useState(false);

  // 사용자 실종 반려견 목록 상태 추가
  const [userLostPets, setUserLostPets] = useState<UserLostPet[]>([]);

  const [selectedPet, setSelectedPet] = useState();
  const [isPetToggleVisible, setPetToggleVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);


  // 동적으로 사용자 반려견 이름 목록 생성
  const PET_NAMES = userLostPets.map((pet) => pet.dogNm);
  

  const userPetItems: SelectItem[] = userLostPets.map((p) => ({
    label: p.dogNm,
    value: (p as any).petId ?? (p as any).id ?? p.dogNm,
  }));
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
      const list = await fetchLostPetsForUser(USER_ID);
      setUserLostPets(Array.isArray(list) ? list : []);
      console.log("✅ 실종 반려견 목록 로딩 완료:", list.length);
    } catch (error) {
      console.error("❌ 실종 반려견 목록 로딩 오류:", error);
      setUserLostPets([]); // 실패 시에도 배열 보장
    }
  };

  // 데이터 로드 함수
  const loadPetData = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);

    try {
      //console.log("반려동물 데이터 로딩 시작...");

      const [lostData, foundData] = await Promise.all([
        fetchLostPetList(),
        fetchFoundPetList(),
      ]);
      

      //console.log("실종동물 데이터:", lostData);
      //console.log("발견동물 데이터:", foundData);

      setLostPets(lostData);
      setFoundPets(foundData);
    } catch (error) {
      //console.error("데이터 로딩 중 오류:", error);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };
  const loadAllList = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const rows = await fetchSearchAllList();
      const mapped = mapAllToCombined(rows);
      setAllPosts(mapped);                      // "전체" 탭에서 사용
      if (activeTab === "전체") {
        setBasePets(mapped);
        setCombinedPets(applySearch(mapped, searchText));
      }
    } catch (e) {
      console.error("전체 목록 로딩 오류:", e);
      setAllPosts([]);
      if (activeTab === "전체") {
        setBasePets([]);
        setCombinedPets([]);
      }
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
      setCombinedPets(basePets);
      return;
    }

    const searchKeyword = searchText.trim().toLowerCase();
    const filtered = basePets.filter(
      (pet) =>
        pet.location.toLowerCase().includes(searchKeyword) ||
        pet.breed.toLowerCase().includes(searchKeyword),
    );

    setCombinedPets(filtered);
    console.log(`검색 결과: ${filtered.length}건 (검색어: ${searchKeyword})`);
  };

  const applySearch = (source: CombinedPetData[], q: string) => {
    const s = q.trim().toLowerCase();
    if (!s) return source;
    return source.filter(p =>
      p.location.toLowerCase().includes(s) ||
      p.breed.toLowerCase().includes(s) ||
      (p.name ?? "").toLowerCase().includes(s)
    );
  };
  

  // 탭에 따른 데이터 필터링
  const filteredData = combinedPets.filter((item) => {
    if (activeTab === "전체") return true;
    if (activeTab === "실종동물") return item.status === "실종";
    if (activeTab === "발견동물") return item.status === "발견";
    return true;
  });

  // 탭/원본 변경 시 베이스 데이터 재계산
  useEffect(() => {
    if (activeTab === "전체") {
      setBasePets(allPosts);
      setCombinedPets(applySearch(allPosts, searchText));
    } else {
      const both = transformPetData(lostPets, foundPets);
      const filteredByTab =
        activeTab === "실종동물" ? both.filter(p => p.status === "실종")
        : activeTab === "발견동물" ? both.filter(p => p.status === "발견")
        : both;
      setBasePets(filteredByTab);
      setCombinedPets(applySearch(filteredByTab, searchText));
    }
  }, [activeTab, allPosts, lostPets, foundPets]);
  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadAllList();   
    loadPetData(false);
    loadUserLostPets();
  }, []);

  // 화면이 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    React.useCallback(() => {
      loadAllList(false);  
      loadPetData(false);
      loadUserLostPets();
    }, [])
  );
  useEffect(() => {
    if (isDropdownVisible && !petListLoaded) {
      (async () => {
        try {
          setPetListLoading(true);
          console.log("[CALL] fetchLostPetsForUser");
          const list = await fetchLostPetsForUser(USER_ID);
          console.log("[RES] lost pets:", Array.isArray(list) ? list.length : list);
          setUserLostPets(Array.isArray(list) ? list : []);
          setPetListLoaded(true);
        } catch (e) {
          console.error("실종 반려견 목록 로딩 실패:", e);
          setUserLostPets([]); // ✅ 실패 시 빈배열
        } finally {
          setPetListLoading(false);
        }
      })();
    }
  }, [isPetToggleVisible, isDropdownVisible]);


  // 카드 클릭 시 상세 정보 조회 및 네비게이션
  const handleCardPress = async (item: CombinedPetData) => {
    try {
      setIsLoading(true);
      const postType: PostType = item.status === "실종" ? "LOST" : "FOUND";
      const detail = await fetchSearchDetail(item.postId, postType);
      const postFromApi = toLostPostForUI(detail);
      const isLostCtx = item.status === "실종";
      
      const withFallback = {
        ...postFromApi,
        // 서버에 없으면 목록값으로 보강
        status: isLostCtx ? "실종" : "발견",
        image: postFromApi.image ?? (item.imgUrl ? { uri: item.imgUrl } : item.image),
        breed: postFromApi.breed ?? item.breed,
        location: isLostCtx ? (postFromApi.location ?? item.location) : (postFromApi.location ?? item.location),
        lostDateTime: isLostCtx ? (postFromApi.lostDateTime ?? item.dateTime) : undefined,
        foundDateTime: !isLostCtx ? (postFromApi.foundDateTime ?? item.dateTime) : undefined,
      };
      navigation.navigate("LostPostDetail", {
        post: withFallback,
        from: "LostPetListScreen",
      });
    } catch (error: any) {
      console.error("상세 조회 실패:", error?.message ?? error);
      Alert.alert("오류", "게시글 상세 조회에 실패했습니다.");
      navigation.navigate("LostPostDetail", {
        post: {
          id: item.id,
          status: item.status,
          breed: item.breed,
          location: item.location,
          image: item.image,
          lostDateTime: item.status === "실종" ? item.dateTime : undefined,
          foundDateTime: item.status === "발견" ? item.dateTime : undefined,
        },
        from: "LostPetListScreen",
      });
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
            items={userPetItems}
            onSelect={(value) => {
              setDropdownVisible(false);
              setPetToggleVisible(false);
              console.log("[PetSelector] selected:", value);
              const sel = userPetItems.find(i => i.value === value);
              navigation.navigate("AIScreen", { selectedPet: sel?.label ?? "", petId: value });
            }}
          />
          <Fab
            icon={icon_search}
            onPress={() => setPetToggleVisible(prev =>{const next = !prev;
              if (next) setDropdownVisible(true); 
              return next;})}
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
        items={userPetItems} 
        emptyText="등록된 반려견이 없습니다"
        onSelect={(petId) => {
          setRegisterModalOpen(false);
          const petName = userPetItems.find(p => p.value === petId)?.label ?? "";
          navigation.navigate("LostPetRegister", { petName, petId });
        }}
        onClose={() => setRegisterModalOpen(false)}
      />
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
