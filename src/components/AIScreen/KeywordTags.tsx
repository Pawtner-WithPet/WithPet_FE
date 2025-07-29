import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const KeywordTags: React.FC = () => {
  const keywords = ["키워드", "키워드", "키워드", "키워드", "키워드"];

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
    color: "#666666",
  },
});

export default KeywordTags;
