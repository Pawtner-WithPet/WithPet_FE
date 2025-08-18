import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Geolocation from "react-native-geolocation-service";
import { Pet, WalkRecord } from "../../types/index";

const today = new Date();
const formattedDate = today.toLocaleDateString("ko-KR");

interface WalkRecordCardProps {
  walkRecord: WalkRecord;
  selectedPet: Pet;
  onPause: () => void;
  onStop: (duration: string, distance: string, speed: string) => void;
}

export const WalkRecordCard: React.FC<WalkRecordCardProps> = ({
  walkRecord,
  selectedPet,
  onPause,
  onStop,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [totalDistance, setTotalDistance] = useState(0); // 총 거리
  const [currentSpeed, setCurrentSpeed] = useState(0); // 현재 속도
  const [watchId, setWatchId] = useState<number | null>(null); // 위치 추적 ID

  // 타이머 효과
  useEffect(() => {
    let interval: number | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, seconds]);

  // 위치 추적 시작
  const startTracking = () => {
    const id = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const timestamp = new Date().getTime(); // timestamp 대신 현재 시간을 사용
        // 나머지 로직
      },
      (error) => {
        console.warn(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 1000,
      },
    );
    setWatchId(id);
  };

  // 위치 추적 종료
  const stopTracking = () => {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);
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

  // 위치 추적 시작
  useEffect(() => {
    if (isRunning) {
      startTracking();
    } else {
      stopTracking();
    }
  }, [isRunning]);

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
              selectedPet?.name === "해피" && styles.petTagActive,
            ]}
          >
            <Text
              style={[
                styles.petTagText,
                selectedPet?.name === "해피" && styles.petTagTextActive,
              ]}
            >
              해피
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.petTag,
              selectedPet?.name === "조이" && styles.petTagActive,
            ]}
          >
            <Text
              style={[
                styles.petTagText,
                selectedPet?.name === "조이" && styles.petTagTextActive,
              ]}
            >
              조이
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
