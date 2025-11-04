import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Geolocation from "@react-native-community/geolocation";
import { Pet, WalkRecord } from "../../types/index";

const today = new Date();
const formattedDate = today.toLocaleDateString("ko-KR");

interface WalkRecordCardProps {
  walkRecord: WalkRecord;
  selectedPet: Pet;
  onPause: () => void;
  onStop: (duration: string, distance: string, speed: string) => void;
}

interface LocationPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export const WalkRecordCard: React.FC<WalkRecordCardProps> = ({
  walkRecord,
  selectedPet,
  onPause,
  onStop,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [totalDistance, setTotalDistance] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [hasPermission, setHasPermission] = useState(false);

  const watchIdRef = useRef<number | null>(null);
  const lastPositionRef = useRef<LocationPoint | null>(null);

  // 위치 권한 요청
  useEffect(() => {
    requestLocationPermission();
  }, []);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "위치 권한 요청",
          message: "산책 기록을 위해 위치 권한이 필요합니다.",
          buttonNeutral: "나중에",
          buttonNegative: "거부",
          buttonPositive: "허용",
        },
      );
      setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
      console.warn("Permission error:", err);
      setHasPermission(false);
    }
  };

  // 타이머 효과
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // 두 지점 간 거리 계산 (Haversine formula)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371e3; // 지구 반지름 (미터)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 미터 단위
  };

  // 위치 추적 시작
  const startTracking = () => {
    if (!hasPermission) {
      Alert.alert("권한 필요", "위치 권한이 필요합니다.");
      return;
    }

    watchIdRef.current = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, speed } = position.coords;
        const timestamp = position.timestamp;

        // 속도 업데이트 (m/s)
        if (speed !== null && speed >= 0) {
          setCurrentSpeed(speed);
        }

        // 이전 위치가 있으면 거리 계산
        if (lastPositionRef.current) {
          const distance = calculateDistance(
            lastPositionRef.current.latitude,
            lastPositionRef.current.longitude,
            latitude,
            longitude,
          );

          // 비정상적인 거리 값 필터링 (예: 100m 이상 점프)
          if (distance < 100) {
            setTotalDistance((prev) => prev + distance);
          }

          // 속도가 없는 경우 수동 계산
          if (speed === null || speed < 0) {
            const timeDiff =
              (timestamp - lastPositionRef.current.timestamp) / 1000; // 초
            if (timeDiff > 0) {
              const calculatedSpeed = distance / timeDiff; // m/s
              setCurrentSpeed(calculatedSpeed);
            }
          }
        }

        // 현재 위치 저장
        lastPositionRef.current = {
          latitude,
          longitude,
          timestamp,
        };
      },
      (error) => {
        console.warn("Location error:", error);
        if (error.code === 1) {
          Alert.alert("위치 오류", "위치 권한이 거부되었습니다.");
        } else if (error.code === 2) {
          Alert.alert(
            "위치 오류",
            "위치를 가져올 수 없습니다. GPS를 확인해주세요.",
          );
        }
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 5, // 5미터마다 업데이트
        interval: 3000, // 3초마다
        fastestInterval: 2000, // 최소 2초
      },
    );
  };

  // 위치 추적 종료
  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      Geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  // 시간을 분:초 형태로 포맷팅
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}분 ${remainingSeconds}초`;
  };

  // 거리를 포맷팅 (미터 -> 킬로미터)
  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${meters.toFixed(0)}m`;
    } else {
      return `${(meters / 1000).toFixed(2)}km`;
    }
  };

  // 속도를 포맷팅 (m/s -> km/h)
  const formatSpeed = (mps: number): string => {
    const kmh = mps * 3.6;
    return `${kmh.toFixed(1)}km/h`;
  };

  // 일시정지/재시작 핸들러
  const handlePause = () => {
    setIsRunning(!isRunning);
    onPause();
  };

  // 종료 핸들러
  const handleStop = () => {
    setIsRunning(false);
    stopTracking();
    const finalDuration = formatTime(seconds);
    const finalDistance = formatDistance(totalDistance);
    const finalSpeed = formatSpeed(currentSpeed);
    onStop(finalDuration, finalDistance, finalSpeed);
  };

  // 위치 추적 시작/중지
  useEffect(() => {
    if (isRunning && hasPermission) {
      startTracking();
    } else {
      stopTracking();
    }

    return () => {
      stopTracking();
    };
  }, [isRunning, hasPermission]);

  return (
    <>
      {/* 상단 헤더 그라데이션 배경 */}
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0.9)",
          "rgba(255, 255, 255, 0.7)",
          "rgba(255, 255, 255, 0)",
        ]}
        locations={[0, 0.5, 1]}
        style={styles.headerGradient}
      />

      {/* 메인 카드 */}
      <View style={styles.container}>
        <View style={styles.petTagsContainer}>
          <TouchableOpacity
            style={[
              styles.petTag,
              selectedPet?.name === "곰탱이" && styles.petTagActive,
            ]}
          >
            <Text
              style={[
                styles.petTagText,
                selectedPet?.name === "곰탱이" && styles.petTagTextActive,
              ]}
            >
              {selectedPet?.name || "곰탱이"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.dateTime}>{formattedDate}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Image
                source={require("../../assets/icons/time.png")}
                style={styles.statIconImage}
              />
              <Text style={styles.statLabel}>시간</Text>
            </View>
            <Text style={styles.statValue}>{formatTime(seconds)}</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Image
                source={require("../../assets/icons/map.png")}
                style={styles.statIconImage}
              />
              <Text style={styles.statLabel}>거리</Text>
            </View>
            <Text style={styles.statValue}>
              {formatDistance(totalDistance)}
            </Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Image
                source={require("../../assets/icons/speed.png")}
                style={styles.statIconImage}
              />
              <Text style={styles.statLabel}>속도</Text>
            </View>
            <Text style={styles.statValue}>{formatSpeed(currentSpeed)}</Text>
          </View>
        </View>
      </View>

      {/* 컨트롤 버튼들 */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
          <Image
            source={
              isRunning
                ? require("../../assets/icons/stop.png")
                : require("../../assets/icons/start.png")
            }
            style={styles.stopImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
          <Text style={styles.stopButtonText}>산책 기록 종료</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 그라데이션 배경 */}
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0)",
          "rgba(255, 255, 255, 0.7)",
          "rgba(255, 255, 255, 0.9)",
        ]}
        locations={[0, 0.5, 1]}
        style={styles.bottomGradient}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    zIndex: 1,
  },
  container: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 2,
  },
  petTagsContainer: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "flex-start",
    gap: 8,
  },
  petTag: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#E8E8E8",
  },
  petTagActive: {
    backgroundColor: "#4262FF",
  },
  petTagText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  petTagTextActive: {
    color: "white",
    fontWeight: "600",
  },
  dateTime: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 8,
    paddingBottom: 15,
    borderRadius: 12,
    borderColor: "#97969650",
    borderWidth: 1,
    marginHorizontal: 4,
    justifyContent: "center",
  },
  statIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statIconImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  statLabel: {
    fontSize: 16,
    color: "#686767",
  },
  statValue: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#4262FF",
    marginTop: 4,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    zIndex: 2,
  },
  pauseButton: {
    width: 45,
    height: 45,
    backgroundColor: "#ECEAEA",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  stopImage: {
    width: 14,
    height: 16,
  },
  stopButton: {
    flex: 1,
    backgroundColor: "#4262FF",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  stopButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    zIndex: 1,
  },
});
