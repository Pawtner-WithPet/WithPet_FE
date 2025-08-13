import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
  label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onPress,
  label,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#FFFFFF",
  },
  checkedBox: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    color: "#333333",
  },
});

export default CustomCheckbox;
