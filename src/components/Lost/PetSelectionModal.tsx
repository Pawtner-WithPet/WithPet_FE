import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";

interface PetSelectionModalProps {
  visible: boolean;
  petNames: string[];
  onClose: () => void;
  onSelectPet: (petName: string) => void;
}

const PetSelectionModal: React.FC<PetSelectionModalProps> = ({
  visible,
  petNames,
  onClose,
  onSelectPet,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>반려견 선택</Text>

          {petNames.length > 0 ? (
            petNames.map((pet) => (
              <TouchableOpacity
                key={pet}
                style={styles.modalItem}
                onPress={() => onSelectPet(pet)}
              >
                <Text style={styles.modalItemText}>{pet}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.modalItem}>
              <Text style={[styles.modalItemText, { color: "#999" }]}>
                등록된 반려견이 없습니다
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
            <Text style={styles.modalCloseText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    width: "84%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
    textAlign: "center",
    marginBottom: 12,
  },
  modalItem: {
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#F2F4F8",
    marginVertical: 6,
    borderRadius: 10,
  },
  modalItemText: {
    fontSize: 16,
    color: "#111",
    fontWeight: "600",
  },
  modalCloseBtn: {
    alignSelf: "center",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#3366FF",
    borderRadius: 10,
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default PetSelectionModal;
