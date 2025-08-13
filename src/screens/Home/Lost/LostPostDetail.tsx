// screens/Home/Lost/LostPostDetail.tsx
import React, { useMemo, useState } from "react";
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, Pressable, ImageSourcePropType,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../../../constants/colors";
import iconChat from "../../../assets/icons/chat.png";
import woman from "../../../assets/icons/woman.png";
import man from "../../../assets/icons/man.png";
import iconZoom from "../../../assets/icons/zoom.png";
import icon_detail_page from "../../../assets/icons/icon_detail_page.png";
import happy1 from "../../../assets/images/happy1.png";

type Gender = "male" | "female";
type LostPost = {
  id: string;
  status: "실종" | "발견";
  gender?: Gender;
  name?: string;
  age?: string;
  breed?: string;
  height?: string;
  weight?: string;
  location?: string;
  lostDateTime?: string;
  foundDateTime?: string;
  feature?: string;
  extra?: string;
  familiar?: string;
  image?: ImageSourcePropType | { uri: string };
};

const LostPostDetail: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const post: LostPost = route.params?.post ?? {};

  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  let lastTap = 0;

  const isFound = post.status === "발견";

  const coverSource: ImageSourcePropType = useMemo(
    () => (post.image ? (post.image as ImageSourcePropType) : (happy1 as ImageSourcePropType)),
    [post.image]
  );

  const dateTimeLabel = isFound ? "발견 날짜 및 시간" : "실종 날짜 및 시간";
  const dateTimeValue = isFound ? (post.foundDateTime ?? "-") : (post.lostDateTime ?? "-");
  const locationLabel = isFound ? "발견 위치" : "실종 위치";

  const Chip = ({ label, value }: { label: string; value?: string }) => (
    <View style={styles.chip}>
      <Text style={styles.chipLabel}>{label}</Text>
      <Text style={styles.chipValue}>{value?.trim() ? value : "미측정"}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={icon_detail_page} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>동물 상세보기</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 70  }} showsVerticalScrollIndicator={false}>
        <View style={styles.coverWrap}>
          <Image source={coverSource} style={styles.cover} resizeMode="cover" />
          <TouchableOpacity style={styles.fabSmall} activeOpacity={0.9} onPress={() => { setZoomScale(1); setZoomOpen(true); }}>
            <Image source={iconZoom} />
          </TouchableOpacity>
          <View style={styles.dotsWrap}>
            <View style={[styles.dot, styles.dotActive]} /><View style={styles.dot} /><View style={styles.dot} />
          </View>
        </View>

        {/* 카드 */}
        <View style={styles.infoCard}>
          <TouchableOpacity style={styles.chatBtn} activeOpacity={0.9}>
            <Image source={iconChat} style={styles.chatIcon} />
          </TouchableOpacity>

          {/* 이름/성별 영역 */}
          {(!isFound || post.name || post.gender) && (
            <View style={styles.nameRow}>
              {!isFound && <Text style={styles.name}>{post.name ?? "이름 미등록"}</Text>}
              {post.gender && (
                <View style={styles.genderRow}>
                  <View style={[styles.genderPill, post.gender === "female" ? styles.genderActive : styles.genderInactive]}>
                    <Image source={woman} style={styles.genderIcon} />
                  </View>
                  <View style={[styles.genderPill, post.gender === "male" ? styles.genderActive : styles.genderInactive]}>
                    <Image source={man} style={styles.genderIcon} />
                  </View>
                </View>
              )}
            </View>
          )}

          {/* 칩 영역 */}
          <View style={styles.chipsRow}>
            {!isFound && <Chip label="나이"  value={post.age} />}
            <Chip label="견종" value={post.breed} />
            {!isFound && <Chip label="신장"  value={post.height} />}
            {!isFound && <Chip label="체중"  value={post.weight} />}
          </View>

          {/* 본문 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{locationLabel}</Text>
            <Text style={styles.sectionBody}>{post.location ?? "-"}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{dateTimeLabel}</Text>
            <Text style={styles.sectionBody}>{dateTimeValue}</Text>
          </View>

          {/* 특징 */}
          {!isFound && post.feature?.trim() && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>특징</Text>
              <Text style={styles.featureText}>{post.feature}</Text>
            </View>
          )}

          {/* 추가 설명 */}
          {post.extra?.trim() && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>추가 설명</Text>
              <Text style={styles.noteText}>{post.extra}</Text>
            </View>
          )}

          {/* 산책 경로 및 익숙한 장소*/}
          {!isFound && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>산책 경로 및 익숙한 장소</Text>
              {post.familiar && post.familiar.trim() ? (
                <Image source={happy1} style={styles.familiarImage} resizeMode="cover" />
              ) : (
                <View style={styles.familiarPlaceholder}>
                  <Text style={styles.familiarPlaceholderText}>정보 없음</Text>
                </View>
              )}
            </View>
          )}



          {/* 줌 */}
          <Modal visible={zoomOpen} transparent animationType="fade" onRequestClose={() => setZoomOpen(false)}>
            <Pressable
              style={styles.zoomBackdrop}
              onPress={() => {
                const now = Date.now();
                if (now - lastTap < 250) setZoomScale(s => (s > 1 ? 1 : 2));
                lastTap = now;
              }}
            >
              <Image source={coverSource} resizeMode="contain" style={[styles.zoomImage, { transform: [{ scale: zoomScale }] }]} />
              <TouchableOpacity style={styles.zoomClose} onPress={() => setZoomOpen(false)}>
                <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>닫기</Text>
              </TouchableOpacity>
            </Pressable>
          </Modal>
        </View>
      </ScrollView>

      {/* 완료하기 버튼 */}
      <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => setConfirmOpen(true)}>
            <Text style={styles.primaryBtnText}>완료하기</Text>
          </TouchableOpacity>
      </View>

      <Modal visible={confirmOpen} transparent animationType="fade" onRequestClose={() => setConfirmOpen(false)} >
        <View style={styles.popupBackdrop}>
          <View style={styles.popupCard}>
            <TouchableOpacity style={styles.popupClose} onPress={() => setConfirmOpen(false)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} >
              <Text style={{ fontSize: 20 }}>×</Text>
            </TouchableOpacity>
            <Text style={styles.popupText}>
              지금부터 해당 반려견은 “미실종” 처리가 되며, {'\n'}
              게시글도 영원히 삭제가 됩니다{'\n'}
            </Text>

            <TouchableOpacity style={styles.popupPrimaryBtn} onPress={() => { setConfirmOpen(false); navigation.goBack(); }} activeOpacity={0.9} >
              <Text style={styles.popupPrimaryBtnText}>완료하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  backButton: {
    marginRight: 90,
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    transform: [{ scaleX: -1 }],
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
  },

  coverWrap: {
    position: "relative",
    overflow: "hidden",
  },
  cover: {
    width: "100%",
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
  dotActive: {
    backgroundColor: "#fff",
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
  chatIcon: {
    width: 50,
    height: 50,
    tintColor: "#4262FF",
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  name: {
    fontSize: 25,
    fontWeight: "800",
    color: "#111",
    flex: 0,
  },
  genderRow: {
    flexDirection: "row",
    marginLeft: 12,
    gap: 8,
  },
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
    tintColor: "#fff",
  },
  genderActive: {
    backgroundColor: "#4262FF",
  },
  genderInactive: {
    backgroundColor: "#D9D9D9",
  },

  chipsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  chip: {
    width: 85,
    height: 80,
    backgroundColor: "#F7F8FB",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E6E8EF",
    justifyContent: "center",
  },
  chipLabel: {
    fontSize: 15,
    color: "#000000",
    marginBottom: 4,
    fontWeight: "800",
    textAlign: "center",
  },
  chipValue: {
    fontSize: 14,
    color: "#4262FF",
    textAlign: "center",
  },

  section: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
    marginBottom: 6,
  },
  sectionBody: {
    fontSize: 13,
    color: "#333",
  },

  familiarImage: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginTop: 8,
  },
  familiarPlaceholder: {
    height: 160,
    borderRadius: 12,
    backgroundColor: "#EDEFF3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  familiarPlaceholderText: {
    color: "#777",
    fontSize: 14,
  },

  featureText: {
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
  },
  noteText: {
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
  },

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
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  popupBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  popupCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    position: "relative",
  },
  popupClose: {
    position: "absolute",
    right: 14,
    top: 14,
  },
  popupText: {
    color: "#111",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 12,
    marginBottom: 22,
  },
  popupPrimaryBtn: {
    alignSelf: "center",
    backgroundColor: "#1F2A44",
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 10,
  },
  popupPrimaryBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});


export default LostPostDetail;
