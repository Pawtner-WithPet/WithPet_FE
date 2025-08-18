import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Pet } from "../../types/index";

interface PetTagProps {
  pet: Pet;
}

export const PetTag: React.FC<PetTagProps> = ({ pet }) => {
  return (
    <View
      style={[
        styles.container,
        pet.isActive ? styles.activeTag : styles.inactiveTag,
      ]}
    >
      <Text
        style={[
          styles.text,
          pet.isActive ? styles.activeText : styles.inactiveText,
        ]}
      >
        {pet.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTag: {
    backgroundColor: "#8B9DFF",
  },
  inactiveTag: {
    backgroundColor: "#E5E5E5",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeText: {
    color: "#fff",
  },
  inactiveText: {
    color: "#666",
  },
});
