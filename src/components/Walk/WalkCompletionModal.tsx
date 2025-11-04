import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Alert,
} from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";

interface WalkCompletionModalProps {
  visible: boolean;
  duration: string;
  distance: string;
  speed: string;
  walkPath?: string;
  onSNSShare: () => void;
  onSave: () => void;
  onClose: () => void;
}

interface SNSShareModalProps {
  visible: boolean;
  onClose: () => void;
  onSharePlatform: (platform: string) => void;
}

// SNS 공유 선택 모달
const SNSShareModal: React.FC<SNSShareModalProps> = ({
  visible,
  onClose,
  onSharePlatform,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.shareOverlay} onPress={onClose}>
        <View style={styles.shareModalContainer}>
          <Text style={styles.shareTitle}>공유하기</Text>

          <View style={styles.shareButtonsContainer}>
            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={() => onSharePlatform("kakao")}
            >
              <View
                style={[
                  styles.shareIconContainer,
                  { backgroundColor: "#FEE500" },
                ]}
              >
                <Text style={styles.shareIconText}>카</Text>
              </View>
              <Text style={styles.shareOptionText}>카카오톡</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={() => onSharePlatform("twitter")}
            >
              <View
                style={[
                  styles.shareIconContainer,
                  { backgroundColor: "#1DA1F2" },
                ]}
              >
                <Text style={styles.shareIconText}>X</Text>
              </View>
              <Text style={styles.shareOptionText}>트위터(X)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={() => onSharePlatform("instagram")}
            >
              <View
                style={[
                  styles.shareIconContainer,
                  { backgroundColor: "#E4405F" },
                ]}
              >
                <Text style={styles.shareIconText}>📷</Text>
              </View>
              <Text style={styles.shareOptionText}>인스타그램</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

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
  const viewShotRef = useRef<ViewShot>(null);
  const [showShareModal, setShowShareModal] = React.useState(false);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR");
  const timeRange = `${today.getHours()}:${today.getMinutes().toString().padStart(2, "0")}~${today.getHours() + 1}:${today.getMinutes().toString().padStart(2, "0")}`;

  const handleSNSShare = () => {
    setShowShareModal(true);
  };

  const captureAndShare = async (platform: string) => {
    try {
      if (viewShotRef.current?.capture) {
        const uri = await viewShotRef.current.capture();

        const shareOptions = {
          title: "산책 완료!",
          message: `${duration} 동안 ${distance} 산책을 완료했어요! 🐕‍🦺`,
          url: uri,
          type: "image/png",
        };

        switch (platform) {
          case "twitter":
            // 트위터 공유
            await Share.shareSingle({
              ...shareOptions,
              social: Share.Social.TWITTER as any,
            });
            break;
          case "instagram":
            // 인스타그램 공유
            await Share.shareSingle({
              ...shareOptions,
              social: Share.Social.INSTAGRAM as any,
            });
            break;
          default:
            // 일반 공유 (모든 앱)
            await Share.open(shareOptions);
            break;
        }

        setShowShareModal(false);
      }
    } catch (error) {
      console.error("Share error:", error);
      // 특정 앱 공유 실패시 일반 공유로 대체
      try {
        if (viewShotRef.current?.capture) {
          const uri = await viewShotRef.current.capture();
          await Share.open({
            title: "산책 완료!",
            message: `${duration} 동안 ${distance} 산책을 완료했어요! 🐕‍🦺`,
            url: uri,
            type: "image/png",
          });
        }
      } catch (fallbackError) {
        Alert.alert("공유 실패", "공유 중 오류가 발생했습니다.");
      }
      setShowShareModal(false);
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <ViewShot
            ref={viewShotRef}
            options={{ format: "png", quality: 0.9 }}
            style={styles.captureContainer}
          >
            <View style={styles.modalContainer}>
              {/* 닫기 버튼 */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              <View style={styles.heartContainer}>
                <Image source={require("../../assets/icons/logo.png")} />
              </View>

              {/* 산책 경로 이미지 영역 */}
              <View style={styles.mapContainer}>
                <View style={styles.mapPlaceholder}>
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
                        <Stop
                          offset="50%"
                          stopColor="#0099CC"
                          stopOpacity="1"
                        />
                        <Stop
                          offset="100%"
                          stopColor="#4262FF"
                          stopOpacity="1"
                        />
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
                <TouchableOpacity
                  style={styles.snsButton}
                  onPress={handleSNSShare}
                >
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
          </ViewShot>
        </View>
      </Modal>

      {/* SNS 공유 선택 모달 */}
      <SNSShareModal
        visible={showShareModal}
        onClose={() => setShowShareModal(false)}
        onSharePlatform={captureAndShare}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#00000080",
    borderRadius: 20,
    padding: 10,
    width: 320, // 고정 너비로 캡처 일관성 보장
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
    color: "#FFFFFF",
    fontSize: 25,
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
    top: 80,
    left: 45,
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
  // SNS 공유 모달 스타일
  shareOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  shareModalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  shareTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  shareButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  shareOptionButton: {
    alignItems: "center",
    flex: 1,
  },
  shareIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  shareIconText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  shareOptionText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
});
