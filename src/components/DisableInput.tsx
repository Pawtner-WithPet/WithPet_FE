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
  required = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <View style={styles.disabledInput}>
        <Text style={styles.disabledText}>{placeholder}</Text>
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
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  required: {
    color: "#ff6b6b",
  },
  disabledInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#f8f9fa",
  },
  disabledText: {
    fontSize: 16,
    color: "#999999",
  },
});
