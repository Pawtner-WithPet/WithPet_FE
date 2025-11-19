import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import icon_search from "../../assets/icons/search.png";

interface PetSearchButtonProps {
  onPress: () => void;
}

const PetSearchButton: React.FC<PetSearchButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Image source={icon_search} style={styles.fabIcon} />
    </TouchableOpacity>
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
  fabIcon: {
    width: 40,
    height: 40,
    tintColor: "#fff",
  },
});

export default PetSearchButton;
