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
      {/* 왼쪽 그룹: 회원가입 */}
      <View style={styles.leftGroup}>
        <TouchableOpacity onPress={onSignUp} style={styles.signupContainer}>
          <Text style={styles.signup}>회원가입</Text>
          {/* 밑줄 View 추가 */}
          <View style={styles.underline} />
        </TouchableOpacity>
      </View>

      {/* 오른쪽 그룹: 아이디 찾기, 비밀번호 찾기 */}
      <View style={styles.rightGroup}>
        <TouchableOpacity onPress={onFindId}>
          <Text style={styles.linkText}>아이디 찾기</Text>
        </TouchableOpacity>
        <LinksSeparator />
        <TouchableOpacity onPress={onFindPassword}>
          <Text style={styles.linkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 33,
    paddingHorizontal: 2,
  },
  leftGroup: {
    alignItems: "flex-start",
  },
  rightGroup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupContainer: {
    alignItems: "flex-start",
  },
  signup: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000000",
  },
  underline: {
    height: 1.5,
    backgroundColor: "#000000",
    width: 50,
    marginTop: 1,
  },
  linkText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#979696",
  },
});

export default AuthLinks;
