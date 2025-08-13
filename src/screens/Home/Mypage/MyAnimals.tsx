import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyAnimals: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>내 동물 목록 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default MyAnimals;
