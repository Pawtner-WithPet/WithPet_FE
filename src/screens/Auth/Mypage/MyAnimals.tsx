import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import { Colors } from "../../../constants/colors";
import happy1 from "../../../assets/images/happy1.png";
import icon_detail_page from "../../../assets/icons/icon_detail_page.png";
import iconSearch from "../../../assets/icons/search.png";
import { deleteFoundPost } from "src/services/api/deletepet";

const MOCK_DATA = [
  {
    id: "1",
    postId:"1",
    age: "8살",
    status: "실종",
    dateTime: "2025.03.01 11:25",
    location: "서울특별시 도봉구",
    breed: "포메라니안",
    feature: "겁이 많은 편이에요.\n이름을 부르면 알아들어요.",
    image: happy1,
  },
];

const MyAnimals: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState("전체");

  const filtered =
    activeTab === "전체"
      ? MOCK_DATA
      : MOCK_DATA.filter((d) => d.status === activeTab);

  const renderItem = ({ item }: { item: (typeof MOCK_DATA)[0] }) => {
    const post = {
      id: item.id,
      status: item.status,
      age: item.age,
      breed: item.breed,
      feature: item.feature,
      location: item.location,
      lostDateTime: item.status === "실종" ? item.dateTime : undefined,
      foundDateTime: item.status === "발견" ? item.dateTime : undefined,
      image: item.image,
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PetDetail", { post, from: "MyAnimals" })
        }
        activeOpacity={0.85}
        style={styles.card}
      >
        <Image source={item.image} style={styles.image} />
        <View style={styles.cardInfo}>
          <Text style={styles.date}>{item.dateTime}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.breedFeature}>
            {item.breed} / {item.feature}
          </Text>
        </View>
        <Image source={icon_detail_page} style={styles.arrowIcon} />
      </TouchableOpacity>
    );
  };

  const postId = 1;
  const handleDelete = async () => {
    try {
      const res = await deleteFoundPost(postId);
      Alert.alert("삭제 완료!");
      navigation.goBack(); // 목록으로 이동
    } catch (err: any) {
      if (err.code === "FoundPetPost_NOT_FOUND") {
        Alert.alert("삭제할 글을 찾을 수 없습니다.");
      } else {
        Alert.alert("서버 오류 발생. 다시 시도해주세요.");
      }
    }
  };


  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.goBack()}
        >
          <Image source={icon_detail_page} style={styles.headerIconBack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 실종 / 발견 동물</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Image source={iconSearch} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      {/* 탭 필터 */}
      <View style={styles.tabs}>
        {["전체", "실종", "발견"].map((label) => (
          <TouchableOpacity
            key={label}
            onPress={() => setActiveTab(label)}
            style={[styles.tabBtn, activeTab === label && styles.tabBtnActive]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === label && styles.tabTextActive,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            데이터 없음
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  headerBtn: {
    padding: 6,
  },
  headerIconBack: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    transform: [{ scaleX: -1 }], // 뒤집기
  },
  headerIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    width: 70,
    height: 32,
    alignItems: "center",
    backgroundColor: "#D9D9D9",
  },
  tabBtnActive: {
    backgroundColor: "#4262FF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#686767",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },

  divider: {
    height: 5,
    backgroundColor: "#E1E1E1",
    marginVertical: 12,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 2,
  },
  location: {
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
  },
  breedFeature: {
    fontSize: 13,
    color: "#777",
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: "#000",
  },
});

export default MyAnimals;
