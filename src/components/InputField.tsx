import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
  placeholder?: string;
}

export const InputField = ({
  label,
  value,
  onChangeText,
  required,
  placeholder,
}: Props) => (
  <View style={styles.container}>
    <Text style={styles.label}>
      {label} {required && <Text style={{ color: "red" }}>*</Text>}
    </Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 6 },
  label: { fontWeight: "bold", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
});
