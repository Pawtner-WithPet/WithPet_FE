import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import Header from "../../../components/Header";
import { Colors } from "../../../constants/colors";
import TabNavigation from "../../../components/Lost/TabNavigation";
import SearchBar from "../../../components/Lost/SearchBar";
import PetList from "../../../components/Lost/PetList";
import FloatingButtonContainer from "../../../components/Lost/FloatingButtonContainer";
import PetSelectionModal from "../../../components/Lost/PetSelectionModal";

import {
  usePetData,
  CombinedPetData,
} from "../../../components/Lost/usePetData";

import {
  fetchPetDetail,
  PostType,
  getPetIdByName,
} from "../../../services/api/AIScreen";

import { fetchDogs, Dog } from "../../../services/api/dogs";

const LostPetListScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const [isExpanded, setIsExpanded] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isPetToggleVisible, setPetToggleVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // 서버에서 가져온 반려견 목록
  const [myPets, setMyPets] = useState<Dog[]>([]);
  const [petNames, setPetNames] = useState<string[]>([]);

  const navigation = useNavigation<any>();

  const {
    combinedPets,
    userLostPets,
    isLoading,
    isRefreshing,
    setIsLoading,
    loadPetData,
    loadUserLostPets,
    onRefresh,
    handleSearch: performSearch,
    convertGender,
  } = usePetData();

  const loadPetList = async () => {
    try {
      const userId = 1; // 🔥 스크린에서 임의로 1
      const petList = await fetchDogs(userId);

      setMyPets(petList);

      setPetNames(petList.map((p) => p.dogNm));
    } catch (error) {
      console.error("🔥 반려견 목록 로드 실패:", error);
    }
  };

  // 화면 focus 시 데이터 새로고침
  useFocusEffect(
    React.useCallback(() => {
      loadPetData(false);
      loadUserLostPets();
      loadPetList();
    }, []),
  );

  const handleSearch = () => performSearch(searchText);

  // 탭 필터링
  const filteredData = combinedPets.filter((item) => {
    if (activeTab === "전체") return true;
    if (activeTab === "실종동물") return item.status === "실종";
    if (activeTab === "발견동물") return item.status === "발견";
    return true;
  });

  // 카드 클릭 → 상세 화면 이동
  const handleCardPress = async (item: CombinedPetData) => {
    try {
      setIsLoading(true);

      const postType: PostType = item.status === "실종" ? "LOST" : "FOUND";
      const detailData = await fetchPetDetail(item.postId, postType);

      const postData = detailData
        ? {
            id: item.id,
            postId: detailData.postId,
            ownerId: detailData.ownerId,
            type: detailData.type,
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
          }
        : {
            id: item.id,
            postId: item.postId, // ✅ 추가
            status: item.status,
            breed: item.breed,
            gender: item.gender,
            location: item.location,
            lostDateTime: item.status === "실종" ? item.dateTime : undefined,
            foundDateTime: item.status === "발견" ? item.dateTime : undefined,
            image: item.image,
            // ownerId가 없는 경우 대비
          };

      navigation.navigate("LostPostDetail", {
        post: postData,
        from: "LostPetListScreen",
      });
    } catch (error) {
      console.error("카드 클릭 처리 중 오류:", error);
    } finally {
      setIsLoading(false); // ✅ finally 추가
    }
  };

  // AI 탐색 버튼
  const handleSelectPetForAI = (petName: string, petId: number) => {
    setDropdownVisible(false);
    setPetToggleVisible(false);

    navigation.navigate("AIScreen", {
      selectedPet: petName,
      petId,
    });
  };

  const handleTogglePetSearch = () => {
    setPetToggleVisible((prev) => !prev);
    setDropdownVisible((prev) => !prev);
  };

  // 실종동물 등록 모달 선택
  const handleSelectPetForRegister = (petName: string) => {
    setRegisterModalOpen(false);

    const selectedPet = myPets.find((p) => p.dogNm === petName);

    navigation.navigate("LostPetRegister", {
      petName,
      petId: selectedPet?.id ?? 0,
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Header />

        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={["전체", "실종동물", "발견동물"]}
        />

        <SearchBar
          searchText={searchText}
          onSearchTextChange={setSearchText}
          onSearch={handleSearch}
        />

        <PetList
          data={filteredData}
          isRefreshing={isRefreshing}
          isLoading={isLoading}
          searchText={searchText}
          onRefresh={onRefresh}
          onCardPress={handleCardPress}
        />

        <FloatingButtonContainer
          isExpanded={isExpanded}
          isPetToggleVisible={isPetToggleVisible}
          isDropdownVisible={isDropdownVisible}
          onToggleExpand={() => setIsExpanded((prev) => !prev)}
          onTogglePetSearch={handleTogglePetSearch}
          onToggleDropdown={() => setDropdownVisible((prev) => !prev)}
          onLostPetRegister={() => setRegisterModalOpen(true)}
          onFoundPetRegister={() => navigation.navigate("FoundPetRegister")}
          onSelectPet={handleSelectPetForAI}
        />
      </View>

      <PetSelectionModal
        visible={registerModalOpen}
        petNames={petNames}
        onClose={() => setRegisterModalOpen(false)}
        onSelectPet={handleSelectPetForRegister}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default LostPetListScreen;
