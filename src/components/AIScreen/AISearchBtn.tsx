import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface AISearchBtnProps {
  onPress: () => void;
  isActive?: boolean;
}

const AISearchBtn: React.FC<AISearchBtnProps> = ({
  onPress,
  isActive = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isActive ? styles.activeButton : styles.inactiveButton,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          isActive ? styles.activeButtonText : styles.inactiveButtonText,
        ]}
      >
        {isActive ? "실시간 AI 탐색 끄기" : "실시간 AI 탐색 켜놓기"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveButton: {
    backgroundColor: "#4262FF",
  },
  activeButton: {
    backgroundColor: "#161F40",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  inactiveButtonText: {
    color: "#FFFFFF",
  },
  activeButtonText: {
    color: "#FFFFFF",
  },
});

export default AISearchBtn;
