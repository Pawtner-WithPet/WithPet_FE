import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "../../../components/Header";
import { Colors } from "../../../constants/colors";
import NoseCard from "../../../components/NoseList/NoseCard";
import FloatingBtn from "../../../components/NoseList/FloatingBtn";
import { useNavigation } from "@react-navigation/native";
import dogIcon from "../../../assets/icons/dog.png";
import cameraIcon from "../../../assets/icons/camera.png";

const NoseScreen: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();

  const handleDogButtonPress = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleLoadNoseData = () => {
    // 여기에 비문 불러오기 동작을 정의
    console.log("비문 불러오기");
  };

  const noseData = [
    {
      id: 1,
      date: "2025.03.01 11:25",
      location: "서울특별시 도봉구",
      percentage: "99%",
      image: {
        uri: "https://via.placeholder.com/100x100/FFB6C1/000000?text=👃",
      },
    },
    {
      id: 2,
      date: "2025.03.01 11:25",
      location: "서울특별시 도봉구",
      percentage: "95%",
      image: {
        uri: "https://via.placeholder.com/100x100/87CEEB/000000?text=👃",
      },
    },
    {
      id: 3,
      date: "2025.03.01 11:25",
      location: "서울특별시 도봉구",
      percentage: "94%",
      image: {
        uri: "https://via.placeholder.com/100x100/98FB98/000000?text=👃",
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>반려견 찾기</Text>
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
      <View style={styles.floatingButtonsContainer}>
        <View style={styles.leftButtonGroup}>
          <FloatingBtn icon={dogIcon} onPress={handleDogButtonPress} />

          {isExpanded && (
            <TouchableOpacity
              style={styles.expandedButton}
              onPress={handleLoadNoseData}
            >
              <View style={styles.expandedButtonContent}>
                <Text style={styles.expandedButtonText}>비문 불러오기</Text>
                <Text style={styles.sortArrow}>▼</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* 오른쪽 버튼 */}
        <FloatingBtn
          icon={cameraIcon}
          onPress={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
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
    paddingBottom: 30,
  },
  title: {
    fontSize: 19,
    fontWeight: "semibold",
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
    marginLeft: 10,
    fontSize: 12,
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  floatingButtonsContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  floatingButton: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: "#4262FF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonIcon: {
    width: 50,
    height: 50,
    tintColor: "white",
  },
  expandedButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  expandedButton: {
    backgroundColor: "#3D5AFE",
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 10,
    marginLeft: 10,
  },
  expandedButtonText: {
    color: "white",
    fontSize: 14,
  },
  leftButtonGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default NoseScreen;
