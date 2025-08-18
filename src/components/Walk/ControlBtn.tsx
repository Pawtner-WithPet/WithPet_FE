import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ControlButtonsProps {
  isPaused: boolean;
  onPauseResume: () => void;
  onStartRecord: () => void;
}

export const ControlBtn: React.FC<ControlButtonsProps> = ({
  isPaused,
  onPauseResume,
  onStartRecord,
}) => {
  return (
    <View style={styles.controlContainer}>
      <TouchableOpacity style={styles.pauseButton} onPress={onPauseResume}>
        <Text style={styles.pauseButtonText}>{isPaused ? "▶" : "⏸"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.recordButton} onPress={onStartRecord}>
        <Text style={styles.recordButtonText}>산책 기록 시작</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controlContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    gap: 12,
    alignItems: "center",
  },
  pauseButton: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  pauseButtonText: {
    fontSize: 20,
    color: "#333333",
  },
  recordButton: {
    flex: 1,
    height: 60,
    backgroundColor: "#4262FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4262FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  recordButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
