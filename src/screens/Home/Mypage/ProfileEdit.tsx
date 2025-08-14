import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileEdit: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>프로필 수정 화면</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProfileEdit;
