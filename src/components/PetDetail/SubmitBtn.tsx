import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface SubmitButtonProps {
  onPress: () => void;
  title?: string;
}

const SubmitBtn: React.FC<SubmitButtonProps> = ({
  onPress,
  title = "저장하기",
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#161F40",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SubmitBtn;
