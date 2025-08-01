import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import Header from "../../../components/Header";
import TabNavigation from "../../../components/AIScreen/TabNavigation";
import SearchBar from "../../../components/AIScreen/SearchBar";
import KeywordTags from "../../../components/AIScreen/KeywordTags";
import AISearchCard from "../../../components/AIScreen/AISearchCard";
import AISearchBtn from "../../../components/AIScreen/AISearchBtn";

// 더미 데이터
const searchResults = [
  {
    id: 1,
    date: "2025.03.01 11:25",
    location: "서울특별시 도봉구",
    status: "건중 / 특징",
    image: { uri: "https://via.placeholder.com/60x60/FFB366/FFFFFF?text=DOG" },
  },
  {
    id: 2,
    date: "2025.03.01 11:25",
    location: "서울특별시 도봉구",
    status: "건중 / 특징",
    image: { uri: "https://via.placeholder.com/60x60/87CEEB/FFFFFF?text=DOG" },
  },
  {
    id: 3,
    date: "2025.03.01 11:25",
    location: "서울특별시 도봉구",
    status: "건중 / 특징",
    image: { uri: "https://via.placeholder.com/60x60/98FB98/FFFFFF?text=DOG" },
  },
];

const AIScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("discovered");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleRealTimeSearch = () => {
    console.log("실시간 AI 탐색 켜놓기");
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
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>
                AI 탐색 결과 불러오는 중...
              </Text>
            </View>
          ) : searchResults.length > 0 ? (
            <View style={styles.resultsContainer}>
              {searchResults.map((item) => (
                <AISearchCard
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
          )}
        </ScrollView>
      </View>

      {/* 하단 고정 버튼 */}
      <View style={styles.fixedButtonContainer}>
        <AISearchBtn onPress={handleRealTimeSearch} />
      </View>
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
