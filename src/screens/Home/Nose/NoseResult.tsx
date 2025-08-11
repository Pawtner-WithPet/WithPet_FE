import React, { useState, useEffect } from "react";
import {
  View,Text,StyleSheet,Image,Alert,TouchableOpacity,FlatList,SafeAreaView,ScrollView,TextInput,
} from "react-native";
import { useRoute, useNavigation  } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../../types/NoseCamera";
import Header from "../../../components/Header";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import {
  fetchNoseResult,NoseResultResponse,saveNoseprintResult,
} from "../../../services/api/NoseResult";
import { Colors } from "../../../constants/colors";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { TabParamList } from "../../../navigation/TabNavigator";


const NoseResultScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "NoseResult">>();
  const searchId = route.params?.dogId ?? 1;
  const { type = "unknown", from = "list" } = route.params || {};
  const tabNavigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  const [matchedInfo, setMatchedInfo] = useState<NoseResultResponse | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  //팝업
  const [showPopup, setShowPopup] = useState(false);
  const [foundLocation, setFoundLocation] = useState("");

  useEffect(() => {
    if (!searchId) return;

    fetchNoseResult(searchId)
      .then(setMatchedInfo)
      .catch(() => {
        setError("비문 결과를 가져오는 중 오류가 발생했습니다.");
      });
  }, [searchId]);

  const titleText =
    type === "found" ? "실종된 내 반려동물과의" : "촬영한 발견동물과의";
  const listTitleText =
    type === "found"
      ? "등록된 실종동물 일치율 목록"
      : "등록된 발견동물 일치율 목록";

  const circleRadius = 70;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * circleRadius;
  const parsedMatch = matchedInfo?.result?.[0]?.matchRate ?? 0;
  const strokeDashoffset = (1 - parsedMatch / 100) * circumference;

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => tabNavigation.navigate("Nose", { screen: "NoseListScreen" })}>
            <Image source={require('../../../assets/Camera/back_b.png')} style={styles.titleIcon} />
          </TouchableOpacity>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.title}>
              {titleText}
              {"\n"}
              <Text style={styles.highlight}>비문 인식률</Text>
            </Text>
          </View>
        </View>

        <View style={styles.imageRow}>
          <View style={styles.myNoseCard}>
            <Image
              source={require('../../../assets/images/nose.png')}
              //source={{ uri: matchedInfo?.nosePrintImg }}
              style={styles.noseImage}
            />
            <Text style={styles.metaText}>
              {matchedInfo?.searchLocation}
              {"\n"}
              {"\n"}
              {matchedInfo?.searchDatetime?.slice(0, 10)}
              {"\n"}
              {matchedInfo?.searchDatetime?.slice(11, 16)}
            </Text>
          </View>
          <View style={styles.noseImageWrapper}>
            <Svg width={160} height={160}>
              <Defs>
                <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor="#a0c4ff" />
                  <Stop offset="100%" stopColor="#4361ee" />
                </LinearGradient>
              </Defs>
              <Circle
                cx={80}
                cy={80}
                r={circleRadius}
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={70}
                cy={70}
                r={circleRadius}
                stroke="url(#grad)"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin="80,70"
              />
            </Svg>
            <Image
              source={require('../../../assets/images/nose.png')}
              //source={{ uri: matchedInfo?.nosePrintImg }}
              style={styles.noseImageSmall}
            />
            <View style={styles.matchOverlay}>
              <Text style={styles.matchText}>{parsedMatch}%</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 일치율 목록 */}
        <Text style={styles.listTitle}>{listTitleText}</Text>

        <View style={styles.gridWrapper}>
          {(matchedInfo?.result || []).map((item) => {
            const percent = Math.round(item.matchRate);
            const radius = 64;
            const strokeDash = (1 - percent / 100) * 2 * Math.PI * radius;

            return (
              <View key={item.resultId} style={styles.gridItem}>
                <View style={styles.noseItemWrapper}>
                  <Svg width={140} height={140}>
                    <Defs>
                      <LinearGradient
                        id="grad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <Stop offset="0%" stopColor="#4361ee" />
                        <Stop offset="100%" stopColor="#a0c4ff" />
                      </LinearGradient>
                    </Defs>
                    <Circle
                      cx={70}
                      cy={70}
                      r={radius}
                      stroke="#e0e0e0"
                      strokeWidth={6}
                      fill="none"
                    />
                    <Circle
                      cx={70}
                      cy={70}
                      r={radius}
                      stroke="url(#grad)"
                      strokeWidth={6}
                      fill="none"
                      strokeDasharray={2 * Math.PI * radius}
                      strokeDashoffset={strokeDash}
                      strokeLinecap="round"
                      rotation="-90"
                      origin="70,70"
                    />
                  </Svg>

                  <Image
                    source={require('../../../assets/images/nose.png')}
                    //source={{ uri: item.nosePrintImg }}
                    style={styles.listImage}
                  />
                  <View style={styles.overlayCircle}>
                    <Text style={styles.overlayText}>{percent}%</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {showPopup && (
        <View style={styles.popupOverlay}>
          <View style={styles.popupBox}>
            <TouchableOpacity
              onPress={() => setShowPopup(false)}
              style={styles.popupClose}
            >
              <Text style={{ fontSize: 24 }}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.popupText}>
              비문 인식을 진행한 동물의 {"\n"}
              <Text style={{ color: "#5b6eff" }}>발견 장소</Text>를
              입력해주세요.
            </Text>

            <TextInput
              style={styles.popupInput}
              placeholder="예: 서울시 도봉구"
              multiline
              value={foundLocation}
              onChangeText={setFoundLocation}
            />

            <TouchableOpacity
              style={styles.popupButton}
              onPress={async () => {
                console.log("저장된 위치:", foundLocation);
                setShowPopup(false);

                const payload = {
                  searchId: 1,
                  ownerId: 1,
                  nosePrintId: 1,
                  matchRate: 93.4,
                  isMyMissingPet: true,
                };
                const success = await saveNoseprintResult(payload);

                if (success) {
                  Alert.alert("저장 완료!");
                  tabNavigation.navigate("Nose", { screen: "NoseListScreen" });
                } else {
                  Alert.alert("저장 실패", "다시 시도해주세요.");
                }
              }}
            >
              <Text style={styles.popupButtonText}>결과 저장하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {from === 'capture' && (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => setShowPopup(true)}
        >
          <Text style={styles.saveButtonText}>결과 저장하기</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  
  highlight: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: 20,
    color: "#5b6eff",
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  myNoseCard: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#eaf0ff",
    borderRadius: 20,
    width: 150,
  },
  noseImageWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 160,
  },
  noseImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  noseImageSmall: {
    width: 130,
    height: 130,
    borderRadius: 65,
    position: "absolute",
  },
  matchOverlay: {
    position: "absolute",
    top: -5,
    right: 15,
    backgroundColor: "#4f75ff",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  matchText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  metaText: {
    marginTop: 12,
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    lineHeight: 20,
    fontWeight:"bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 24,
    width: "100%",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "left",
    marginBottom: 12,
  },
  gridWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  gridItem: {
    width: "48%", // 2열
    marginBottom: 20,
    alignItems: "center",
  },

  noseItemWrapper: {
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  listImage: {
    width: 115,
    height: 115,
    borderRadius: 100,
    position: "absolute",
  },
  saveButton: {
    backgroundColor: "#3c4fff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    margin: 16,
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  overlayCircle: {
    position: "absolute",
    width: 115,
    height: 115,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },

  overlayText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },

  //팝업
  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  popupBox: {
    width: "85%",
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  popupClose: {
    position: "absolute",
    top: 10,
    right: 14,
  },
  popupText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  popupInput: {
    width: "100%",
    minHeight: 80,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    fontSize: 14,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  popupButton: {
    backgroundColor: "#1e1e2f",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  popupButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NoseResultScreen;
