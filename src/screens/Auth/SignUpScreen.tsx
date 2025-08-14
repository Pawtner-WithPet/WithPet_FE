import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SignUpHeader from "../../components/Auth/SignUp/SignUpHeader";
import SignUpForm from "../../components/Auth/SignUp/SignUpForm";
import AnimalRegist from "../../components/Auth/SignUp/AnimalRegist";
import Agreement from "../../components/Auth/SignUp/Agreement";
import SignUpBtn from "../../components/Auth/SignUp/SignUpBtn";

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null,
  );
  const [animalRegistrationChecked, setAnimalRegistrationChecked] =
    useState(true);
  const [allTermsAgreed, setAllTermsAgreed] = useState(true);
  const [personalInfoCollection, setPersonalInfoCollection] = useState(true);
  const [locationInfo, setLocationInfo] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState(true);

  const handleBack = () => {
    // 뒤로가기 로직
    console.log("뒤로가기");
  };

  const handleEmailCheck = () => {
    // 이메일 중복 확인 로직
    setIsEmailAvailable(true);
    console.log("이메일 중복 확인");
  };

  const handleSignUp = () => {
    // 회원가입 로직
    console.log("회원가입");
  };

  return (
    <View style={styles.container}>
      <SignUpHeader onBack={handleBack} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <SignUpForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isEmailAvailable={isEmailAvailable}
            onEmailCheck={handleEmailCheck}
          />

          <AnimalRegist
            checked={animalRegistrationChecked}
            onToggle={() =>
              setAnimalRegistrationChecked(!animalRegistrationChecked)
            }
          />

          <Agreement
            allTermsAgreed={allTermsAgreed}
            setAllTermsAgreed={setAllTermsAgreed}
            personalInfoCollection={personalInfoCollection}
            setPersonalInfoCollection={setPersonalInfoCollection}
            locationInfo={locationInfo}
            setLocationInfo={setLocationInfo}
            aiAnalysis={aiAnalysis}
            setAiAnalysis={setAiAnalysis}
          />

          <SignUpBtn
            onPress={handleSignUp}
            disabled={
              !allTermsAgreed || !email || !password || !confirmPassword
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
});

export default SignUpScreen;
