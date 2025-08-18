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
import Svg, { Path } from "react-native-svg";

interface MapProps {
  onMenuPress?: () => void; // 메뉴 버튼 클릭 핸들러
}

interface Location {
  latitude: number;
  longitude: number;
}

interface AlertMarker {
  id: string;
  latitude: number;
  longitude: number;
  type: "warning" | "danger" | "info";
  x: number; // 화면상의 x 좌표
  y: number; // 화면상의 y 좌표
}

export const Map: React.FC<MapProps> = ({ onMenuPress }) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [showRoute, setShowRoute] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // 알림 마커들 (사진 기반으로 위치 설정)
  const alertMarkers: AlertMarker[] = [
    {
      id: "1",
      latitude: 37.5675,
      longitude: 126.975,
      type: "warning",
      x: 150,
      y: 200,
    },
    {
      id: "2",
      latitude: 37.5685,
      longitude: 126.98,
      type: "warning",
      x: 300,
      y: 180,
    },
    {
      id: "4",
      latitude: 37.5645,
      longitude: 126.982,
      type: "danger",
      x: 320,
      y: 120,
    },
    {
      id: "5",
      latitude: 37.5635,
      longitude: 126.985,
      type: "info",
      x: 380,
      y: 380,
    },
  ];

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

  const handleMarkerPress = (markerId: string) => {
    if (selectedMarker === markerId) {
      // 같은 마커를 다시 클릭하면 경로 숨기기
      setShowRoute(false);
      setSelectedMarker(null);
    } else {
      // 다른 마커를 클릭하면 새로운 경로 표시
      setSelectedMarker(markerId);
      setShowRoute(true);
    }
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "warning":
        return "#FFA500"; // 오렌지
      case "danger":
        return "#FF4444"; // 빨강
      case "info":
        return "#00AA00"; // 초록
      default:
        return "#FFA500";
    }
  };

  // 선택된 마커까지의 경로를 동적으로 생성 (도로를 따라)
  const getRoutePath = () => {
    if (!selectedMarker) return "";

    const marker = alertMarkers.find((m) => m.id === selectedMarker);
    if (!marker) return "";

    // 현재 위치 (화면 중앙 하단)
    const startX = 300;
    const startY = 395;

    // 마커 위치 (마커 중심점)
    const endX = marker.x + 15;
    const endY = marker.y + 15;

    // 각 마커별로 도로를 따라가는 경로 정의
    switch (marker.id) {
      case "1": // 왼쪽 위 마커
        return `M${startX},${startY} L180,380 Q160,360 140,340 L130,320 Q125,300 130,280 L140,260 Q150,240 ${endX},${endY}`;
      case "2": // 오른쪽 위 마커
        return `M${startX},${startY} L220,380 Q240,360 260,340 L280,320 Q290,300 295,280 L300,260 Q305,240 ${endX},${endY}`;
      case "4": // 오른쪽 상단 마커
        return `M${startX},${startY}  Q250,350 270,330 L290,310 Q300,290 310,270 L315,250 Q320,230 325,210 L200,175 Q380,170 ${endX},${endY}`;
      case "5": // 오른쪽 하단 마커
        return `M${startX},${startY} L240,390 Q260,385 280,380 L300,375 Q320,370 340,365 L360,360 Q370,355 ${endX},${endY}`;
      default:
        return `M${startX},${startY} L${endX},${endY}`;
    }
  };

  return (
    <View style={styles.mapContainer}>
      {/* 정적 지도 이미지 */}
      <Image
        source={require("../../assets/images/map.png")}
        style={styles.mapImage}
        resizeMode="cover"
      />

      {/* 파란 경로 선 */}
      {showRoute && selectedMarker && (
        <View style={styles.routeContainer}>
          <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
            <Path
              d={getRoutePath()}
              stroke="#4285F4"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
      )}

      {/* 알림 마커들 */}
      {alertMarkers.map((marker) => (
        <TouchableOpacity
          key={marker.id}
          style={[
            styles.alertMarker,
            {
              left: marker.x,
              top: marker.y,
              backgroundColor: getMarkerColor(marker.type),
            },
            selectedMarker === marker.id && styles.selectedMarker,
          ]}
          onPress={() => handleMarkerPress(marker.id)}
        >
          <Text style={styles.alertMarkerText}>!</Text>
        </TouchableOpacity>
      ))}

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
  // 새로 추가된 알림 마커 스타일
  alertMarker: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    zIndex: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedMarker: {
    transform: [{ scale: 1.2 }],
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  alertMarkerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  // 경로 선을 위한 컨테이너
  routeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 4,
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
