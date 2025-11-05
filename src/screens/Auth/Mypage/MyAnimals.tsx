import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator, // 로딩 인디케이터 추가
  Alert, // 오류 알림 추가
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import { Colors } from "../../../constants/colors";
// happy1 이미지는 실제 이미지 URL을 사용하거나, 로컬 경로를 활용해야 합니다.
import happy1 from "../../../assets/images/happy1.png"; 
import icon_detail_page from "../../../assets/icons/icon_detail_page.png";
import iconSearch from "../../../assets/icons/search.png";

// 1단계에서 정의한 API 함수와 타입을 임포트한다고 가정
// 만약 이 파일이 없다면, 1단계 코드를 먼저 추가해야 합니다.
import { fetchUserLostFoundPosts, LostFoundPost } from "../../../services/api/lostAndFound"; 

// MOCK_DATA 제거

const MyAnimals: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState("전체");
  
  // 실제 데이터와 로딩 상태 추가
  const [posts, setPosts] = useState<LostFoundPost[]>([]); 
  const [loading, setLoading] = useState(true);

  // 현재 사용자 ID (실제로는 로그인 세션에서 가져와야 함)
  const currentUserId = 1; 

  // 데이터 로딩 로직
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        // DB와 연동된 API를 호출하여 데이터 가져오기
        const fetchedPosts = await fetchUserLostFoundPosts(currentUserId); 
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("실종/발견 글 불러오기 실패:", error);
        Alert.alert("오류", "게시글 데이터를 불러오지 못했습니다."); 
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [currentUserId]); 


  const filtered =
    activeTab === "전체"
      ? posts
      : posts.filter((d) => d.status === activeTab);

  const renderItem = ({ item }: { item: LostFoundPost }) => { // 타입 수정
    const post = {
      id: item.id,
      status: item.status,
      age: item.age,
      breed: item.breed,
      feature: item.feature,
      location: item.location,
      lostDateTime: item.status === "실종" ? item.dateTime : undefined,
      foundDateTime: item.status === "발견" ? item.dateTime : undefined,
      // API에서 이미지 URL을 받으면 { uri: item.image }로 사용
      image: item.image ? { uri: item.image } : happy1, 
    };

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PetDetail", { post, from: "MyAnimals" })
        }
        activeOpacity={0.85}
        style={styles.card}
      >
        {/* image source를 조건부로 수정 */}
        <Image 
          source={typeof post.image === 'string' ? { uri: post.image } : post.image} 
          style={styles.image} 
        />
        <View style={styles.cardInfo}>
          <Text style={styles.date}>{item.dateTime}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.breedFeature}>
            {item.breed} / {item.feature.split('\n')[0]} {/* 특징이 긴 경우 한 줄만 표시 */}
          </Text>
        </View>
        <Image source={icon_detail_page} style={styles.arrowIcon} />
      </TouchableOpacity>
    );
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

      {/* 로딩 인디케이터 */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4262FF" />
          <Text style={{ textAlign: "center", marginTop: 10, color: "#666" }}>
            게시글을 불러오는 중...
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 40, color: "#999" }}>
              등록된 {activeTab} 게시글이 없습니다.
            </Text>
          }
        />
      )}
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
  // 로딩 컨테이너 스타일 추가
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});

export default MyAnimals;