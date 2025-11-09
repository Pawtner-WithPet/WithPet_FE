import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  View,
} from "react-native";
import { Map } from "../../../components/Walk/Map";
import { StartBtn } from "../../../components/Walk/StartBtn";
import { WalkRecordCard } from "../../../components/Walk/WalkRecordCard";
import { PetSelectionModal } from "../../../components/Walk/PetSelect";
import { WalkEndConfirmationModal } from "../../../components/Walk/WalkEndConfirmationModal";
import { WalkCompletionModal } from "../../../components/Walk/WalkCompletionModal";
import { WalkListScreen } from "./WalkList";
import { Pet, WalkRecord } from "../../../types/index";
import { fetchDogs, Dog } from "../../../services/api/dogs";
import { useLocationTracking } from "../../../hooks/useLocationTracking";

const WalkScreen: React.FC = () => {
  const [isWalkingStarted, setIsWalkingStarted] = useState(false);
  const [showPetModal, setShowPetModal] = useState(false);
  const [showWalkList, setShowWalkList] = useState(false);
  const [showEndConfirmation, setShowEndConfirmation] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [finalWalkData, setFinalWalkData] = useState({
    duration: "",
    distance: "",
    speed: "",
    locations: [] as Array<{ latitude: number; longitude: number }>,
  });
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // 위치 추적 Hook 사용
  const { locations, currentLocation, distance, speed, resetTracking } =
    useLocationTracking(isWalkingStarted);

  const [walkRecord, setWalkRecord] = useState<WalkRecord>({
    date: "",
    time: "",
    duration: "00:00",
    distance: "0.00km",
    speed: "0m/s",
  });

  // 타이머 업데이트
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isWalkingStarted) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsed);

        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const formattedDuration = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        setWalkRecord((prev) => ({
          ...prev,
          duration: formattedDuration,
          distance: `${distance.toFixed(2)}km`,
          speed: `${speed.toFixed(1)}m/s`,
        }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWalkingStarted, startTime, distance, speed]);

  // 반려견 목록 불러오기
  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      setIsLoading(true);
      const userId = 1; // TODO: 실제 userId 가져오기

      const dogs = await fetchDogs(userId);

      const convertedPets: Pet[] = dogs.map((dog) => ({
        id: dog.id,
        name: dog.dogNm,
        isActive: false,
      }));

      setPets(convertedPets);

      if (convertedPets.length === 0) {
        console.log("등록된 반려견이 없습니다.");
      }
    } catch (error) {
      console.error("반려견 목록 불러오기 실패:", error);
      setPets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartWalk = () => {
    if (pets.length === 0) {
      console.log("등록된 반려견이 없습니다. 반려견을 먼저 등록해주세요.");
      return;
    }
    setShowPetModal(true);
  };

  const handleSelectPet = (petId: number) => {
    const updatedPets = pets.map((pet) => ({
      ...pet,
      isActive: pet.id === petId,
    }));
    setPets(updatedPets);
    setSelectedPet(updatedPets.find((pet) => pet.id === petId) || null);
    setShowPetModal(false);
    setIsWalkingStarted(true);
    setStartTime(Date.now());

    // 산책 시작 시 날짜/시간 설정
    const now = new Date();
    setWalkRecord((prev) => ({
      ...prev,
      date: now.toLocaleDateString("ko-KR"),
      time: `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`,
    }));
  };

  const handlePause = () => {
    console.log("산책 일시정지");
    // TODO: 일시정지 기능 구현
  };

  const handleStop = () => {
    // 최종 데이터 저장
    const finalMinutes = Math.floor(elapsedTime / 60);
    const finalSeconds = elapsedTime % 60;

    setFinalWalkData({
      duration: `${finalMinutes}분 ${finalSeconds}초`,
      distance: `${distance.toFixed(2)}km`,
      speed: `${speed.toFixed(1)}m/s`,
      locations: locations.map((loc) => ({
        latitude: loc.latitude,
        longitude: loc.longitude,
      })),
    });

    setShowEndConfirmation(true);
  };

  const handleConfirmEnd = () => {
    setShowEndConfirmation(false);
    setIsWalkingStarted(false);
    setSelectedPet(null);
    const resetPets = pets.map((pet) => ({ ...pet, isActive: false }));
    setPets(resetPets);

    setShowCompletionModal(true);
  };

  const handleCancelEnd = () => {
    setShowEndConfirmation(false);
  };

  const handleSNSShare = () => {
    console.log("SNS 공유하기");
    setShowCompletionModal(false);
  };

  const handleSaveWalk = () => {
    console.log("산책 기록 저장");
    console.log(`- 시간: ${finalWalkData.duration}`);
    console.log(`- 거리: ${finalWalkData.distance}`);
    console.log(`- 속도: ${finalWalkData.speed}`);
    console.log(`- 경로 포인트 수: ${finalWalkData.locations.length}`);
    // TODO: 서버에 저장 API 호출
    setShowCompletionModal(false);

    // 추적 데이터 초기화
    resetTracking();
    setElapsedTime(0);
  };

  const handleMenuPress = () => {
    setShowWalkList(true);
  };

  const handleBackFromWalkList = () => {
    setShowWalkList(false);
  };

  // 로딩 화면
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4262FF" />
        </View>
      </SafeAreaView>
    );
  }

  // WalkList 화면
  if (showWalkList) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <WalkListScreen onBack={handleBackFromWalkList} />
      </SafeAreaView>
    );
  }

  // 기본 WalkScreen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Map
        onMenuPress={handleMenuPress}
        isWalkRecordVisible={isWalkingStarted}
        walkPath={locations}
        currentLocation={currentLocation}
      />
      {!isWalkingStarted && <StartBtn onPress={handleStartWalk} />}
      {isWalkingStarted && selectedPet && (
        <WalkRecordCard
          walkRecord={walkRecord}
          selectedPet={selectedPet}
          onPause={handlePause}
          onStop={handleStop}
        />
      )}
      <PetSelectionModal
        visible={showPetModal}
        pets={pets}
        onSelectPet={handleSelectPet}
        onClose={() => setShowPetModal(false)}
      />

      <WalkEndConfirmationModal
        visible={showEndConfirmation}
        onConfirm={handleConfirmEnd}
        onCancel={handleCancelEnd}
      />

      <WalkCompletionModal
        visible={showCompletionModal}
        duration={finalWalkData.duration}
        distance={finalWalkData.distance}
        speed={finalWalkData.speed}
        walkPath={finalWalkData.locations}
        onSNSShare={handleSNSShare}
        onSave={handleSaveWalk}
        onClose={() => setShowCompletionModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WalkScreen;
