import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLostPetList } from "./useLostPetList";

interface PetDropdownProps {
  isVisible: boolean;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  onSelectPet: (petName: string, petId: number) => void;
}

const PetDropdown: React.FC<PetDropdownProps> = ({
  isVisible,
  isDropdownOpen,
  onToggleDropdown,
  onSelectPet,
}) => {
  const { userLostPets, isLoading, error, loadLostPets } = useLostPetList();

  // 드롭다운이 열릴 때 데이터 로드
  useEffect(() => {
    if (isVisible && isDropdownOpen) {
      loadLostPets();
    }
  }, [isVisible, isDropdownOpen]);

  if (!isVisible) return null;

  return (
    <View style={styles.petDropdownWrapper}>
      <TouchableOpacity style={styles.petToggleBtn} onPress={onToggleDropdown}>
        <Text style={styles.petToggleText}>탐색할 반려견 ▲</Text>
      </TouchableOpacity>

      {isDropdownOpen && (
        <View style={styles.dropdown}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.loadingText}>로딩 중...</Text>
            </View>
          ) : error ? (
            <View style={styles.dropdownItem}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : userLostPets.length === 0 ? (
            <View style={styles.dropdownItem}>
              <Text style={styles.emptyText}>등록된 반려견이 없습니다</Text>
            </View>
          ) : (
            userLostPets.map((pet) => (
              <TouchableOpacity
                key={pet.petId}
                style={styles.dropdownItem}
                onPress={() => onSelectPet(pet.dogNm, pet.petId)}
              >
                <Text style={styles.dropdownText}>{pet.dogNm}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  petDropdownWrapper: {
    position: "absolute",
    bottom: 80,
    left: 0,
    alignItems: "flex-start",
    zIndex: 10,
  },
  petToggleBtn: {
    backgroundColor: "#3366FF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  petToggleText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    bottom: 44,
    left: 0,
    backgroundColor: "#A5BFFF",
    borderRadius: 10,
    overflow: "hidden",
    zIndex: 20,
    minWidth: 150,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  loadingContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "#FFE0E0",
    fontSize: 14,
    textAlign: "center",
  },
  emptyText: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
  },
});

export default PetDropdown;
