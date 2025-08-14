import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface AnimalRegistProps {
  checked: boolean;
  onToggle: () => void;
}

const AnimalRegist: React.FC<AnimalRegistProps> = ({ checked, onToggle }) => {
  return (
    <View style={styles.noticeContainer}>
      <View style={styles.noticeContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            국가동물보호정보시스템{"\n"}등록 여부 확인하기
          </Text>
          <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
            {checked && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>
          국가동물보호정보시스템에 반려동물을 등록한{"\n"}
          사용자만 서비스를 이용할 수 있어요. {"\n"}
          {"\n"}
          아직 등록 전이라면 등록하여 실종을 예방하고{"\n"}
          서비스를 이용해보세요!
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  noticeContainer: {
    marginBottom: 46,
  },
  noticeContent: {
    backgroundColor: "#F2F2F2",
    borderWidth: 2,
    borderColor: "#4262FF",
    borderRadius: 12,
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 14,
  },
  checkbox: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#4262FF",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
    color: "#686767",
    lineHeight: 20,
  },
});

export default AnimalRegist;
