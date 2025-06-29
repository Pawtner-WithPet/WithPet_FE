import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

// Props 타입 정의
interface RetakeBtnProps {
  onTryAgain: () => void;
}

interface RegisterBtnProps {
  onRegister: () => void;
}

// RetakeBtn 컴포넌트
const RetakeBtn: React.FC<RetakeBtnProps> = ({ onTryAgain }) => (
  <TouchableOpacity style={styles.retakeButton} onPress={onTryAgain}>
    <Text style={styles.buttonText}>다시 촬영하기</Text>
  </TouchableOpacity>
);

// RegisterBtn 컴포넌트 (비문 등록하기 버튼)
const RegisterBtn: React.FC<RegisterBtnProps> = ({ onRegister }) => (
  <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
    <Text style={styles.buttonText}>비문 등록하기</Text>
  </TouchableOpacity>
);

// NoseImage 컴포넌트
const NoseImage = () => (
  <View style={styles.imageContainer}>
    <View style={styles.dogFaceContainer}>
      <View style={styles.dogFaceBackground}>
        {/* 강아지 코 */}
        <View style={styles.noseContainer}>
          <View style={styles.nose}>
            {/* 코 중앙선 */}
            <View style={styles.noseLine} />
            {/* 왼쪽 콧구멍 */}
            <View style={[styles.nostril, styles.leftNostril]} />
            {/* 오른쪽 콧구멍 */}
            <View style={[styles.nostril, styles.rightNostril]} />
          </View>
          {/* 입 */}
          <View style={styles.mouth} />
        </View>
      </View>
    </View>
  </View>
);

// 메인 화면 컴포넌트
const NoseImageR = () => {
  const handleTryAgain = () => {
    console.log("다시 촬영하기 클릭");
    // 카메라 재촬영 로직
  };

  const handleRegister = () => {
    console.log("비문 등록하기 클릭");
    // 비문 등록 로직
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 강아지 코 이미지 */}
        <NoseImage />

        {/* 버튼들 */}
        <View style={styles.buttonContainer}>
          <RetakeBtn onTryAgain={handleTryAgain} />
          <RegisterBtn onRegister={handleRegister} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  imageContainer: {
    marginBottom: 48,
  },
  dogFaceContainer: {
    width: 280,
    height: 320,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  dogFaceBackground: {
    flex: 1,
    backgroundColor: "#D2691E", // 강아지 털색
    position: "relative",
    alignItems: "center",
  },
  noseContainer: {
    position: "absolute",
    bottom: 90,
    alignItems: "center",
  },
  nose: {
    width: 80,
    height: 64,
    backgroundColor: "#000",
    borderRadius: 40,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  nostril: {
    position: "absolute",
    width: 20,
    height: 32,
    backgroundColor: "#333",
    borderRadius: 10,
    top: 12,
  },
  leftNostril: {
    left: 12,
    transform: [{ rotate: "12deg" }],
  },
  rightNostril: {
    right: 12,
    transform: [{ rotate: "-12deg" }],
  },
  noseLine: {
    position: "absolute",
    top: 0,
    left: "50%",
    marginLeft: -1,
    width: 2,
    height: 16,
    backgroundColor: "#555",
  },
  mouth: {
    position: "absolute",
    bottom: 64,
    width: 32,
    height: 16,
    backgroundColor: "#FFB6C1",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  retakeButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flex: 1,
    marginRight: 8,
  },
  registerButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default NoseImageR;
