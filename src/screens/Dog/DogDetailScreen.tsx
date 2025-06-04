import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { CustomInput } from "../../components/InputField";
import { DisabledInput } from "../../components/DisableInput";
import { SelectButton } from "../../components/SelectBtn";
import { ProfileImagePicker } from "../../components/ImageUploader";
import { BiometricSection } from "../../components/NoseSelect";

interface PetInfo {
  name: string;
  age: string;
  breed: string;
  gender: string;
  registrationNumber: string;
  rfidCode: string;
  organization: string;
  phoneNumber: string;
  features: string;
  neutered: string;
  profileImage?: string;
}

const DogDetailScreen: React.FC = () => {
  const [petInfo, setPetInfo] = useState<PetInfo>({
    name: "해피",
    age: "2",
    breed: "골든 리트리버",
    gender: "male",
    registrationNumber: "1234567890",
    rfidCode: "RFID-00112233",
    organization: "서울 동물보호센터",
    phoneNumber: "02-123-4567",
    features: "",
    neutered: "yes",
    profileImage: undefined,
  });

  const [errors, setErrors] = useState<Partial<PetInfo>>({});

  const handleImageSelected = (uri: string) => {
    setPetInfo((prev) => ({
      ...prev,
      profileImage: uri,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PetInfo> = {};
    if (!petInfo.features.trim()) {
      newErrors.features = "특징을 입력해주세요.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      Alert.alert("저장 완료", "반려견 정보가 저장되었습니다.", [
        {
          text: "확인",
          onPress: () => console.log("Pet info saved:", petInfo),
        },
      ]);
    } else {
      Alert.alert("입력 오류", "필수 항목을 모두 입력해주세요.");
    }
  };

  const handleBiometricRegister = () => {
    Alert.alert("비문 등록", "비문 등록 기능이 실행됩니다.");
  };

  const handleBiometricVerify = () => {
    Alert.alert("비문 확인", "비문 확인 기능이 실행됩니다.");
  };

  const genderOptions = [
    { label: "수컷", value: "male" },
    { label: "암컷", value: "female" },
  ];

  const neuteredOptions = [
    { label: "중성화 실시", value: "yes" },
    { label: "중성화 미실시", value: "no" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>반려견 상세 정보 입력</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* 프로필 + 이름 + 나이 */}
          <View style={styles.profileSection}>
            <ProfileImagePicker
              imageUri={petInfo.profileImage}
              onImageSelected={handleImageSelected}
            />
            <View style={styles.nameAgeWrapper}>
              <DisabledInput
                label="이름"
                placeholder="해피"
                value={petInfo.name}
                required
              />
              <DisabledInput
                label="나이"
                placeholder="2세"
                value={petInfo.age}
                required
              />
            </View>
          </View>

          {/* 견종 (비활성화) */}
          <DisabledInput
            label="견종"
            placeholder="골든 리트리버"
            value={petInfo.breed}
            required
          />

          {/* 성별 (수정 불가 SelectButton 스타일) */}
          <SelectButton
            label="성별"
            options={genderOptions}
            selectedValue={petInfo.gender}
            onSelect={() => {}}
            disabled
            required
          />

          {/* 동물등록번호 (비활성화) */}
          <DisabledInput
            label="동물등록번호"
            placeholder=""
            value={petInfo.registrationNumber}
            required
          />

          {/* RFID_CD코드 (비활성화) */}
          <DisabledInput
            label="RFID_CD코드"
            placeholder=""
            value={petInfo.rfidCode}
            required
          />

          {/* 담당기관명 (비활성화) */}
          <DisabledInput
            label="담당기관명"
            placeholder=""
            value={petInfo.organization}
            required
          />

          {/* 담당기관 전화번호 (비활성화) */}
          <DisabledInput
            label="담당기관 전화번호"
            placeholder=""
            value={petInfo.phoneNumber}
            required
          />

          {/* 특징 */}
          <CustomInput
            label="특징"
            placeholder="골든 리트리버"
            value={petInfo.features}
            onChangeText={(value) =>
              setPetInfo((prev) => ({ ...prev, features: value }))
            }
            multiline
            numberOfLines={4}
            style={styles.textArea}
            required
            error={errors.features}
          />

          {/* 중성화 여부 (수정 불가 SelectButton 스타일) */}
          <SelectButton
            label="중성화 여부"
            options={neuteredOptions}
            selectedValue={petInfo.neutered}
            onSelect={() => {}}
            disabled
            required
          />

          {/* 비문 정보 */}
          <BiometricSection
            onRegister={handleBiometricRegister}
            onVerify={handleBiometricVerify}
          />
        </View>
      </ScrollView>

      {/* 저장 버튼 */}
      <View style={styles.bottomButton}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    backgroundColor: "#ffffff",
    margin: 16,
    borderRadius: 12,
    padding: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  nameAgeWrapper: {
    flex: 1,
    marginLeft: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: -16,
    marginBottom: 16,
    marginLeft: 4,
  },
  bottomButton: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  saveButton: {
    backgroundColor: "#1f2937",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DogDetailScreen;
