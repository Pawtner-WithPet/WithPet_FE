import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface NoseSelectProps {
  onRegister: () => void;
  onVerify: () => void;
  isLoadingVerify?: boolean;
}

export const NoseSelect: React.FC<NoseSelectProps> = ({
  onRegister,
  onVerify,
  isLoadingVerify = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>비문 관리</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={onRegister}
        >
          <Text style={styles.registerButtonText}>비문 등록하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.verifyButton]}
          onPress={onVerify}
          disabled={isLoadingVerify}
        >
          {isLoadingVerify ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <Text style={styles.verifyButtonText}>비문 확인</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  registerButton: {
    backgroundColor: "#161F40",
  },
  verifyButton: {
    backgroundColor: "#4262FF",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
