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
  disabled = true,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}>*</Text>}
      </Text>

      <View style={styles.buttonContainer}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.button,
                isSelected && styles.buttonActive,
                disabled && styles.button,
              ]}
              onPress={() => {
                if (!disabled) onSelect(option.value);
              }}
              disabled={disabled}
              activeOpacity={disabled ? 1 : 0.7}
            >
              <Text
                style={[
                  styles.buttonText,
                  isSelected && styles.buttonTextActive,
                  disabled && styles.buttonText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  required: {
    color: "#ff6b6b",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 14,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#D5DDFF",
    borderColor: "#4262FF",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    color: "#979696",
    fontWeight: "bold",
  },
  buttonTextActive: {
    color: "#000000",
    fontWeight: "bold",
  },
});
