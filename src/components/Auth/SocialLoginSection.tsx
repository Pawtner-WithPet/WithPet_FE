import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SocialBtn from "./SocialBtn";

interface SocialLoginSectionProps {
  onGoogleLogin: () => void;
  onKakaoLogin: () => void;
  onNaverLogin: () => void;
}

const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({
  onGoogleLogin,
  onKakaoLogin,
  onNaverLogin,
}) => {
  return (
    <View style={styles.snsContainer}>
      <Text style={styles.snsTitle}>SNS 계정으로 로그인</Text>

      <View style={styles.snsButtonsContainer}>
        <SocialBtn type="google" onPress={onGoogleLogin} />
        <SocialBtn type="kakao" onPress={onKakaoLogin} />
        <SocialBtn type="naver" onPress={onNaverLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  snsContainer: {
    alignItems: "center",
  },
  snsTitle: {
    fontSize: 14,
    color: "#999999",
    marginBottom: 20,
    position: "relative",
  },
  snsButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
});

export default SocialLoginSection;
