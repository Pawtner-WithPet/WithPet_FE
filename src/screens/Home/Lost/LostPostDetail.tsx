// screens/Home/Lost/LostPostDetail.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../../../components/Header";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { Colors } from "../../../constants/colors";
import happy1 from "../../../assets/images/happy1.png";
import iconChat from "../../../assets/icons/chat.png";
import woman from "../../../assets/icons/woman.png";
import man from "../../../assets/icons/man.png";
import iconZoom from "../../../assets/icons/zoom.png";
import icon_detail_page from "../../../assets/icons/icon_detail_page.png";




const LostPostDetail: React.FC = () => {
  const navigation = useNavigation<any>();
  const [zoomOpen, setZoomOpen] = useState(false); 

  // 임시 데이터 (API 연동 시 교체)
  const pet = {
    name: "포포",
    gender: "female" as "male" | "female",
    age: "1살",
    breed: "포메라니안",
    height: "미측정",
    weight: "미측정",
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={icon_detail_page} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>실종동물 등록</Text>
        </View>
        <View style={styles.coverWrap}>
            <Image source={happy1} style={styles.cover} resizeMode="cover" />
            <TouchableOpacity
                style={styles.fabSmall}
                activeOpacity={0.9}
                onPress={() => setZoomOpen(true)}
            >
                <Image source={iconZoom} />
            </TouchableOpacity>
        </View>


        {/* 📌 사진 아래 정보 카드 */}
        <View style={styles.infoCard}>
          {/* 우상단 채팅 아이콘 */}
          <TouchableOpacity style={styles.chatBtn} activeOpacity={0.9}>
            <Image source={iconChat} style={styles.chatIcon} />
          </TouchableOpacity>

          {/* 이름 + 성별 */}
          <View style={styles.nameRow}>
            <Text style={styles.name}>{pet.name}</Text>
            <View style={styles.genderRow}>
              <View style={styles.genderRow}>
                <View
                    style={[
                    styles.genderPill,
                    pet.gender === "female" ? styles.genderActive : styles.genderInactive,
                    ]}
                >
                    <Image
                    source={woman}
                    style={[
                        styles.genderIcon,
                        pet.gender === "female" ? styles.genderIconActive : styles.genderIconInactive,
                    ]}
                    />
                </View>

                <View
                    style={[
                    styles.genderPill,
                    pet.gender === "male" ? styles.genderActive : styles.genderInactive,
                    ]}
                >
                    <Image
                    source={man}
                    style={[
                        styles.genderIcon,
                        pet.gender === "male" ? styles.genderIconActive : styles.genderIconInactive,
                    ]}
                    />
                </View>
                </View>
            </View>
          </View>

          {/* 4칩: 나이/견종/신장/체중 */}
          <View style={styles.chipGrid}>
            <View style={styles.chipItem}>
              <Text style={styles.chipLabel}>나이</Text>
              <Text style={styles.chipValue}>{pet.age}</Text>
            </View>
            <View style={styles.chipItem}>
              <Text style={styles.chipLabel}>견종</Text>
              <Text style={styles.chipValue}>{pet.breed}</Text>
            </View>
            <View style={styles.chipItem}>
              <Text style={styles.chipLabel}>신장</Text>
              <Text style={styles.chipValue}>{pet.height}</Text>
            </View>
            <View style={styles.chipItem}>
              <Text style={styles.chipLabel}>체중</Text>
              <Text style={styles.chipValue}>{pet.weight}</Text>
            </View>
          </View>
        </View>



        </ScrollView>
    </View>

    

  );
};

const R = 12;

const styles = StyleSheet.create({
    container: { 
    flex: 1, 
    backgroundColor:Colors.background
  },
  headerWrapper: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },

  backButton: {
    marginRight: 90,
  },

  backIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    transform: [{ scaleX: -1 }], 
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  Image:{
    width: "100%",
    height: 300,
  },








coverWrap: {
  position: 'relative',
  overflow: 'hidden',
},

cover: {
  width: '100%',
  height: 300,
},
  fabSmall: {
    position: "absolute",
    right: 10,
    bottom: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },







  

  infoCard: {
    marginTop: -20,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    elevation: 3,
  },

  chatBtn: {
    position: "absolute",
    right: 16,
    top: 16,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  chatIcon: { width: 50, height: 50, tintColor: "#4262FF" },

  nameRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  name: { fontSize: 32, fontWeight: "800", color: "#111", flex: 0 },
  genderRow: { flexDirection: "row", marginLeft: 12, gap: 8 },

  genderPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },


  genderIcon: {
  width: 18,
  height: 18,
  tintColor: "#9E9E9E", // 비활성화 색
},
genderIconActive: {
  tintColor: "#fff", // 활성화 시 흰색
},
genderIconInactive: {
  tintColor: "#9E9E9E",
},
  genderActive: { backgroundColor: "#3366FF" },
  genderInactive: { backgroundColor: "#E6E6E6" },
  genderSymbol: { fontSize: 18, fontWeight: "700" },
  genderSymbolActive: { color: "#fff" },
  genderSymbolInactive: { color: "#9E9E9E" },

  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  chipItem: {
    flexBasis: "48%",
    backgroundColor: "#F7F8FA",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  chipLabel: { fontSize: 18, fontWeight: "800", color: "#111", marginBottom: 6 },
  chipValue: { fontSize: 18, fontWeight: "700", color: "#3366FF" },
});



export default LostPostDetail;
