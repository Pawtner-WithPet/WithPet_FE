// components/Lost/SelectModal.tsx
import React, { memo } from "react";
import {
  Modal,
  Pressable,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";

export type SelectItem = { label: string; value: string | number };

type Props = {
  open: boolean;                     
  title: string;                     
  items: SelectItem[];               
  emptyText?: string;               
  onSelect: (value: string | number) => void; 
  onClose: () => void;             
  cardStyle?: ViewStyle;              
};

const SelectModal: React.FC<Props> = ({
  open,
  title,
  items,
  emptyText = "등록된 반려견이 없습니다",
  onSelect,
  onClose,
  cardStyle,
}) => {
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={[styles.card, cardStyle]} pointerEvents="box-none" accessible>
          <Text style={styles.title}>{title}</Text>

          {items.length ? (
            items.map((it) => (
              <TouchableOpacity
                key={String(it.value)}
                style={styles.item}
                onPress={() => onSelect(it.value)}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel={`${it.label} 선택`}
              >
                <Text style={styles.itemText}>{it.label}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.item}>
              <Text style={[styles.itemText, { color: "#999" }]}>{emptyText}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.closeText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "84%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
    textAlign: "center",
    marginBottom: 12,
  },
  item: {
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#F2F4F8",
    marginVertical: 6,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#111",
    fontWeight: "600",
  },
  closeBtn: {
    alignSelf: "center",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#3366FF",
    borderRadius: 10,
  },
  closeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default memo(SelectModal);
