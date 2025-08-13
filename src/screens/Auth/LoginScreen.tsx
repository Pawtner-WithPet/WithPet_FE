import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Logo from "../../components/Auth/Logo";
import LoginForm from "../../components/Auth/LoginForm";
import AuthLinks from "../../components/Auth/AuthLinks";
import SocialLoginSection from "../../components/Auth/SocialLoginSection";

const LoginScreen = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);

  const handleLogin = () => {
    console.log("로그인 시도:", { id, password, autoLogin });
    // 로그인 로직 구현
  };

  const handleFindId = () => {
    console.log("아이디 찾기");
    // 아이디 찾기 로직
  };

  const handleFindPassword = () => {
    console.log("비밀번호 찾기");
    // 비밀번호 찾기 로직
  };

  const handleSignUp = () => {
    console.log("회원가입");
    // 회원가입 로직
  };

  const handleGoogleLogin = () => {
    console.log("구글 로그인");
    // 구글 로그인 로직
  };

  const handleKakaoLogin = () => {
    console.log("카카오 로그인");
    // 카카오 로그인 로직
  };

  const handleNaverLogin = () => {
    console.log("네이버 로그인");
    // 네이버 로그인 로직
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
