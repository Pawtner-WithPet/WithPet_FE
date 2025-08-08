import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import Header from "../../../components/Header";
import TabNavigation from "../../../components/AIScreen/TabNavigation";
import SearchBar from "../../../components/AIScreen/SearchBar";
import KeywordTags from "../../../components/AIScreen/KeywordTags";
import FindCard from "../../../components/AIScreen/FindCard";
import SNSCard from "../../../components/AIScreen/SNSCard";
import ShelterCard from "../../../components/AIScreen/ShelterCard";
import AISearchBtn from "../../../components/AIScreen/AISearchBtn";
import AIKeyWordPopup from "../../../components/AIScreen/AIKeyWordPopup";
import {
  searchResults,
  snsResults,
  shelterResults,
} from "../../../mocks/dummyData";

const AIScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("discovered");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isRealTimeSearchActive, setIsRealTimeSearchActive] = useState(false); // 실시간 탐색 상태 추가

  const handleSearch = () => {
    console.log("검색:", searchText);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleCardPress = (id: number) => {
    console.log("카드 클릭:", id);
  };

  const handleSNSCardPress = (id: number) => {
    console.log("SNS 카드 클릭:", id);
  };

  const handleShelterCardPress = (id: number) => {
    console.log("보호소 카드 클릭:", id);
  };

  const handleRealTimeSearchToggle = () => {
    if (isRealTimeSearchActive) {
      // 실시간 탐색 끄기
      console.log("실시간 AI 탐색 끄기");
      setIsRealTimeSearchActive(false);
    } else {
      // 실시간 탐색 켜기 (팝업 열기)
      console.log("실시간 AI 탐색 켜놓기");
      setShowPopup(true);
    }
  };

  const handlePopupStart = (keywords: string[]) => {
    console.log("실시간 AI 탐색 시작:", keywords);
    setIsRealTimeSearchActive(true); // 실시간 탐색 활성화
    // 여기서 실제 탐색 로직 구현
    // API 호출이나 다른 처리 로직 추가
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
      return searchResults.length > 0 ? (
        <View style={styles.resultsContainer}>
          {searchResults.map((item) => (
            <FindCard
              key={item.id}
              date={item.date}
              location={item.location}
              status={item.status}
              image={item.image}
              onPress={() => handleCardPress(item.id)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>탐색 결과가 없습니다</Text>
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

    // 보호소 탭
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
          onSearch={handleSearch}
        />
        <KeywordTags />

        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContentContainer}
        >
          {renderContent()}
        </ScrollView>
      </View>

      {/* 하단 고정 버튼 */}
      <View style={styles.fixedButtonContainer}>
        <AISearchBtn
          onPress={handleRealTimeSearchToggle}
          isActive={isRealTimeSearchActive}
        />
      </View>

      {/* AIKeyWordPopup 추가 */}
      <AIKeyWordPopup
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        onStart={handlePopupStart}
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
    paddingBottom: 100, // 버튼 높이만큼 하단 여백 추가
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
