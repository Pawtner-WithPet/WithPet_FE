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

const LostPetListScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const [isExpanded, setIsExpanded] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isPetToggleVisible, setPetToggleVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

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

  const PET_NAMES = userLostPets.map((pet) => pet.dogNm);

  // 화면이 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    React.useCallback(() => {
      loadPetData(false);
      loadUserLostPets();
    }, []),
  );

  // 검색 함수
  const handleSearch = () => {
    performSearch(searchText);
  };

  // 탭에 따른 데이터 필터링
  const filteredData = combinedPets.filter((item) => {
    if (activeTab === "전체") return true;
    if (activeTab === "실종동물") return item.status === "실종";
    if (activeTab === "발견동물") return item.status === "발견";
    return true;
  });

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
    }
  };

  // 반려견 선택 핸들러
  const handleSelectPetForAI = (petName: string, petId: number) => {
    setDropdownVisible(false);
    setPetToggleVisible(false);
    navigation.navigate("AIScreen", {
      selectedPet: petName,
      petId: petId,
    });
  };

  // AI 검색 버튼 토글 핸들러
  const handleTogglePetSearch = () => {
    setPetToggleVisible((prev) => !prev);
    if (!isPetToggleVisible) {
      setDropdownVisible(true); // 버튼을 누르면 드롭다운도 자동으로 열림
    } else {
      setDropdownVisible(false);
    }
  };

  // 실종동물 등록 모달에서 반려견 선택
  const handleSelectPetForRegister = (petName: string) => {
    setRegisterModalOpen(false);
    const petId = getPetIdByName(userLostPets, petName);
    navigation.navigate("LostPetRegister", {
      petName: petName,
      petId: petId ?? 0,
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
        petNames={PET_NAMES}
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
