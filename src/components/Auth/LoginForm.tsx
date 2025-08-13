import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import CustomCheckbox from "./CustomCheckbox";

interface LoginFormProps {
  id: string;
  setId: (id: string) => void;
  password: string;
  setPassword: (password: string) => void;
  autoLogin: boolean;
  setAutoLogin: (autoLogin: boolean) => void;
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  id,
  setId,
  password,
  setPassword,
  autoLogin,
  setAutoLogin,
  onLogin,
}) => {
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="아이디 입력"
        value={id}
        onChangeText={setId}
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호 입력"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <CustomCheckbox
        checked={autoLogin}
        onPress={() => setAutoLogin(!autoLogin)}
        label="자동 로그인"
      />

      <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>로그인 하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
  },
  loginButton: {
    backgroundColor: "#9E9E9E",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoginForm;
