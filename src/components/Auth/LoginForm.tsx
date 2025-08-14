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
        placeholderTextColor="#B9B9B9"
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호 입력"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#B9B9B9"
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
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 11,
    backgroundColor: "#FFFFFF",
  },
  loginButton: {
    backgroundColor: "#B9B9B9",
    paddingVertical: 17,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default LoginForm;
