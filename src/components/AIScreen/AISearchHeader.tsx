import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../constants/colors";

const AISearchHeader: React.FC = () => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.backButton}>
      <Icon name="arrow-back" size={24} color="#000" />
    </TouchableOpacity>
    <Text style={styles.title}>AI 탐색</Text>
    <View style={styles.placeholder} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    height:
      56 + (Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) : 0),
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  placeholder: {
    width: 40,
  },
});

export default AISearchHeader;
