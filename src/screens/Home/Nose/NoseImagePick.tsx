import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../../components/Header";
import NoseImage from "../../../components/NoseImagePick/NoseImage";
import RetakeBtn from "../../../components/NoseImagePick/RetakeBtn";
import ChoiceButtons from "../../../components/NoseImagePick/ChoiceBtn";

// Route params 타입 정의
type NoseImagePickRouteParams = {
  imageUri?: string;
};

type NoseImagePickRouteProp = RouteProp<
  { NoseImagePick: NoseImagePickRouteParams },
  "NoseImagePick"
>;

const NoseImagePick: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<NoseImagePickRouteProp>();
  const { imageUri } = route.params || {}; // 전달받은 이미지 URI

  const handleTryAgain = () => {
    console.log("다시 촬영하기 클릭");
    // 다시 촬영하기 버튼 클릭 시 카메라 화면으로 이동
    navigation.goBack();
  };

  const handleLostPet = () => {
    console.log("실종 동물 신고");
  };

  const handleFoundPet = () => {
    console.log("발견 동물 신고");
  };

  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* 전달받은 이미지가 있으면 실제 사진을, 없으면 기본 NoseImage 컴포넌트를 표시 */}
          {imageUri ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.capturedImage} />
            </View>
          ) : (
            <NoseImage />
          )}

          <RetakeBtn onTryAgain={handleTryAgain} />
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              촬영한 동물이 실종동물인가요?{"\n"}
              발견 동물인가요?
            </Text>
          </View>
          <ChoiceButtons
            onLostPet={handleLostPet}
            onFoundPet={handleFoundPet}
          />
        </View>
      </SafeAreaView>
    </>
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
    marginBottom: 32,
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
  capturedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
  retakeButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  questionContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 28,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  choiceButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  backButtonText: {
    color: "#666",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default NoseImagePick;
