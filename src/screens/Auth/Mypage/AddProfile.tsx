import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import iconBack from "../../../assets/icons/icon_detail_page.png";
import iconCamera from "../../../assets/icons/camera.png";
import happy1 from "../../../assets/images/happy1.png";

const AddProfile: React.FC = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState("");

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={iconBack} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>프로필 추가 정보</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* 내용 */}
      <View style={styles.content}>
        <Text style={styles.label}>프로필 설정</Text>

        {/* 프로필 이미지 */}
        <View style={styles.profileWrapper}>
          <Image source={happy1} style={styles.profileImage} />
          <TouchableOpacity style={styles.cameraIconWrapper}>
            <Image source={iconCamera} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>

        {/* 닉네임 입력 */}
        <Text style={styles.inputLabel}>사용자 닉네임</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="닉네임 입력"
        />
        <Text style={styles.hint}>4~15자의 영어 또는 숫자 조합</Text>

        {/* 확인 버튼 */}
        <TouchableOpacity
          style={[
            styles.submitBtn,
            { backgroundColor: nickname.trim() ? "#4262FF" : "#ccc" },
          ]}
          disabled={!nickname.trim()}
        >
          <Text style={styles.submitText}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
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
    paddingHorizontal: 24,
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    marginTop: 20,
    fontSize: 13,
    color: "#999",
  },
  profileWrapper: {
    position: "relative",
    marginTop: 8,
    marginBottom: 20,
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
  inputLabel: {
    alignSelf: "flex-start",
    fontSize: 13,
    marginBottom: 6,
    color: "#111",
  },
  input: {
    width: "100%",
    height: 46,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  hint: {
    alignSelf: "flex-start",
    marginTop: 6,
    fontSize: 12,
    color: "#4262FF",
  },
  submitBtn: {
    marginTop: 30,
    backgroundColor: "#4262FF",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddProfile;
