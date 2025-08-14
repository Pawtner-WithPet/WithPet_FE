import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // navigation 훅 import

interface SignUpHeaderProps {
  onBack?: () => void; // optional로 변경
}

const SignUpHeader: React.FC<SignUpHeaderProps> = ({ onBack }) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack(); // 커스텀 onBack 함수가 있으면 실행
    } else {
      navigation.goBack(); // 없으면 기본 뒤로가기
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>
      <Text style={styles.title}>회원가입</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    lineHeight: 32,
    textAlignVertical: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  placeholder: {
    width: 40,
    height: 40,
  },
});

export default SignUpHeader;
