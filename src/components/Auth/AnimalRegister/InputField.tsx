import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address";
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  onClear,
  placeholder = "입력",
  keyboardType = "default",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#CCCCCC"
          keyboardType={keyboardType}
        />

        {value.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={onClear}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View style={styles.clearIcon}>
              <Text style={styles.clearText}>×</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 10,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 16,
    color: "#333333",
    paddingRight: 50, // clearButton 공간 확보
  },
  clearButton: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  clearIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
  },
  clearText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
    lineHeight: 20,
  },
});

export default InputField;
