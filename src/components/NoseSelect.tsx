import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface BiometricSectionProps {
  onRegister: () => void;
  onVerify: () => void;
}

export const BiometricSection: React.FC<BiometricSectionProps> = ({
  onRegister,
  onVerify,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>비문 정보</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onRegister}>
          <Text style={styles.buttonText}>비문 등록하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonActive]}
          onPress={onVerify}
        >
          <Text style={[styles.buttonText, styles.buttonTextActive]}>
            비문 확인
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },
  buttonText: {
    fontSize: 14,
    color: "#666666",
  },
  buttonTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
