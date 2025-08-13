import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Logo: React.FC = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require("../../assets/icons/title.png")}
        style={styles.titleImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  titleImage: {
    width: 300,
    height: 120,
  },
});

export default Logo;
