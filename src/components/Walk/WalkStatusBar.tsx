import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface WalkStatusBarProps {
  petName: string;
  isActive: boolean;
}

export const WalkStatusBar: React.FC<WalkStatusBarProps> = ({
  petName,
  isActive,
}) => {
  return (
    <View style={styles.statusContainer}>
      <View style={styles.statusButtons}>
        <TouchableOpacity
          style={[styles.statusButton, isActive && styles.activeButton]}
        >
          <Text
            style={[
              styles.statusButtonText,
              isActive && styles.activeButtonText,
            ]}
          >
            {petName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statusButton}>
          <Text style={styles.statusButtonText}>조이</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  statusButtons: {
    flexDirection: "row",
    gap: 8,
  },
  statusButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#E8E8E8",
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: "#4262FF",
  },
  statusButtonText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  activeButtonText: {
    color: "#FFFFFF",
  },
});
