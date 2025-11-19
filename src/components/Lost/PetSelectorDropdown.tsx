import React, { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type PetSelectorItem = { label: string; value: string | number };

type Props = {
  visible: boolean;                
  expanded: boolean;             
  onToggleExpand: () => void;
  items: PetSelectorItem[];        
  onSelect: (v: string | number) => void; 
};

const PetSelectorDropdown: React.FC<Props> = ({
  visible,
  expanded,
  onToggleExpand,
  items,
  onSelect,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.toggleBtn}
        onPress={onToggleExpand}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="탐색할 반려견 펼치기"
      >
        <Text style={styles.toggleText}>탐색할 반려견 ▲</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.dropdown}>
          {items.map((it) => (
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
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 80,
    right: 230,
    alignItems: "flex-end",
    zIndex: 10,
  },
  toggleBtn: {
    backgroundColor: "#3366FF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    left: 10,
  },
  toggleText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  dropdown: {
    position: "absolute",
    bottom: 44,
    right: -8,
    backgroundColor: "#A5BFFF",
    borderRadius: 10,
    overflow: "hidden",
    zIndex: 20,
    minWidth: 150,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});

export default memo(PetSelectorDropdown);
