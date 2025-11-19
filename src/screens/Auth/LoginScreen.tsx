import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Logo from "../../components/Auth/Logo";
import LoginForm from "../../components/Auth/LoginForm";
import AuthLinks from "../../components/Auth/AuthLinks";
import SocialLoginSection from "../../components/Auth/SocialLoginSection";

// RootStackParamList에 MainTabs 추가
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  MainTabs: undefined; // 수정됨
  Main: undefined; // 필요하다면 유지
};

// RootStack 전체를 참조하는 navigation 타입
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);

  const handleLogin = () => {
    navigation.navigate("MainTabs"); // ✅ 오류 없음
  };

  const handleFindId = () => {
    console.log("아이디 찾기");
  };

  const handleFindPassword = () => {
    console.log("비밀번호 찾기");
  };

  const handleSignUp = () => {
    console.log("회원가입");
    navigation.navigate("SignUp"); // ✅ 오류 없음
  };

  const handleGoogleLogin = () => {
    console.log("구글 로그인");
  };

  const handleKakaoLogin = () => {
    console.log("카카오 로그인");
  };

  const handleNaverLogin = () => {
    console.log("네이버 로그인");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Logo />
        <LoginForm
          id={id}
          setId={setId}
          password={password}
          setPassword={setPassword}
          autoLogin={autoLogin}
          setAutoLogin={setAutoLogin}
          onLogin={handleLogin}
        />
        <AuthLinks
          onSignUp={handleSignUp}
          onFindId={handleFindId}
          onFindPassword={handleFindPassword}
        />
        <SocialLoginSection
          onGoogleLogin={handleGoogleLogin}
          onKakaoLogin={handleKakaoLogin}
          onNaverLogin={handleNaverLogin}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 40,
    paddingTop: 60,
    paddingBottom: 40,
  },
});

export default LoginScreen;
