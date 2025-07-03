import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../../components/Header";

const { width, height } = Dimensions.get("window");

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
  const { imageUri } = route.params || {};

  const handleTryAgain = () => {
    console.log("다시 촬영하기 클릭");
    navigation.goBack();
  };

  const handleLostPet = () => {
    console.log("실종 동물 신고");
    // 실종 동물 신고 화면으로 이동
    // navigation.navigate("LostPetReport", { imageUri });
  };

  const handleFoundPet = () => {
    console.log("발견 동물 신고");
    // 발견 동물 신고 화면으로 이동
    // navigation.navigate("FoundPetReport", { imageUri });
  };

  // 이미지가 없으면 카메라 화면으로 돌아가기
  if (!imageUri) {
    React.useEffect(() => {
      navigation.goBack();
    }, []);
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 메인 컨텐츠 오버레이 */}
      <View style={styles.overlay}>
        <View style={styles.imageCard}>
          <Image source={{ uri: imageUri }} style={styles.capturedImage} />

          {/* 다시 촬영하기 버튼 */}
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={handleTryAgain}
          >
            <Text style={styles.retakeButtonText}>다시 촬영하기</Text>
          </TouchableOpacity>

          {/* 질문 텍스트 */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              촬영한 동물이 실종동물인가요?
            </Text>
            <Text style={styles.questionText}>발견 동물인가요?</Text>
          </View>

          {/* 선택 버튼들 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.choiceButton, styles.lostButton]}
              onPress={handleLostPet}
            >
              <Text style={styles.choiceButtonText}>실종 동물</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.choiceButton, styles.foundButton]}
              onPress={handleFoundPet}
            >
              <Text style={styles.choiceButtonText}>발견 동물</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // 반투명 배경
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imageCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    maxWidth: width * 0.9,
    width: "100%",
  },
  capturedImage: {
    width: width * 0.8,
    height: width * 1,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 20,
  },
  retakeButton: {
    backgroundColor: "#4262FF",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 24,
    minWidth: 120,
    alignItems: "center",
  },
  retakeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  questionContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  questionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 27,
    width: "100%",
    justifyContent: "center",
  },
  choiceButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    maxWidth: 140,
  },
  lostButton: {
    backgroundColor: "#161F40",
  },
  foundButton: {
    backgroundColor: "#161F40",
  },
  choiceButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default NoseImagePick;
