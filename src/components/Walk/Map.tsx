import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export const Map: React.FC = () => {
  return (
    <View style={styles.mapContainer}>
      {/* 지도 영역 */}
      <View style={styles.mapView}>
        {/* 실제 구현 시 react-native-maps 사용 */}
      </View>

      {/* 상단 헤더 버튼들 */}
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 우측 메뉴 버튼들 */}
      <View style={styles.rightButtons}>
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationButtonText}>🎯</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>≡</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  mapView: {
    flex: 1,
    backgroundColor: "#E8E8E8", // 임시 배경색
  },
  headerButtons: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 18,
    color: "#333",
  },
  searchButton: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButtonText: {
    fontSize: 16,
  },
  rightButtons: {
    position: "absolute",
    bottom: 120,
    right: 20,
    gap: 12,
  },
  locationButton: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationButtonText: {
    fontSize: 20,
  },
  menuButton: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuButtonText: {
    fontSize: 18,
    color: "#333",
  },
});
