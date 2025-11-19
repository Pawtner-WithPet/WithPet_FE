import React from "react";
import { View, StyleSheet } from "react-native";
import FloatingButtons from "./FloatingButtons";
import PetDropdown from "./PetDropdown";
import PetSearchButton from "./PetSearchButton";

interface FloatingButtonContainerProps {
  isExpanded: boolean;
  isPetToggleVisible: boolean;
  isDropdownVisible: boolean;
  onToggleExpand: () => void;
  onTogglePetSearch: () => void;
  onToggleDropdown: () => void;
  onLostPetRegister: () => void;
  onFoundPetRegister: () => void;
  onSelectPet: (petName: string, petId: number) => void;
}

const FloatingButtonContainer: React.FC<FloatingButtonContainerProps> = ({
  isExpanded,
  isPetToggleVisible,
  isDropdownVisible,
  onToggleExpand,
  onTogglePetSearch,
  onToggleDropdown,
  onLostPetRegister,
  onFoundPetRegister,
  onSelectPet,
}) => {
  return (
    <View style={styles.floatingWrapper}>
      <PetSearchButton onPress={onTogglePetSearch} />

      <PetDropdown
        isVisible={isPetToggleVisible}
        isDropdownOpen={isDropdownVisible}
        onToggleDropdown={onToggleDropdown}
        onSelectPet={onSelectPet}
      />

      <FloatingButtons
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
        onLostPetRegister={onLostPetRegister}
        onFoundPetRegister={onFoundPetRegister}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  floatingWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
  },
});

export default FloatingButtonContainer;
