import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface SocialBtnProps {
  type: "google" | "kakao" | "naver";
  onPress: () => void;
}

const SocialBtn: React.FC<SocialBtnProps> = ({ type, onPress }) => {
  const getButtonConfig = () => {
    switch (type) {
      case "google":
        return {
          backgroundColor: "#fff",
          icon: "G",
          iconStyle: styles.googleIcon,
        };
      case "kakao":
        return {
          backgroundColor: "#FEE500",
          icon: "💬",
          iconStyle: styles.kakaoIcon,
        };
      case "naver":
        return {
          backgroundColor: "#03C75A",
          icon: "N",
          iconStyle: styles.naverIcon,
        };
      default:
        return {
          backgroundColor: "#fff",
          icon: "",
          iconStyle: {},
        };
    }
  };

  const config = getButtonConfig();

  return (
    <TouchableOpacity style={styles.snsButton} onPress={onPress}>
      <View
        style={[
          styles.snsIconContainer,
          { backgroundColor: config.backgroundColor },
        ]}
      >
        <Text style={config.iconStyle}>{config.icon}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  snsButton: {
    alignItems: "center",
  },
  snsIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  googleIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4285F4",
  },
  kakaoIcon: {
    fontSize: 20,
  },
  naverIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default SocialBtn;
