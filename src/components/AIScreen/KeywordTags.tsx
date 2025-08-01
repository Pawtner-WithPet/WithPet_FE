import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const KeywordTags: React.FC = () => {
  const keywords = ["키워드", "키워드", "키워드", "키워드", "키워드"];

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {keywords.map((keyword, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{keyword}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 16,
  },
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    minWidth: 60, // 최소 너비 설정
  },
  tagText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
});

export default KeywordTags;
