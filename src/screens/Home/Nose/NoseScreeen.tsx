import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, } from "react-native";
import Header from "../../../components/Header";
import { Colors } from "../../../constants/colors";
import NoseCard from "../../../components/NoseList/NoseCard";
import { Image } from "react-native-svg";

const NoseScreen: React.FC = () => {
  const noseData = [
    {
      id: 1,
      date: "2025.03.01 11:25",
      location: "서울특별시 도봉구",
      percentage: "99%",
      image: {
        uri: "https://via.placeholder.com/100x100/FFB6C1/000000?text=👃",
      }, // 임시 이미지
    },
    {
      id: 2,
      date: "2025.03.01 11:25",
      location: "서울특별시 도봉구",
      percentage: "95%",
      image: {
        uri: "https://via.placeholder.com/100x100/87CEEB/000000?text=👃",
      }, // 임시 이미지
    },
    {
      id: 3,
      date: "2025.03.01 11:25",
      location: "서울특별시 도봉구",
      percentage: "94%",
      image: {
        uri: "https://via.placeholder.com/100x100/98FB98/000000?text=👃",
      }, // 임시 이미지
    },
  ];

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>반려견 찾기</Text>
          <View style={styles.sortContainer}>
            <Text style={styles.sortText}>최신순</Text>
            <Text style={styles.sortArrow}>▼</Text>
          </View>
        </View>
        {noseData.map((item) => (
          <NoseCard
            key={item.id}
            date={item.date}
            location={item.location}
            percentage={item.percentage}
            image={item.image}
          />
        ))}
      </ScrollView>

      {/* 하단 플로팅 버튼들 */}
      <View style={styles.floatingButtons}>
        <TouchableOpacity style={styles.floatingButton}>
          <Text style={styles.buttonText}>🐕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.floatingButton}>
          <Text style={styles.buttonText}>📷</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background || "#f5f5f5",
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text || "#000",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    fontSize: 16,
    color: Colors.text || "#000",
    marginRight: 8,
  },
  sortArrow: {
    fontSize: 12,
    color: Colors.text || "#000",
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  floatingButtons: {
    position: "absolute",
    bottom: 100,
    right: 20,
    flexDirection: "column",
    gap: 12,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 24,
    color: "white",
  },
});

export default NoseScreen;
