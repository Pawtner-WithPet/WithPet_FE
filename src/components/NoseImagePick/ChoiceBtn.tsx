import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ChoiceButtonsProps {
  onLostPet: () => void;
  onFoundPet: () => void;
}
const ChoiceButtons: React.FC<ChoiceButtonsProps> = ({
  onLostPet,
  onFoundPet,
}) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity style={styles.choiceButton} onPress={onLostPet}>
      <Text style={styles.buttonText}>실종 동물</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.choiceButton} onPress={onFoundPet}>
      <Text style={styles.buttonText}>발견 동물</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  choiceButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ChoiceButtons;
