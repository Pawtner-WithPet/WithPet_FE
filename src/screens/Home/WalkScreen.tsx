import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";

const WalkScreen: React.FC = () => (
  <View style={{ flex: 1 }}>
    <Header />
    <View style={styles.container}>
      <Text>산책 화면</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default WalkScreen;
