import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import TabNavigation from "../../../components/AIScreen/TabNavigation";
import SearchBar from "../../../components/AIScreen/SearchBar";
import KeywordTags from "../../../components/AIScreen/KeywordTags";
import FindCard from "../../../components/AIScreen/FindCard";
import SNSCard from "../../../components/AIScreen/SNSCard";
import ShelterCard from "../../../components/AIScreen/ShelterCard";
import AISearchBtn from "../../../components/AIScreen/AISearchBtn";
import AIKeyWordPopup from "../../../components/AIScreen/AIKeyWordPopup";
import AIStopPopup from "../../../components/AIScreen/AIStopPopup";
import {
  fetchFoundPetResults,
  fetchFoundPetList,
  fetchShelterResults,
  fetchPetDetail,
  FoundPet,
  ShelterInfo,
  PetDetailData,
  PostType,
  getSexInKorean,
  formatDate,
} from "../../../services/api/AIScreen";
import { snsResults } from "../../../mocks/dummyData";

type RouteParams = {
  selectedPet?: string;
  petId?: number;
};

type AIScreenRouteProp = RouteProp<{ AIScreen: RouteParams }, "AIScreen">;

const AIScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("discovered");
  const [searchText, setSearchText] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<FoundPet[]>([]);
  const [foundPetList, setFoundPetList] = useState<FoundPet[]>([]);
  const [shelterResults, setShelterResults] = useState<ShelterInfo[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showKeywordPopup, setShowKeywordPopup] = useState(false);
  const [showStopPopup, setShowStopPopup] = useState(false);
  const [isRealTimeSearchActive, setIsRealTimeSearchActive] = useState(false);

  const navigation = useNavigation<any>();
  const route = useRoute<AIScreenRouteProp>();
  const { selectedPet, petId } = route.params || {};

  useEffect(() => {
    if (selectedPet) {
      console.log(`${selectedPet}를 선택하여 AI 탐색 페이지로 이동했습니다.`);
    }
    if (petId) {
      console.log(`선택된 강아지 ID: ${petId}`);
    }
  }, [selectedPet, petId]);

  // 컴포넌트 마운트 시 데이터 불러오기
  useEffect(() => {
    const loadData = async () => {
      if (hasSearched) return;

      setIsLoading(true);
      try {
        if (activeTab === "discovered") {
          const results = await fetchFoundPetList();
          setFoundPetList(results);
          console.log("발견동물 목록:", results);
        } else if (activeTab === "report") {
          // petId가 있으면 사용하고, 없으면 기본값 1 사용
          const searchParams = petId ? { petId } : { petId: 1 };
          const results = await fetchShelterResults(searchParams);
          setShelterResults(results);
          console.log("보호소 결과:", results);
        }
      } catch (error) {
        console.error("데이터 로딩 중 오류:", error);
        setFoundPetList([]);
        setShelterResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [activeTab, hasSearched, petId]);

  // 키워드 추가 함수
  const handleAddKeyword = () => {
    if (searchText.trim() && !keywords.includes(searchText.trim())) {
      setKeywords([...keywords, searchText.trim()]);
      setSearchText("");
    }
  };

  // 키워드 제거 함수
  const handleRemoveKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);

    if (newKeywords.length === 0) {
      setHasSearched(false);
      setSearchResults([]);
    }
  };

  // 검색 함수 (키워드 검색과 일반 검색을 통합)
  const performSearch = async (keywordsToSearch: string[]) => {
    if (keywordsToSearch.length === 0) return;

    console.log("검색 키워드:", keywordsToSearch);
    setIsLoading(true);
    setHasSearched(true);

    try {
      const keywordsString = keywordsToSearch.join(",");

      if (activeTab === "discovered") {
        // 발견동물 탐색 API 호출 (petId 포함)
        const searchParams: { keywords: string; petId?: number } = {
          keywords: keywordsString,
        };
        if (petId) {
          searchParams.petId = petId;
        }

        const results = await fetchFoundPetResults(searchParams);
        setSearchResults(results);
        console.log("발견동물 검색 결과:", results);
      } else if (activeTab === "report") {
        // 보호소 탐색 API 호출 (petId 사용)
        const results = await fetchShelterResults({
          petId: petId || 1, // petId가 없으면 기본값 1 사용
          keywords: keywordsString,
        });
        setShelterResults(results);
        console.log("보호소 검색 결과:", results);
      }
    } catch (error) {
      console.error("검색 중 오류:", error);
      setSearchResults([]);
      setShelterResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 키워드로 검색하는 함수
  const handleKeywordSearch = async () => {
    await performSearch(keywords);
  };

  const handleSearch = async () => {
    const updatedKeywords = [...keywords];
    if (searchText.trim() && !keywords.includes(searchText.trim())) {
      updatedKeywords.push(searchText.trim());
      setKeywords(updatedKeywords);
      setSearchText("");
    }

    await performSearch(updatedKeywords);
  };

  // 카드 클릭 시 상세 정보를 API로 가져와서 상세페이지로 이동
  const handleCardPress = async (item: FoundPet) => {
    try {
      setIsLoading(true);

      // API를 통해 상세 정보 가져오기
      const detailData = await fetchPetDetail(item.postId, "FOUND");

      if (detailData) {
        console.log("API 상세 데이터:", detailData);

        // 성별 변환 로직 개선
        let gender: "male" | "female" | undefined;
        if (detailData.sex === "수컷" || detailData.sex === "MALE") {
          gender = "male";
        } else if (detailData.sex === "암컷" || detailData.sex === "FEMALE") {
          gender = "female";
        }

        // API 데이터를 LostPostDetail에서 기대하는 형식으로 변환
        const postData = {
          id: item.postId.toString(),
          status: "발견" as const,
          name: detailData.dogNm,
          breed: detailData.kindNm,
          gender: gender,
          age: detailData.age?.toString(),
          height: detailData.height?.toString(),
          weight: detailData.weight?.toString(),
          // 발견동물이므로 foundLocation/foundDateTime 사용
          location: item.foundLocation || detailData.lostLocation,
          foundDateTime: formatDate(item.foundDate || detailData.lostDate),
          lostDateTime: undefined, // 발견동물이므로 실종날짜는 없음
          feature: detailData.features,
          extra: detailData.description,
          familiar: detailData.favoritePlace,
          image: detailData.imgUrl ? { uri: detailData.imgUrl } : undefined,
        };

        console.log("변환된 postData:", postData);

        navigation.navigate("LostPostDetail", {
          post: postData,
          from: "AIScreen",
        });
      } else {
        console.error("상세 정보를 가져올 수 없습니다.");
        // 실패 시 기본 정보로라도 이동
        const fallbackData = {
          id: item.postId.toString(),
          status: "발견" as const,
          breed: item.kindNm,
          gender:
            item.sex === "MALE"
              ? "male"
              : item.sex === "FEMALE"
                ? "female"
                : undefined,
          location: item.foundLocation,
          foundDateTime: formatDate(item.foundDate),
          image: item.imgUrl ? { uri: item.imgUrl } : undefined,
        };

        navigation.navigate("LostPostDetail", {
          post: fallbackData,
          from: "AIScreen",
        });
      }
    } catch (error) {
      console.error("상세 정보 조회 중 오류:", error);

      // 에러 발생 시에도 기본 정보로 이동
      const fallbackData = {
        id: item.postId.toString(),
        status: "발견" as const,
        breed: item.kindNm,
        gender:
          item.sex === "MALE"
            ? "male"
            : item.sex === "FEMALE"
              ? "female"
              : undefined,
        location: item.foundLocation,
        foundDateTime: formatDate(item.foundDate),
        image: item.imgUrl ? { uri: item.imgUrl } : undefined,
      };

      navigation.navigate("LostPostDetail", {
        post: fallbackData,
        from: "AIScreen",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSNSCardPress = (id: number) => {
    console.log("SNS 카드 클릭:", id);
  };

  const handleShelterCardPress = (id: number) => {
    console.log("보호소 카드 클릭:", id);
  };

  const handleRealTimeSearchToggle = () => {
    if (isRealTimeSearchActive) {
      setShowStopPopup(true);
    } else {
      setShowKeywordPopup(true);
    }
  };

  const handleKeywordPopupStart = (popupKeywords: string[]) => {
    console.log("실시간 AI 탐색 시작:", popupKeywords);
    setIsRealTimeSearchActive(true);
    setShowKeywordPopup(false);
  };

  const handleStopPopupConfirm = () => {
    console.log("실시간 AI 탐색 종료");
    setIsRealTimeSearchActive(false);
    setShowStopPopup(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>AI 탐색 결과 불러오는 중...</Text>
        </View>
      );
    }

    if (activeTab === "discovered") {
      const dataToShow =
        hasSearched && keywords.length > 0 ? searchResults : foundPetList;

      return dataToShow.length > 0 ? (
        <View style={styles.resultsContainer}>
          {dataToShow.map((item) => (
            <FindCard
              key={item.postId}
              date={formatDate(item.foundDate)}
              location={item.foundLocation}
              status={`${item.kindNm} / ${getSexInKorean(item.sex)}`}
              image={item.imgUrl}
              onPress={() => handleCardPress(item)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {hasSearched
              ? "발견동물 탐색 결과가 없습니다"
              : "발견동물 목록이 없습니다"}
          </Text>
        </View>
      );
    }

    if (activeTab === "sns") {
      return snsResults.length > 0 ? (
        <View style={styles.resultsContainer}>
          {snsResults.map((item) => (
            <SNSCard
              key={item.id}
              keywords={item.keywords}
              platform={item.platform}
              image={item.image}
              onPress={() => handleSNSCardPress(item.id)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>SNS 탐색 결과가 없습니다</Text>
        </View>
      );
    }

    if (activeTab === "report") {
      return shelterResults.length > 0 ? (
        <View style={styles.resultsContainer}>
          {shelterResults.map((item, index) => (
            <ShelterCard
              key={index}
              name={item.shelterName}
              location={item.shelterLocation}
              contact={item.shelterTel}
              image={item.petImg}
              foundLocation={item.foundLocation}
              feature={item.feature}
              onPress={() => handleShelterCardPress(index)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {hasSearched
              ? "보호소 탐색 결과가 없습니다"
              : "보호소 목록이 없습니다"}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>준비 중입니다</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <SearchBar
          value={searchText}
          onChange={setSearchText}
          onAddKeyword={handleAddKeyword}
        />
        <KeywordTags
          keywords={keywords}
          onRemoveKeyword={handleRemoveKeyword}
          onSearch={handleKeywordSearch}
        />

        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          {renderContent()}
        </ScrollView>
      </View>

      <View style={styles.fixedButtonContainer}>
        <AISearchBtn
          onPress={handleRealTimeSearchToggle}
          isActive={isRealTimeSearchActive}
        />
      </View>

      <AIKeyWordPopup
        visible={showKeywordPopup}
        onClose={() => setShowKeywordPopup(false)}
        onStart={handleKeywordPopupStart}
        petId={petId || 1} // petId를 전달하고, 없으면 기본값 1 사용
      />

      <AIStopPopup
        visible={showStopPopup}
        onClose={() => setShowStopPopup(false)}
        onConfirm={handleStopPopupConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 100,
  },
  resultsContainer: {
    paddingVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: "#333333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666666",
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});

export default AIScreen;
