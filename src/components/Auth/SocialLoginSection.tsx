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
      <View style={styles.titleContainer}>
        <View style={styles.line} />
        <Text style={styles.snsTitle}>SNS 계정으로 로그인</Text>
        <View style={styles.line} />
      </View>

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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 27,
    width: "100%",
    paddingHorizontal: 0,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D8DADC",
  },
  snsTitle: {
    fontSize: 12,
    color: "#979696",
    marginHorizontal: 15,
  },
  snsButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
  },
});

export default SocialLoginSection;
