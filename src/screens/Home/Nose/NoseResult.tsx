import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, Image, Alert,
  TouchableOpacity, SafeAreaView, ScrollView, TextInput,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../../../types/NoseCamera";
import Header from "../../../components/Header";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { fetchNoseResult, NoseResultResponse, saveNoseprintResult } from "../../../services/api/NoseResult";
import { Colors } from "../../../constants/colors";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { TabParamList } from "../../../navigation/TabNavigator";

// 임시 썸네일 8개
const NOSE_THUMBS: any[] = [
  require("../../../assets/images/nose2.png"),
  require("../../../assets/images/nose3.png"),
  require("../../../assets/images/nose4.png"),
  require("../../../assets/images/nose5.png"),
  require("../../../assets/images/nose6.png"),
  require("../../../assets/images/nose7.png"),
  require("../../../assets/images/nose8.png"),
  require("../../../assets/images/nose9.png"),
];

const NoseResultScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "NoseResult">>();
  const searchId = route.params?.dogId ?? 1;
  const { type = "unknown", from = "list" } = route.params || {};
  const tabNavigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  const [matchedInfo, setMatchedInfo] = useState<NoseResultResponse | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [foundLocation, setFoundLocation] = useState("");

  useEffect(() => {
    if (!searchId) return;
    fetchNoseResult(searchId)
      .then(setMatchedInfo)
      .catch(() => {});
  }, [searchId]);

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
            <Image source={require("../../../assets/Camera/back_b.png")} style={styles.titleIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>
            {type === "found" ? "실종된 내 반려동물과의" : "촬영한 발견동물과의"}{"\n"}
            <Text style={styles.highlight}>비문 인식률</Text>
          </Text>
        </View>

        <View style={styles.imageRow}>
          <View style={styles.myNoseCard}>
            <Image source={require("../../../assets/images/nose.png")} style={styles.noseImage} />
            <Text style={styles.metaText}>
              {matchedInfo?.searchLocation}{"\n\n"}
              {matchedInfo?.searchDatetime?.slice(0, 10)}{"\n"}
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
              <Circle cx={80} cy={80} r={circleRadius} strokeWidth={strokeWidth} fill="none" />
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
            <Image source={require("../../../assets/images/nose2.png")} style={styles.noseImageSmall} />
            <View style={styles.matchOverlay}>
              <Text style={styles.matchText}>{parsedMatch}%</Text>
            </View>
          </View>
        </View>

        <Text style={styles.listTitle}>
          {type === "found" ? "등록된 실종동물 일치율 목록" : "등록된 발견동물 일치율 목록"}
        </Text>

        <View style={styles.gridWrapper}>
          {(matchedInfo?.result || []).map((item, index) => {
            const percent = Math.round(item.matchRate);
            const radius = 64;
            const strokeDash = (1 - percent / 100) * 2 * Math.PI * radius;
            const imgSource = NOSE_THUMBS[index % NOSE_THUMBS.length];

            return (
              <View key={item.resultId ?? index} style={styles.gridItem}>
                <View style={styles.noseItemWrapper}>
                  <Svg width={140} height={140}>
                    <Defs>
                      <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="0%" stopColor="#4361ee" />
                        <Stop offset="100%" stopColor="#a0c4ff" />
                      </LinearGradient>
                    </Defs>
                    <Circle cx={70} cy={70} r={radius} stroke="#e0e0e0" strokeWidth={6} fill="none" />
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
                  <Image source={imgSource} style={styles.listImage} />
                  <View style={styles.overlayCircle}>
                    <Text style={styles.overlayText}>{percent}%</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { padding: 16, paddingBottom: 100 },
  title: { fontSize: 18, fontWeight: "600" },
  titleRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  titleIcon: { width: 24, height: 24, resizeMode: "contain" },
  highlight: { fontSize: 18, fontWeight: "600", color: "#5b6eff" },
  imageRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  myNoseCard: { alignItems: "center", padding: 16, backgroundColor: "#eaf0ff", borderRadius: 20, width: 150 },
  noseImageWrapper: { position: "relative", alignItems: "center", justifyContent: "center", width: 160, height: 160 },
  noseImage: { width: 100, height: 100, borderRadius: 50 },
  noseImageSmall: { width: 130, height: 130, borderRadius: 65, position: "absolute" },
  matchOverlay: { position: "absolute", top: -5, right: 15, backgroundColor: "#4f75ff", width: 50, height: 50, borderRadius: 25, alignItems: "center", justifyContent: "center" },
  matchText: { color: "white", fontSize: 16, fontWeight: "bold" },
  metaText: { marginTop: 12, fontSize: 14, textAlign: "center", color: "#333", lineHeight: 20, fontWeight: "bold" },
  listTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  gridWrapper: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: 10 },
  gridItem: { width: "48%", marginBottom: 20, alignItems: "center" },
  noseItemWrapper: { width: 180, height: 180, justifyContent: "center", alignItems: "center", position: "relative" },
  listImage: { width: 115, height: 115, borderRadius: 100, position: "absolute" },
  overlayCircle: { position: "absolute", width: 115, height: 115, borderRadius: 100, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" },
  overlayText: { color: "#fff", fontSize: 25, fontWeight: "bold" },
});

export default NoseResultScreen;
