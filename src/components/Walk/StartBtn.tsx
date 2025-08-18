import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface StartBtnProps {
  onPress: () => void;
}

export const StartBtn: React.FC<StartBtnProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>산책 기록 시작</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: "#4262FF",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
