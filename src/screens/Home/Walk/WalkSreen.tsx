import React, { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Map } from "../../../components/Walk/Map";
import { StartBtn } from "../../../components/Walk/StartBtn";
import { WalkRecordCard } from "../../../components/Walk/WalkRecordCard";
import { PetSelectionModal } from "../../../components/Walk/PetSelect";
import { WalkEndConfirmationModal } from "../../../components/Walk/WalkEndConfirmationModal";
import { WalkCompletionModal } from "../../../components/Walk/WalkCompletionModal";
import { WalkListScreen } from "./WalkList";
import { Pet, WalkRecord } from "../../../types/index";

const WalkScreen: React.FC = () => {
  const [isWalkingStarted, setIsWalkingStarted] = useState(false);
  const [showPetModal, setShowPetModal] = useState(false);
  const [showWalkList, setShowWalkList] = useState(false); // WalkList 표시 상태
  const [showEndConfirmation, setShowEndConfirmation] = useState(false); // 종료 확인 모달
  const [showCompletionModal, setShowCompletionModal] = useState(false); // 완료 모달
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [finalWalkData, setFinalWalkData] = useState({
    duration: "",
    distance: "",
    speed: "",
  });
  const [pets, setPets] = useState<Pet[]>([
    { id: 1, name: "해피", isActive: false },
    { id: 2, name: "조이", isActive: false },
  ]);

  const [walkRecord] = useState<WalkRecord>({
    date: "2025.12.25",
    time: "16:00~16:32",
    duration: "31분 15초",
    distance: "4.42km",
    speed: "4m/s",
  });

  const handleStartWalk = () => {
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
  };

  const handlePause = () => {
    console.log("산책 일시정지");
  };

  const handleStop = (
    finalDuration?: string,
    finalDistance?: string,
    finalSpeed?: string,
  ) => {
    if (finalDuration && finalDistance && finalSpeed) {
      // 최종 데이터 저장
      setFinalWalkData({
        duration: finalDuration,
        distance: finalDistance,
        speed: finalSpeed,
      });
    }

    // 종료 확인 모달 표시
    setShowEndConfirmation(true);
  };

  // 산책 종료 확인
  const handleConfirmEnd = () => {
    setShowEndConfirmation(false);
    setIsWalkingStarted(false);
    setSelectedPet(null);
    const resetPets = pets.map((pet) => ({ ...pet, isActive: false }));
    setPets(resetPets);

    // 완료 모달 표시
    setShowCompletionModal(true);
  };

  // 산책 종료 취소
  const handleCancelEnd = () => {
    setShowEndConfirmation(false);
  };

  // SNS 공유 핸들러
  const handleSNSShare = () => {
    console.log("SNS 공유하기");
    // SNS 공유 로직 구현
    setShowCompletionModal(false);
  };

  // 저장 핸들러
  const handleSaveWalk = () => {
    console.log("산책 기록 저장");
    console.log(`- 시간: ${finalWalkData.duration}`);
    console.log(`- 거리: ${finalWalkData.distance}`);
    console.log(`- 속도: ${finalWalkData.speed}`);
    // 저장 로직 구현
    setShowCompletionModal(false);
  };

  // 메뉴 버튼 클릭 핸들러
  const handleMenuPress = () => {
    setShowWalkList(true);
  };

  // WalkList에서 뒤로가기 핸들러
  const handleBackFromWalkList = () => {
    setShowWalkList(false);
  };

  // WalkList 화면을 보여주는 경우
  if (showWalkList) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        {/* 여기에 뒤로가기 버튼을 추가할 수 있습니다 */}
        <WalkListScreen />
        {/* 임시로 뒤로가기를 위한 처리 - 실제로는 헤더나 네비게이션 바에 구현 */}
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
      />
      {!isWalkingStarted && <StartBtn onPress={handleStartWalk} />}
      {/* Only render WalkRecordCard when selectedPet is not null */}
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
        onSNSShare={handleSNSShare}
        onSave={handleSaveWalk}
        onClose={() => setShowCompletionModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});

export default WalkScreen;
