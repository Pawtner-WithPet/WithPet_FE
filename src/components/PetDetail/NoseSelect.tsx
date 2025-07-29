import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface NoseSelectProps {
  onVerify: () => void;
  isLoadingVerify?: boolean;
}

export const NoseSelect: React.FC<NoseSelectProps> = ({
  onVerify,
  isLoadingVerify = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>비문 정보</Text>

      <View style={styles.buttonContainer}>
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
  verifyButton: {
    backgroundColor: "#4262FF",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
