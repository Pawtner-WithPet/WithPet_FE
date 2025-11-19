import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Pet } from "../../types/index";

interface PetSelectionModalProps {
  visible: boolean;
  pets: Pet[];
  onSelectPet: (petId: number) => void;
  onClose: () => void;
}

export const PetSelectionModal: React.FC<PetSelectionModalProps> = ({
  visible,
  pets,
  onSelectPet,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>반려견을 선택해 주세요</Text>

          <View style={styles.petGrid}>
            {pets.map((pet) => (
              <TouchableOpacity
                key={pet.id}
                style={[styles.petItem, pet.isActive && styles.petItemActive]}
                onPress={() => onSelectPet(pet.id)}
              >
                <View
                  style={[styles.petIcon, pet.isActive && styles.petIconActive]}
                >
                  <Text style={styles.petIconText}>🐕</Text>
                </View>
                <Text
                  style={[styles.petName, pet.isActive && styles.petNameActive]}
                >
                  {pet.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    width: "85%",
    maxWidth: 350,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 25,
    color: "#333",
  },
  petGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginBottom: 30,
  },
  petItem: {
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    width: 80,
  },
  petItemActive: {
    backgroundColor: "#E3F2FD",
  },
  petIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  petIconActive: {
    backgroundColor: "#2196F3",
  },
  petIconText: {
    fontSize: 20,
  },
  petName: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  petNameActive: {
    color: "#2196F3",
    fontWeight: "600",
  },
  closeButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#666",
  },
});
