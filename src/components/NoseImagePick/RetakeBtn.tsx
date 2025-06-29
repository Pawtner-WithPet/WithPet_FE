import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ActionButtonsProps {
  onTryAgain: () => void;
}

const RetakeBtn: React.FC<ActionButtonsProps> = ({ onTryAgain }) => (
  <TouchableOpacity style={styles.retakeButton} onPress={onTryAgain}>
    <Text style={styles.buttonText}>다시 촬영하기</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default RetakeBtn;
