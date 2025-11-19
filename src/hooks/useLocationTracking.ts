import { useState, useEffect, useRef } from "react";
import Geolocation from "@react-native-community/geolocation";
import { Platform, PermissionsAndroid } from "react-native";

export interface LocationPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export const useLocationTracking = (isTracking: boolean) => {
  const [locations, setLocations] = useState<LocationPoint[]>([]);
  const [currentLocation, setCurrentLocation] = useState<LocationPoint | null>(
    null,
  );
  const [distance, setDistance] = useState(0); // 총 거리 (km)
  const [speed, setSpeed] = useState(0); // 현재 속도 (m/s)
  const watchIdRef = useRef<number | null>(null);

  // 위치 권한 요청
  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "위치 권한 요청",
            message: "산책 경로를 추적하기 위해 위치 권한이 필요합니다.",
            buttonNeutral: "나중에",
            buttonNegative: "거부",
            buttonPositive: "허용",
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS는 Info.plist로 관리
  };

  // 두 지점 간 거리 계산 (Haversine 공식)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // km
  };

  // 위치 추적 시작
  useEffect(() => {
    if (!isTracking) {
      // 추적 중지
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      return;
    }

    const startTracking = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        console.log("위치 권한이 거부되었습니다.");
        return;
      }

      // 현재 위치 가져오기
      Geolocation.getCurrentPosition(
        (position) => {
          const newLocation: LocationPoint = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
          };
          setCurrentLocation(newLocation);
          setLocations([newLocation]);
        },
        (error) => {
          console.error("위치 가져오기 실패:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      );

      // 위치 추적 시작
      watchIdRef.current = Geolocation.watchPosition(
        (position) => {
          const newLocation: LocationPoint = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
          };

          setCurrentLocation(newLocation);

          setLocations((prevLocations) => {
            const updatedLocations = [...prevLocations, newLocation];

            // 거리 계산
            if (prevLocations.length > 0) {
              const lastLocation = prevLocations[prevLocations.length - 1];
              const distanceIncrement = calculateDistance(
                lastLocation.latitude,
                lastLocation.longitude,
                newLocation.latitude,
                newLocation.longitude,
              );

              setDistance((prevDistance) => prevDistance + distanceIncrement);

              // 속도 계산 (m/s)
              const timeDiff =
                (newLocation.timestamp - lastLocation.timestamp) / 1000; // 초
              if (timeDiff > 0) {
                const speedMps = (distanceIncrement * 1000) / timeDiff; // m/s
                setSpeed(speedMps);
              }
            }

            return updatedLocations;
          });
        },
        (error) => {
          console.error("위치 추적 오류:", error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 5, // 5미터마다 업데이트
          interval: 1000, // 1초마다 체크 (Android)
          fastestInterval: 500, // 최소 0.5초 간격 (Android)
        },
      );
    };

    startTracking();

    return () => {
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [isTracking]);

  // 추적 초기화
  const resetTracking = () => {
    setLocations([]);
    setCurrentLocation(null);
    setDistance(0);
    setSpeed(0);
  };

  return {
    locations,
    currentLocation,
    distance,
    speed,
    resetTracking,
  };
};
