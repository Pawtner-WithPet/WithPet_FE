import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MoodTagProps {
  mood: "happy" | "joy";
  isActive?: boolean;
}

export const MoodTag: React.FC<MoodTagProps> = ({ mood, isActive = true }) => {
  const getMoodText = (mood: string) => {
    return mood === "happy" ? "해피" : "조이";
  };

  return (
    <View
      style={[
        styles.container,
        isActive ? styles.activeTag : styles.inactiveTag,
      ]}
    >
      <Text
        style={[
          styles.text,
          isActive ? styles.activeText : styles.inactiveText,
        ]}
      >
        {getMoodText(mood)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTag: {
    backgroundColor: "#8B9DFF",
  },
  inactiveTag: {
    backgroundColor: "#E5E5E5",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeText: {
    color: "#fff",
  },
  inactiveText: {
    color: "#666",
  },
});
