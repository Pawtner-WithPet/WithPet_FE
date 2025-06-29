import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface DisabledInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
}

export const DisabledInput: React.FC<DisabledInputProps> = ({
  label,
  placeholder,
  value,
  required = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.disabledInput}>
        <Text style={styles.disabledText}>
          {value?.trim() ? value : placeholder || ""}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  required: {
    color: "#ff6b6b",
  },
  disabledInput: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#F3F4F6",
  },
  disabledText: {
    fontSize: 16,
    color: "#979696",
    fontWeight: "bold",
  },
});
