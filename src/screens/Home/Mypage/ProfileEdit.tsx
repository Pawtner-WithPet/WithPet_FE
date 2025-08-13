import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import iconBack from "../../../assets/icons/icon_detail_page.png";
import iconCamera from "../../../assets/icons/camera.png";
import iconEdit from "../../../assets/icons/icon_edit.png"; 



import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MyPageStackParamList } from "../../../navigation/MyPageStack";


const profilePlaceholder = require("../../../assets/images/happy1.png");

const ProfileEdit: React.FC = () => {

  const [nickname, setNickname] = useState("닉네임");
  const navigation = useNavigation<NativeStackNavigationProp<MyPageStackParamList>>();

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={iconBack} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>프로필 수정</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* 프로필 이미지 */}
        <View style={styles.profileImageWrapper}>
          <Image source={profilePlaceholder} style={styles.profileImage} />
          <TouchableOpacity style={styles.cameraIconWrapper}>
            <Image source={iconCamera} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>

        {/* 닉네임 */}
        <View style={styles.nicknameRow}>
          <Text style={styles.nickname}>{nickname}</Text>
          <Image source={iconEdit} style={styles.editIcon} />
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 메뉴 리스트 */}
        <MenuRow label="프로필 추가" onPress={() => navigation.navigate("AddProfile")} />
        <MenuRow label="비밀번호 변경" />
        <MenuRow label="회원 탈퇴하기" />

        {/* 확인 버튼 */}
        <TouchableOpacity style={styles.confirmButton} disabled>
          <Text style={styles.confirmText}>확인</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const MenuRow = ({ label, onPress }: { label: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.menuRow} onPress={onPress}>
    <Text style={styles.menuLabel}>{label}</Text>
    <Text style={styles.menuArrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  backIcon: {
    width: 24,
    height: 24,
    transform: [{ scaleX: -1 }],
    tintColor: "#000",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },

  content: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 40,
  },

  profileImageWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#EEE",
  },
  cameraIconWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    borderRadius: 18,
    padding: 6,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },

  nicknameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 16,
  },
  nickname: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },
  editIcon: {
    width: 16,
    height: 16,
    tintColor: "#111",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEE",
    width: "100%",
    marginVertical: 10,
  },

  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },
  menuLabel: {
    fontSize: 15,
    color: "#111",
  },
  menuArrow: {
    fontSize: 18,
    color: "#999",
  },

  confirmButton: {
    marginTop: 40,
    backgroundColor: "#ccc",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileEdit;
