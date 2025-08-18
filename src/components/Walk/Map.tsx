import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Geolocation from "@react-native-community/geolocation";

interface MapProps {
  onMenuPress?: () => void; // 메뉴 버튼 클릭 핸들러
}

interface Location {
  latitude: number;
  longitude: number;
}

export const Map: React.FC<MapProps> = ({ onMenuPress }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  useEffect(() => {
    // 현재 위치 가져오기 (시뮬레이션)
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    // 실제 위치 서비스 대신 시뮬레이션
    // 실제 앱에서는 Geolocation.getCurrentPosition 사용
    setTimeout(() => {
      const simulatedLocation = {
        latitude: 37.5665,
        longitude: 126.978,
      };
      setCurrentLocation(simulatedLocation);
    }, 1000);

    // 실제 위치 서비스 코드 (주석 처리)
    /*
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.log("Location error:", error);
        Alert.alert("위치 오류", "현재 위치를 가져올 수 없습니다.");
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    */
  };

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    }
  };

  const handleLocationPress = () => {
    getCurrentLocation();
  };

  return (
    <View style={styles.mapContainer}>
      {/* 정적 지도 이미지 */}
      <Image
        source={require("../../assets/images/map.png")}
        style={styles.mapImage}
        resizeMode="cover"
      />

      {/* 시뮬레이션된 현재 위치 마커 */}
      {currentLocation && (
        <View style={styles.markerContainer}>
          <View style={styles.currentLocationMarker}>
            <Image
              source={require("../../assets/icons/puppy.png")}
              style={styles.puppyMarker}
            />
          </View>
        </View>
      )}

      {/* 헤더 그라데이션 배경 */}
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0.9)",
          "rgba(255, 255, 255, 0.7)",
          "rgba(255, 255, 255, 0)",
        ]}
        locations={[0, 0.5, 1]}
        style={styles.headerGradient}
      />

      {/* 상단 헤더 버튼들 */}
      <View style={styles.headerButtons}>
        {/* 뒤로 가기 버튼 */}
        <TouchableOpacity style={styles.backButton}>
          <Image
            source={require("../../assets/icons/Vector.png")}
            style={[styles.backButtonImage, { transform: [{ scaleX: -1 }] }]} // 좌우 반전
          />
        </TouchableOpacity>

        {/* 로고 이미지 */}
        <Image
          source={require("../../assets/icons/logo.png")} // 로고 이미지 경로 설정
          style={styles.logoImage} // 로고 스타일
        />

        {/* 검색 버튼 */}
        <TouchableOpacity style={styles.searchButton}>
          <Image
            source={require("../../assets/icons/search.png")}
            style={styles.searchButtonImage} // 스타일 추가
          />
        </TouchableOpacity>
      </View>

      {/* 오른쪽 위치 및 메뉴 버튼들 */}
      <View style={styles.rightButtons}>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleLocationPress}
        >
          <Image
            source={require("../../assets/icons/locate.png")}
            style={styles.locateImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Text style={styles.menuButtonText}>☰</Text>
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
  mapImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10.5 }, { translateY: -100.5 }],
    zIndex: 5,
  },
  currentLocationMarker: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#0E5489",
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  puppyMarker: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 5,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    top: 20,
    left: 10,
    right: 10,
    zIndex: 10,
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
  logoImage: {
    width: 46,
    height: 23,
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
  rightButtons: {
    position: "absolute",
    bottom: 130,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    zIndex: 10,
  },
  locationButton: {
    width: 51,
    height: 51,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locateImage: {
    width: 37,
    height: 37,
  },
  menuButton: {
    width: 51,
    height: 51,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
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
  demoOverlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    zIndex: 10,
  },
  demoText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default Map;
