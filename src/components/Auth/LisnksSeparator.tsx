import React from "react";
import { View, StyleSheet } from "react-native";

const LinksSeparator: React.FC = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    width: 1,
    height: 12,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 12,
  },
});

export default LinksSeparator;
