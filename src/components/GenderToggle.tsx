import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface GenderToggleProps {
  label?: string;
  selected: string;
  onChange: (value: string) => void;
}

const GenderToggle = ({ label, selected, onChange }: GenderToggleProps) => {
  const options = ["중성화 실시", "중성화 미실시"];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.toggleGroup}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              selected === option && styles.selectedOption,
            ]}
            onPress={() => onChange(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
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
    marginBottom: 8,
  },
  toggleGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#eee",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  selectedOption: {
    backgroundColor: "#4caf50",
  },
  optionText: {
    color: "#000",
  },
});

export default GenderToggle;
