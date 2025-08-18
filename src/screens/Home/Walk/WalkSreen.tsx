import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Map } from "../../../components/Walk/Map";
import { WalkStatusBar } from "../../../components/Walk/WalkStatusBar";
import { WalkInfoCard } from "../../../components/Walk/WalkInfoCard";
import { ControlBtn } from "../../../components/Walk/ControlBtn";

const WalkScreen: React.FC = () => {
  const [walkData] = useState({
    date: "2025.12.25",
    time: "16:00~16:32",
    duration: "31분 15초",
    distance: "4.42km",
    speed: "4m/s",
  });

  const [isPaused, setIsPaused] = useState(false);

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStartRecord = () => {
    console.log("산책 기록 시작");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Map />
      <WalkStatusBar petName="해피" isActive={true} />
      <WalkInfoCard walkData={walkData} />
      <ControlBtn
        isPaused={isPaused}
        onPauseResume={handlePauseResume}
        onStartRecord={handleStartRecord}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});

export default WalkScreen;
