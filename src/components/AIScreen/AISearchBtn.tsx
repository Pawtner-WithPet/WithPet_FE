import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

type AISearchBtnProps = {
  onPress: () => void;
};

const AISearchBtn: React.FC<AISearchBtnProps> = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}> AI 탐색 켜놓기</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#4262FF",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AISearchBtn;
