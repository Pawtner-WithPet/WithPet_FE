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
import icon_detail_page from "../../../assets/icons/icon_detail_page.png"; 
import { launchImageLibrary, type ImageLibraryOptions } from 'react-native-image-picker';



import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MyPageStackParamList } from "../../../navigation/MyPageStack";


const profilePlaceholder = require("../../../assets/icons/enter_image.png");


const ProfileEdit: React.FC = () => {

  const [nickname, setNickname] = useState("닉네임");
  const [profileUri, setProfileUri] = useState<string | null>(null);
  const pickImageFromGallery = async () => {
   const options: ImageLibraryOptions = {
     mediaType: 'photo',
     selectionLimit: 1,
     quality: 0.9, 
   };
   try {
     const res = await launchImageLibrary(options);
     if (res.didCancel) return; 
     if (res.errorCode) {
       console.warn('[ImagePicker]', res.errorCode, res.errorMessage);
       return;
     }
     const uri = res.assets?.[0]?.uri;
     if (uri) setProfileUri(uri);
   } catch (e) {
     console.warn('[ImagePicker] unexpected error', e);
   }
};


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
          {profileUri ? (
            <Image source={{ uri: profileUri }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImage}>
              <Image source={profilePlaceholder} style={styles.placeholderIcon} />
            </View>
          )}
          <TouchableOpacity style={styles.cameraIconWrapper} onPress={pickImageFromGallery}>
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
    <Image source={icon_detail_page} style={styles.menuImage} />
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
    marginTop:10,
    marginBottom:30,
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
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderIcon: {
    width: 60,  
    height: 60,
    resizeMode: "contain",
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
    marginBottom: 30,
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
  menuImage:{
    width: 10,
    height: 10,
    tintColor:"#686767"
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
