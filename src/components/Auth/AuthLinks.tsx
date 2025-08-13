import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import LinksSeparator from "./LisnksSeparator";

interface AuthLinksProps {
  onSignUp: () => void;
  onFindId: () => void;
  onFindPassword: () => void;
}

const AuthLinks: React.FC<AuthLinksProps> = ({
  onSignUp,
  onFindId,
  onFindPassword,
}) => {
  return (
    <View style={styles.linksContainer}>
      <TouchableOpacity onPress={onSignUp}>
        <Text style={styles.linkText}>회원가입</Text>
      </TouchableOpacity>

      <LinksSeparator />

      <TouchableOpacity onPress={onFindId}>
        <Text style={styles.linkText}>아이디 찾기</Text>
      </TouchableOpacity>

      <LinksSeparator />

      <TouchableOpacity onPress={onFindPassword}>
        <Text style={styles.linkText}>비밀번호 찾기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  linkText: {
    fontSize: 14,
    color: "#666666",
    textDecorationLine: "underline",
  },
});

export default AuthLinks;
