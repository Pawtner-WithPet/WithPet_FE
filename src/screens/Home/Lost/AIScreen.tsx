import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
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
  fetchLostPetList,
  FindResult,
  LostPet,
  getSexInKorean,
  formatDate,
} from "../../../services/api/AIScreen";
import {
  searchResults,
  snsResults,
  shelterResults,
} from "../../../mocks/dummyData";

type RouteParams = {
  selectedPet?: string;
};

type AIScreenRouteProp = RouteProp<{ AIScreen: RouteParams }, "AIScreen">;

const AIScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("discovered");
  const [searchText, setSearchText] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]); // 키워드 상태 추가
  const [searchResults, setSearchResults] = useState<FindResult[]>([]); // 검색 결과 상태
  const [lostPetList, setLostPetList] = useState<LostPet[]>([]); // 실종동물 목록 상태
  const [hasSearched, setHasSearched] = useState(false); // 검색 여부 상태
  const [isLoading, setIsLoading] = useState(false);
  const [showKeywordPopup, setShowKeywordPopup] = useState(false);
  const [showStopPopup, setShowStopPopup] = useState(false);
  const [isRealTimeSearchActive, setIsRealTimeSearchActive] = useState(false);

  const route = useRoute<AIScreenRouteProp>();
  const { selectedPet } = route.params || {};

  // 선택된 반려견 정보는 받지만 키워드로 자동 설정하지 않음
  useEffect(() => {
    if (selectedPet) {
      console.log(`${selectedPet}를 선택하여 AI 탐색 페이지로 이동했습니다.`);
    }
  }, [selectedPet]);

  // 컴포넌트 마운트 시 실종동물 목록 불러오기
  useEffect(() => {
    const loadLostPetList = async () => {
      if (activeTab === "discovered" && !hasSearched) {
        setIsLoading(true);
        try {
          const results = await fetchLostPetList();
          setLostPetList(results);
          console.log("실종동물 목록:", results);
        } catch (error) {
          console.error("실종동물 목록 로딩 중 오류:", error);
          setLostPetList([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadLostPetList();
  }, [activeTab, hasSearched]);

  // 키워드 추가 함수
  const handleAddKeyword = () => {
    if (searchText.trim() && !keywords.includes(searchText.trim())) {
      setKeywords([...keywords, searchText.trim()]);
      setSearchText(""); // 입력창 비우기
    }
  };

  // 키워드 제거 함수
  const handleRemoveKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);

    // 모든 키워드가 제거되면 검색 상태 초기화
    if (newKeywords.length === 0) {
      setHasSearched(false);
      setSearchResults([]);
    }
  };

  // 키워드로 검색하는 함수
  const handleKeywordSearch = async () => {
    if (keywords.length > 0) {
      console.log("키워드 검색:", keywords);
      setIsLoading(true);
      setHasSearched(true);

      try {
        // 키워드들을 쉼표로 구분하여 문자열로 변환
        const keywordsString = keywords.join(",");
        const results = await fetchFoundPetResults({
          petId: 1,
          keywords: keywordsString,
        });
        setSearchResults(results);
        console.log("발견동물 검색 결과:", results);
      } catch (error) {
        console.error("검색 중 오류:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSearch = async () => {
    // 현재 입력된 텍스트도 키워드로 추가하고 검색
    const updatedKeywords = [...keywords];
    if (searchText.trim() && !keywords.includes(searchText.trim())) {
      updatedKeywords.push(searchText.trim());
      setKeywords(updatedKeywords);
      setSearchText("");
    }

    if (updatedKeywords.length > 0) {
      console.log("검색 키워드:", updatedKeywords);
      setIsLoading(true);
      setHasSearched(true);

      try {
        const keywordsString = updatedKeywords.join(",");
        const results = await fetchFoundPetResults({
          petId: 1,
          keywords: keywordsString,
        });
        setSearchResults(results);
        console.log("발견동물 검색 결과:", results);
      } catch (error) {
        console.error("검색 중 오류:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCardPress = (postId: number) => {
    console.log("카드 클릭:", postId);
  };

  const handleSNSCardPress = (id: number) => {
    console.log("SNS 카드 클릭:", id);
  };

  const handleShelterCardPress = (id: number) => {
    console.log("보호소 카드 클릭:", id);
  };

  const handleRealTimeSearchToggle = () => {
    if (isRealTimeSearchActive) {
      console.log("실시간 AI 탐색 끄기 팝업 열기");
      setShowStopPopup(true);
    } else {
      console.log("실시간 AI 탐색 켜놓기");
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
      // 검색을 했을 때는 발견동물 검색 결과를 보여줌
      if (hasSearched && keywords.length > 0) {
        return searchResults.length > 0 ? (
          <View style={styles.resultsContainer}>
            {searchResults.map((item) => (
              <FindCard
                key={item.postId}
                date={formatDate(item.foundDate)}
                location={item.foundLocation}
                status={`${item.kindNm} / ${getSexInKorean(item.sex)}`}
                image={item.imgUrl}
                onPress={() => handleCardPress(item.postId)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>발견동물 탐색 결과가 없습니다</Text>
          </View>
        );
      }

      // 검색 전 기본 화면에서는 실종동물 목록을 보여줌
      return lostPetList.length > 0 ? (
        <View style={styles.resultsContainer}>
          {lostPetList.map((item) => (
            <FindCard
              key={item.postId}
              date={formatDate(item.lostDate)}
              location={item.lostLocation}
              status={`${item.kindNm} / ${getSexInKorean(item.sex)}`}
              image={item.imgUrl}
              onPress={() => handleCardPress(item.postId)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>실종동물 목록이 없습니다</Text>
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
          {shelterResults.map((item) => (
            <ShelterCard
              key={item.id}
              name={item.name}
              location={item.location}
              contact={item.contact}
              image={item.image}
              onPress={() => handleShelterCardPress(item.id)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>보호소 탐색 결과가 없습니다</Text>
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
