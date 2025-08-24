import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface ConfirmButtonProps {
  onPress: () => void;
  disabled?: boolean;
  title?: string;
}

const ConfirmBtn: React.FC<ConfirmButtonProps> = ({
  onPress,
  disabled = false,
  title = "확인",
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text
          style={[styles.buttonText, disabled && styles.buttonTextDisabled]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  button: {
    backgroundColor: "#CCCCCC",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#F0F0F0",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buttonTextDisabled: {
    color: "#CCCCCC",
  },
});

export default ConfirmBtn;
