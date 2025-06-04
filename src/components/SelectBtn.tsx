import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SelectButtonOption {
  label: string;
  value: string;
}

interface SelectButtonProps {
  label: string;
  options: SelectButtonOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}

export const SelectButton: React.FC<SelectButtonProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
  required = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      <View style={styles.buttonContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.button,
              selectedValue === option.value && styles.buttonActive,
            ]}
            onPress={() => onSelect(option.value)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedValue === option.value && styles.buttonTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
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
    fontSize: 16,
    color: "#666666",
  },
  buttonTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
