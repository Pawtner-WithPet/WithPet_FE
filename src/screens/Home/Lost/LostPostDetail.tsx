// screens/Home/Lost/LostPostDetail.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
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
  const [zoomScale, setZoomScale] = useState(1);
  let lastTap = 0;

  const pet = {
    name: "포포",
    gender: "female" as "male" | "female",
    age: "1살",
    breed: "포메라니안",
    height: "미측정",
    weight: "미측정",
  };

  const Chip = ({ label, value }: { label: string; value?: string }) => (
    <View style={styles.chip}>
      <Text style={styles.chipLabel}>{label}</Text>
      <Text style={styles.chipValue}>{value ?? "미측정"}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={icon_detail_page} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>동물 상세보기</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 커버 이미지 */}
        <View style={styles.coverWrap}>
          <Image source={happy1} style={styles.cover} resizeMode="cover" />
          <TouchableOpacity
            style={styles.fabSmall}
            activeOpacity={0.9}
            onPress={() => {
              setZoomScale(1);
              setZoomOpen(true);
            }}
          >
            <Image source={iconZoom} />
          </TouchableOpacity>

          {/* 페이지 인디케이터 느낌의 점 */}
          <View style={styles.dotsWrap}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* 사진 아래 정보 카드 (산책 경로 직전까지 포함) */}
        <View style={styles.infoCard}>
          {/* 채팅 버튼 */}
          <TouchableOpacity style={styles.chatBtn} activeOpacity={0.9}>
            <Image source={iconChat} style={styles.chatIcon} />
          </TouchableOpacity>

          {/* 이름 + 성별 */}
          <View style={styles.nameRow}>
            <Text style={styles.name}>{pet.name}</Text>
            <View style={styles.genderRow}>
              <View
                style={[
                  styles.genderPill,
                  pet.gender === "female"
                    ? styles.genderActive
                    : styles.genderInactive,
                ]}
              >
                <Image
                  source={woman}
                  style={[
                    styles.genderIcon,
                    pet.gender === "female"
                      ? styles.genderIconActive
                      : styles.genderIconInactive,
                  ]}
                />
              </View>
              <View
                style={[
                  styles.genderPill,
                  pet.gender === "male"
                    ? styles.genderActive
                    : styles.genderInactive,
                ]}
              >
                <Image
                  source={man}
                  style={[
                    styles.genderIcon,
                    pet.gender === "male"
                      ? styles.genderIconActive
                      : styles.genderIconInactive,
                  ]}
                />
              </View>
            </View>
          </View>

          {/* 칩 4개 */}
          <View style={styles.chipsRow}>
            <Chip label="나이" value={pet.age} />
            <Chip label="견종" value={pet.breed} />
            <Chip label="신장" value={pet.height} />
            <Chip label="체중" value={pet.weight} />
          </View>

          {/* 카드 내부 본문 섹션들 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>실종 위치</Text>
            <Text style={styles.sectionBody}>서울 강북구 수유역 부근</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>실종 날짜 및 시간</Text>
            <Text style={styles.sectionBody}>2025.03.01 오후 3시경</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>특징</Text>
            <Text style={styles.featureText}>
              겁이 많은 편이에요.{"\n"}이름을 부르면 알아들어요.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>추가 설명</Text>
            <Text style={styles.noteText}>
              사례금 100만원{"\n"}찾으시면 채팅보다는 연락처로 전화주세요.
            </Text>
          </View>

          {/* 산책 경로 및 익숙한 장소 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>산책 경로 및 익숙한 장소</Text>
            <View style={styles.mapPlaceholder}>
              <Text style={{ color: "#777", fontSize: 12 }}>
                지도 영역 (플레이스홀더)
              </Text>
            </View>
          </View>
          <Modal
            visible={zoomOpen}
            transparent
            animationType="fade"
            onRequestClose={() => setZoomOpen(false)}
          >
            <Pressable
              style={styles.zoomBackdrop}
              onPress={() => {
                const now = Date.now();
                if (now - lastTap < 250) {
                  // 더블탭: 1x <-> 2x 토글
                  setZoomScale((s) => (s > 1 ? 1 : 2));
                }
                lastTap = now;
              }}
            >
              <Image
                source={happy1}
                resizeMode="contain"
                style={[
                  styles.zoomImage,
                  { transform: [{ scale: zoomScale }] },
                ]}
              />
              <TouchableOpacity
                style={styles.zoomClose}
                onPress={() => setZoomOpen(false)}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}
                >
                  닫기
                </Text>
              </TouchableOpacity>
            </Pressable>
          </Modal>
        </View>
      </ScrollView>

      {/* 하단 CTA */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>완료하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  // 헤더
  headerWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  backButton: { marginRight: 90 },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    transform: [{ scaleX: -1 }],
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1A1A1A" },

  // 커버
  coverWrap: { position: "relative", overflow: "hidden" },
  cover: { width: "100%", height: 300 },
  fabSmall: {
    position: "absolute",
    right: 10,
    bottom: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  dotsWrap: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  dotActive: { backgroundColor: "#fff" },

  // 사진 아래 카드
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
  name: { fontSize: 25, fontWeight: "800", color: "#111", flex: 0 },
  genderRow: { flexDirection: "row", marginLeft: 12, gap: 8 },
  genderPill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  genderIcon: { width: 18, height: 18, tintColor: "#fff" },
  genderIconActive: { tintColor: "#fff" },
  genderIconInactive: { tintColor: "#fff" },
  genderActive: { backgroundColor: "#4262FF" },
  genderInactive: { backgroundColor: "#D9D9D9" },

  // 칩
  chipsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  chip: {
    flex: 1,
    backgroundColor: "#F7F8FB",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E8EF",
  },
  chipLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 6,
    fontWeight: "600",
  },
  chipValue: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "800",
  },

  // 섹션
  section: { paddingHorizontal: 18, paddingTop: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
    marginBottom: 6,
  },
  sectionBody: { fontSize: 13, color: "#333" },

  featureText: { fontSize: 13, color: "#333", lineHeight: 18 },
  noteText: { fontSize: 13, color: "#333", lineHeight: 18 },

  mapPlaceholder: {
    height: 160,
    borderRadius: 12,
    backgroundColor: "#EDEFF3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  zoomBackdrop: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  zoomImage: {
    width: "100%",
    height: "100%",
  },
  zoomClose: {
    position: "absolute",
    top: 36,
    right: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#00000066",
    borderRadius: 20,
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    backgroundColor: "#ffffffee",
  },
  primaryBtn: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#4262FF",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "800" },
});

export default LostPostDetail;
