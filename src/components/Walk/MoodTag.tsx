import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MoodTagProps {
  mood: "곰탱이"; // 여기서 mood를 곰탱이로만 설정
  isActive?: boolean;
}

export const MoodTag: React.FC<MoodTagProps> = ({ mood, isActive = true }) => {
  const getMoodText = (mood: string) => {
    return mood === "곰탱이" ? "곰탱이" : ""; // 곰탱이로만 처리
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
        {getMoodText(mood)} {/* 곰탱이로만 텍스트 출력 */}
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
