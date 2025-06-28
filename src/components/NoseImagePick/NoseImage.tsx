import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";

const NoseImage: React.FC = () => (
  <View style={styles.imageContainer}>
    <View style={styles.dogFaceContainer}>
      <View style={styles.dogFaceBackground}>
        <View style={styles.noseContainer}>
          <View style={styles.nose}>
            <View style={[styles.nostril, styles.leftNostril]} />
            <View style={[styles.nostril, styles.rightNostril]} />
            <View style={styles.noseLine} />
          </View>
        </View>
        <View style={styles.mouth} />
      </View>
    </View>
  </View>
);

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
});

export default NoseImage;
