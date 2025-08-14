import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface SignUpBtnProps {
  onPress: () => void;
  disabled?: boolean;
}

const SignUpBtn: React.FC<SignUpBtnProps> = ({ onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.signUpButton, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.signUpButtonText, disabled && styles.disabledText]}>
        회원가입
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signUpButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 17,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#B9B9B9",
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  disabledText: {
    color: "#FFFFFF",
  },
});

export default SignUpBtn;
