import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { WalkRecord, Pet } from "../../../types/index";
import { WalkRecordsList } from "../../../components/Walk/WalkRecordsList";

interface WalkListScreenProps {
  onBack?: () => void; // 뒤로가기 콜백
}

export const WalkListScreen: React.FC<WalkListScreenProps> = ({ onBack }) => {
  // 샘플 펫 데이터
  const samplePets: Pet[] = [{ id: 1, name: "곰탱이", isActive: true }];

  // 샘플 산책 기록 데이터
  const sampleRecords: WalkRecord[] = [
    {
      date: "2025.07.21",
      time: "07:30~08:00",
      duration: "30분",
      distance: "2.7km",
      speed: "1.5m/s",
    },
    {
      date: "2025.05.18",
      time: "09:00~09:30",
      duration: "30분",
      distance: "2.9km",
      speed: "1.6m/s",
    },
    {
      date: "2025.04.06",
      time: "10:00~10:30",
      duration: "30분",
      distance: "3.0km",
      speed: "1.7m/s",
    },
    {
      date: "2025.03.01",
      time: "11:00~11:30",
      duration: "30분",
      distance: "2.5km",
      speed: "1.4m/s",
    },
  ];

  const handleRecordPress = (record: WalkRecord) => {
    Alert.alert("산책 기록", `${record.date} 산책 기록을 선택했습니다.`);
    // 여기서 상세 화면으로 네비게이션하거나 다른 액션을 수행할 수 있습니다.
  };

  const handleBackPress = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image
              source={require("../../../assets/icons/Vector.png")}
              style={[styles.backButtonImage, { transform: [{ scaleX: -1 }] }]} // 좌우 반전
            />
          </TouchableOpacity>

          <Text style={styles.title}>맵으로 보기</Text>

          <TouchableOpacity style={styles.searchButton}>
            <Image
              source={require("../../../assets/icons/search.png")}
              style={styles.searchButtonImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.recordsContainer}>
        <WalkRecordsList
          records={sampleRecords}
          onRecordPress={handleRecordPress}
          pets={samplePets}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5, // Android용 그림자
    shadowColor: "#000", // iOS용 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 위치
    shadowOpacity: 0.1, // 그림자 불투명도
    shadowRadius: 4, // 그림자 반경
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonImage: {
    width: 11,
    height: 21,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  searchButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonImage: {
    width: 24,
    height: 24,
  },
  recordsContainer: {
    flex: 1,
    marginTop: 14,
  },
});

export default WalkListScreen;
