import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  isEmailAvailable: boolean | null;
  onEmailCheck: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isEmailAvailable,
  onEmailCheck,
}) => {
  // 이메일 형식 검증 함수
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 표시/숨기기 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 비밀번호 조건을 만족하는지 확인하는 함수
  const isPasswordValid = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // 비밀번호 확인 일치 여부 확인 함수
  const isPasswordsMatch = (
    password: string,
    confirmPassword: string,
  ): boolean => {
    return password === confirmPassword;
  };

  // 이메일이 올바른 형식인지 확인
  const showEmailAvailable = email.length > 0 && isValidEmail(email);

  return (
    <View style={styles.formContainer}>
      {/* 이메일 섹션 */}
      <View style={styles.inputSection}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>이메일</Text>
          {showEmailAvailable && (
            <Text style={styles.availableText}>사용가능한 이메일</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="이메일을 입력해주세요"
            placeholderTextColor="#686767"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* 비밀번호 섹션 */}
      <View style={styles.inputSection}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>비밀번호</Text>
          <Text
            style={[
              styles.requirementText,
              { color: isPasswordValid(password) ? "#4A90E2" : "red" },
            ]}
          >
            8자 이상의 영어, 숫자 혼합
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="비밀번호를 입력해주세요"
            placeholderTextColor="#686767"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {showPassword ? "숨기기" : "표시"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 비밀번호 확인 섹션 */}
      <View style={styles.inputSection}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>비밀번호 확인</Text>
          {/* 비밀번호 확인란이 비어있지 않다면, 일치 여부 표시 */}
          {confirmPassword.length > 0 && (
            <Text
              style={[
                styles.matchText,
                {
                  color: isPasswordsMatch(password, confirmPassword)
                    ? "#4A90E2"
                    : "red",
                },
              ]}
            >
              {isPasswordsMatch(password, confirmPassword)
                ? "일치"
                : "비밀번호 불일치"}
            </Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholder="비밀번호 확인"
            placeholderTextColor="#686767"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.toggleButton}
          >
            <Text style={styles.toggleText}>
              {showConfirmPassword ? "숨기기" : "표시"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  inputSection: {
    marginBottom: 27,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  label: {
    fontSize: 13,
    color: "#979696",
    fontWeight: "medium",
  },
  availableText: {
    fontSize: 12,
    color: "#4A90E2",
    fontWeight: "500",
  },
  requirementText: {
    fontSize: 12,
    fontWeight: "500",
  },
  matchText: {
    fontSize: 12,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  toggleButton: {
    marginLeft: 10,
  },
  toggleText: {
    fontSize: 14,
    color: "#999999",
    fontWeight: "500",
  },
});

export default SignUpForm;
