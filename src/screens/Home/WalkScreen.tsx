import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Colors } from "../../constants/colors";

const WalkScreen: React.FC = () => (
  <View style={styles.container}>
    <Header />
    <View>
      <Text>산책 화면</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // 또는 "#fff"
  },
});

export default WalkScreen;
