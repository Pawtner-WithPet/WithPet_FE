import React from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Map } from "../../../components/Walk/Map";
import { PetTag } from "../../../components/Walk/PetTag";
import { WalkRecord } from "../../../types";

interface WalkRecordDetailProps {
  onBack?: () => void;
  record: WalkRecord;
}

export const WalkRecordDetail: React.FC<WalkRecordDetailProps> = ({ onBack, record }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Image
            source={require("../../../assets/icons/Vector.png")}
            style={[styles.headerIcon, { transform: [{ scaleX: -1 }] }]}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>산책 기록</Text>

        <TouchableOpacity style={styles.headerBtn}>
          <Image
            source={require("../../../assets/icons/search.png")}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>

      {/* ✅ 지도 */}
      <View style={styles.mapContainer}>
        <Map />
      </View>

      {/* ✅ 중간 버튼 영역 (지도 위, 카드 바로 위에 겹치게) */}
      <View style={styles.middleButtons}>
        <TouchableOpacity style={styles.circleBtn}>
          <Image
            source={require("../../../assets/icons/locate.png")}
            style={styles.circleIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.circleBtn}>
          <Image
            source={require("../../../assets/icons/menu.png")}
            style={styles.circleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* ✅ 하단 카드 */}
      <View style={styles.infoCard}>
        <View style={styles.petRow}>
          <PetTag pet={{ id: 1, name: "해피", isActive: true }} />
          <PetTag pet={{ id: 2, name: "조이", isActive: true }} />
        </View>

        <Text style={styles.dateText}>
          {record.date} / {record.time}
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Image
              source={require("../../../assets/icons/time.png")}
              style={styles.statIcon}
            />
            <View>
              <Text style={styles.statLabel}>시간</Text>
              <Text style={styles.statValue}>{record.duration}</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <Image
              source={require("../../../assets/icons/map.png")}
              style={styles.statIcon}
            />
            <View>
              <Text style={styles.statLabel}>거리</Text>
              <Text style={styles.statValue}>{record.distance}</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <Image
              source={require("../../../assets/icons/speed.png")}
              style={styles.statIcon}
            />
            <View>
              <Text style={styles.statLabel}>속도</Text>
              <Text style={styles.statValue}>{record.speed}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  /* ✅ 상단 헤더 */
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    backgroundColor: "white",
    elevation: 5,
    zIndex: 20,
  },
  headerBtn: { width: 44, height: 44, justifyContent: "center", alignItems: "center" },
  headerIcon: { width: 20, height: 20, tintColor: "#000" },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },

  /* ✅ 지도 */
  mapContainer: {
    flex: 1,
  },

  /* ✅ 중간 양사이드 버튼 (카드 바로 위에 위치) */
  middleButtons: {
    position: "absolute",
    bottom: 200, // 카드 위에 살짝 겹치게
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    zIndex: 15,
  },
  circleBtn: {
    width: 51,
    height: 51,
    backgroundColor: "white",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  circleIcon: {
    width: 28,
    height: 28,
    tintColor: "#333",
    resizeMode: "contain",
  },

  /* ✅ 하단 카드 */
  infoCard: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  petRow: { flexDirection: "row", marginBottom: 8 },
  dateText: { fontSize: 16, fontWeight: "bold", color: "#000", marginBottom: 12 },
  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statItem: { flexDirection: "row", alignItems: "center" },
  statIcon: { width: 22, height: 22, marginRight: 8, tintColor: "#777" },
  statLabel: { fontSize: 13, color: "#777" },
  statValue: { fontSize: 15, fontWeight: "bold", color: "#4262FF" },
});

export default WalkRecordDetail;
