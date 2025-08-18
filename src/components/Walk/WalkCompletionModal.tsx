import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

interface WalkCompletionModalProps {
  visible: boolean;
  duration: string;
  distance: string;
  speed: string;
  walkPath?: string; // 산책 경로 이미지 (옵셔널)
  onSNSShare: () => void;
  onSave: () => void;
  onClose: () => void;
}

export const WalkCompletionModal: React.FC<WalkCompletionModalProps> = ({
  visible,
  duration,
  distance,
  speed,
  walkPath,
  onSNSShare,
  onSave,
  onClose,
}) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR");
  const timeRange = `${today.getHours()}:${today.getMinutes().toString().padStart(2, "0")}~${today.getHours() + 1}:${today.getMinutes().toString().padStart(2, "0")}`;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* 닫기 버튼 */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <View style={styles.heartContainer}>
            <Image source={require("../../assets/icons/logo.png")} />
          </View>

          {/* 산책 경로 이미지 영역 */}
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              {/* SVG로 구불구불한 경로 그리기 */}
              <Svg
                width="100%"
                height="100%"
                viewBox="0 0 300 200"
                style={styles.svgPath}
              >
                <Defs>
                  <LinearGradient
                    id="pathGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <Stop offset="0%" stopColor="#00D4FF" stopOpacity="1" />
                    <Stop offset="50%" stopColor="#0099CC" stopOpacity="1" />
                    <Stop offset="100%" stopColor="#4262FF" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <Path
                  d="M 50 50 Q 100 30, 150 60 T 250 80 Q 270 90, 280 110 T 250 140 Q 200 160, 150 140 T 80 120 Q 60 110, 50 90"
                  stroke="url(#pathGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>

              {/* 현재 위치 표시 - 경로 끝점에 위치 */}
              <View style={styles.currentLocationDot}>
                <Image
                  source={require("../../assets/icons/puppy.png")}
                  style={styles.puppyImage}
                />
              </View>
            </View>
          </View>

          {/* 통계 정보 */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>시간</Text>
              <Text style={styles.statValue}>{duration}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>거리</Text>
              <Text style={styles.statValue}>{distance}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>속도</Text>
              <Text style={styles.statValue}>{speed}</Text>
            </View>
          </View>

          {/* 버튼들 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.snsButton} onPress={onSNSShare}>
              <Image
                source={require("../../assets/icons/share.png")}
                style={styles.shareIcon}
              />
              <Text style={styles.buttonText}>SNS 공유하기</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Image
                source={require("../../assets/icons/save.png")}
                style={styles.saveIcon}
              />
              <Text style={styles.buttonText}>저장하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#2A2A2A",
    borderRadius: 20,
    padding: 10,
    width: "85%",
    alignItems: "center",
    position: "relative",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  heartContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  heartIcon: {
    fontSize: 30,
  },
  mapContainer: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 0,
    position: "relative",
    overflow: "hidden",
  },
  mapPlaceholder: {
    flex: 1,
    position: "relative",
  },
  svgPath: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  currentLocationDot: {
    position: "absolute",
    top: 80, // 경로의 끝점 좌표에 맞춤
    left: 45, // 경로의 끝점 좌표에 맞춤
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#0E5489",
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  puppyImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    color: "#AAAAAA",
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#444444",
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 20,
  },
  snsButton: {
    flex: 1,
    backgroundColor: "#4262FF",
    borderRadius: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#4262FF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  shareIcon: {
    width: 12,
    height: 15,
  },
  saveIcon: {
    width: 15,
    height: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
