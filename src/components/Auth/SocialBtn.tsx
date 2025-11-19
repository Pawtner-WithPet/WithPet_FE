import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";

interface SocialBtnProps {
  type: "google" | "kakao" | "naver";
  onPress: () => void;
}

const SocialBtn: React.FC<SocialBtnProps> = ({ type, onPress }) => {
  const getButtonConfig = () => {
    switch (type) {
      case "google":
        return {
          icon: require("../../assets/icons/Google.png"),
        };
      case "kakao":
        return {
          icon: require("../../assets/icons/Kakao.png"),
        };
      case "naver":
        return {
          icon: require("../../assets/icons/Naver.png"),
        };
      default:
        return {
          icon: null,
        };
    }
  };

  const config = getButtonConfig();

  return (
    <TouchableOpacity style={styles.snsButton} onPress={onPress}>
      {config.icon && <Image source={config.icon} style={styles.iconImage} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  snsButton: {
    alignItems: "center",
    width: 60,
    height: 60,
    justifyContent: "center",
    marginHorizontal: 15,
  },
  iconImage: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
});

export default SocialBtn;
