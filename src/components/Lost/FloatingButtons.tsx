import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import icon_search from "../../../assets/icons/search.png";

interface FloatingButtonsProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  onLostPetRegister: () => void;
  onFoundPetRegister: () => void;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  isExpanded,
  onToggleExpand,
  onLostPetRegister,
  onFoundPetRegister,
}) => {
  return (
    <>
      {isExpanded && (
        <View style={styles.dropdownButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#F64C4C" }]}
            onPress={onLostPetRegister}
          >
            <Text style={styles.actionButtonText}>실종동물 등록</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#4262FF" }]}
            onPress={onFoundPetRegister}
          >
            <Text style={styles.actionButtonText}>발견동물 등록</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.fab} onPress={onToggleExpand}>
        <Text style={styles.fabPlus}>+</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#3366FF",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  fabPlus: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    marginTop: -4,
  },
  dropdownButtons: {
    position: "absolute",
    bottom: 80,
    right: 0,
    alignItems: "flex-end",
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 1,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default FloatingButtons;
