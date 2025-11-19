import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import Svg, {
  Polyline,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import RNFS from "react-native-fs";

interface WalkCompletionModalProps {
  visible: boolean;
  duration: string;
  distance: string;
  speed: string;
  walkPath?: Array<{ latitude: number; longitude: number }>;
  onSNSShare: () => void;
  onSave: () => void;
  onClose: () => void;
}

export const WalkCompletionModal: React.FC<WalkCompletionModalProps> = ({
  visible,
  duration,
  distance,
  speed,
  walkPath = [],
  onSNSShare,
  onSave,
  onClose,
}) => {
  const viewShotRef = useRef<ViewShot>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // 위도/경도를 SVG 좌표로 변환
  const convertToSVGCoordinates = () => {
    if (walkPath.length === 0) {
      return { points: "", startPoint: null, endPoint: null };
    }

    // 경로의 경계 계산
    const latitudes = walkPath.map((p) => p.latitude);
    const longitudes = walkPath.map((p) => p.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    // SVG 뷰박스 크기
    const svgWidth = 300;
    const svgHeight = 200;
    const padding = 20;

    // 위도/경도를 SVG 좌표로 변환
    const latRange = maxLat - minLat || 0.001; // 0으로 나누기 방지
    const lngRange = maxLng - minLng || 0.001;

    const points = walkPath
      .map((point) => {
        const x =
          padding +
          ((point.longitude - minLng) / lngRange) * (svgWidth - 2 * padding);
        const y =
          svgHeight -
          (padding +
            ((point.latitude - minLat) / latRange) * (svgHeight - 2 * padding));
        return `${x},${y}`;
      })
      .join(" ");

    // 시작점과 끝점 좌표
    const firstPoint = walkPath[0];
    const lastPoint = walkPath[walkPath.length - 1];

    const startPoint = {
      x:
        padding +
        ((firstPoint.longitude - minLng) / lngRange) * (svgWidth - 2 * padding),
      y:
        svgHeight -
        (padding +
          ((firstPoint.latitude - minLat) / latRange) *
            (svgHeight - 2 * padding)),
    };

    const endPoint = {
      x:
        padding +
        ((lastPoint.longitude - minLng) / lngRange) * (svgWidth - 2 * padding),
      y:
        svgHeight -
        (padding +
          ((lastPoint.latitude - minLat) / latRange) *
            (svgHeight - 2 * padding)),
    };

    return { points, startPoint, endPoint };
  };

  const { points, startPoint, endPoint } = convertToSVGCoordinates();

  const captureImage = async () => {
    if (viewShotRef.current?.capture) {
      return await viewShotRef.current.capture();
    }
    return null;
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "저장소 권한 요청",
            message: "갤러리에 이미지를 저장하기 위해 권한이 필요합니다.",
            buttonNeutral: "나중에",
            buttonNegative: "거부",
            buttonPositive: "허용",
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleSaveToGallery = async () => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert(
          "권한 필요",
          "갤러리 저장을 위해 저장소 권한이 필요합니다.",
        );
        return;
      }

      const uri = await captureImage();
      if (!uri) {
        Alert.alert("오류", "이미지를 생성할 수 없습니다.");
        return;
      }

      const timestamp = new Date().getTime();
      const destPath = Platform.select({
        ios: `${RNFS.DocumentDirectoryPath}/walk_${timestamp}.png`,
        android: `${RNFS.PicturesDirectoryPath}/WithPet/walk_${timestamp}.png`,
      });

      if (Platform.OS === "android") {
        const dirPath = `${RNFS.PicturesDirectoryPath}/WithPet`;
        const dirExists = await RNFS.exists(dirPath);
        if (!dirExists) {
          await RNFS.mkdir(dirPath);
        }
      }

      await RNFS.copyFile(uri, destPath!);

      if (Platform.OS === "android") {
        await RNFS.scanFile(destPath!);
      }

      Alert.alert("저장 완료", "갤러리에 이미지가 저장되었습니다.");
      setShowShareModal(false);
    } catch (error) {
      console.error("Save to gallery error:", error);
      Alert.alert("저장 실패", "갤러리 저장 중 오류가 발생했습니다.");
    }
  };

  const handleShareToSNS = async () => {
    try {
      const uri = await captureImage();
      if (!uri) {
        Alert.alert("오류", "이미지를 생성할 수 없습니다.");
        return;
      }

      const shareOptions = {
        title: "산책 완료!",
        message: `${duration} 동안 ${distance} 산책을 완료했어요! 🐕‍🦺`,
        url: uri,
        type: "image/png",
      };

      await Share.open(shareOptions);
      setShowShareModal(false);
    } catch (error) {
      console.error("Share error:", error);
      if (error !== "User did not share") {
        Alert.alert("공유 실패", "공유 중 오류가 발생했습니다.");
      }
    }
  };

  const handleSNSShare = () => {
    setShowShareModal(true);
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
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              <View style={styles.heartContainer}>
                <Image source={require("../../assets/icons/logo.png")} />
              </View>

              {/* 실제 산책 경로 */}
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

                    {/* 실제 경로가 있으면 표시 */}
                    {points && (
                      <>
                        <Polyline
                          points={points}
                          stroke="url(#pathGradient)"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* 시작점 */}
                        {startPoint && (
                          <Circle
                            cx={startPoint.x}
                            cy={startPoint.y}
                            r="6"
                            fill="#00D4FF"
                            stroke="white"
                            strokeWidth="2"
                          />
                        )}

                        {/* 끝점 */}
                        {endPoint && (
                          <Circle
                            cx={endPoint.x}
                            cy={endPoint.y}
                            r="8"
                            fill="#4262FF"
                            stroke="white"
                            strokeWidth="2"
                          />
                        )}
                      </>
                    )}

                    {/* 경로가 없을 때 기본 메시지 */}
                    {!points && (
                      <text
                        x="150"
                        y="100"
                        textAnchor="middle"
                        fill="#999"
                        fontSize="14"
                      >
                        경로 정보 없음
                      </text>
                    )}
                  </Svg>

                  {/* 현재 위치 아이콘 (끝점에 표시) */}
                  {endPoint && (
                    <View
                      style={[
                        styles.currentLocationDot,
                        {
                          left: `${(endPoint.x / 300) * 100}%`,
                          top: `${(endPoint.y / 200) * 100}%`,
                          marginLeft: -17.5,
                          marginTop: -17.5,
                        },
                      ]}
                    >
                      <Image
                        source={require("../../assets/icons/puppy.png")}
                        style={styles.puppyImage}
                      />
                    </View>
                  )}
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

      {/* 공유 옵션 모달 */}
      <Modal
        visible={showShareModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowShareModal(false)}
      >
        <TouchableOpacity
          style={styles.shareOverlay}
          activeOpacity={1}
          onPress={() => setShowShareModal(false)}
        >
          <View style={styles.shareModalContainer}>
            <Text style={styles.shareTitle}>공유 옵션</Text>

            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={handleSaveToGallery}
            >
              <View style={styles.shareOptionIcon}>
                <Text style={styles.shareOptionIconText}>📱</Text>
              </View>
              <Text style={styles.shareOptionText}>갤러리에 저장</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={handleShareToSNS}
            >
              <View style={styles.shareOptionIcon}>
                <Text style={styles.shareOptionIconText}>🔗</Text>
              </View>
              <Text style={styles.shareOptionText}>다른 앱으로 공유</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowShareModal(false)}
            >
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
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
    width: 320,
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
  mapContainer: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 0,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
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
    fontSize: 15,
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
    paddingTop: 25,
    paddingBottom: 40,
  },
  shareTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#333",
  },
  shareOptionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    marginBottom: 12,
  },
  shareOptionIcon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#4262FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  shareOptionIconText: {
    fontSize: 22,
  },
  shareOptionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
});
