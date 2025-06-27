import React, { useState, useEffect  } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert, } from "react-native";
import { CustomInput } from "../../components/PetDetail/InputField";
import { DisabledInput } from "../../components/PetDetail/DisableInput";
import { SelectButton } from "../../components/PetDetail/SelectBtn";
import { ProfileImagePicker } from "../../components/PetDetail/ImageUploader";
import { NoseSelect } from "../../components/PetDetail/NoseSelect";
import Header from "../../components/Header";
import { getPetDetail, registerPet } from '../../services/api/petListService';

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

  //임시
  const petId = 1;
  useEffect(() => {
  const fetchData = async () => {
    try {
      const existing = await getPetDetail(petId);

      if (existing?.dogRegNo) {
        console.log("✅ 이미 등록된 반려견입니다.");
      } else {
        console.log("🚀 등록되지 않은 반려견 → 등록 시도");

        await registerPet({
          dogRegNo: "410100008128355",
          rfidCd: "410100008128355",
          ownerNm: "김지선",
          ownerBirth: "770505",
          userId: 1,
        });

        console.log("✅ 등록 완료");
      }
      const data = await getPetDetail(petId); 

      setPetInfo({
        name: data.dogNm,
        age: String(data.dogAge),
        breed: data.kindNm,
        gender: data.sexNm === "암컷" ? "female" : "male",
        registrationNumber: data.dogRegNo,
        rfidCode: data.rfidCd || "",
        organization: data.orgNm || "",
        phoneNumber: data.officeTel || "",
        features: data.features || "",
        neutered: data.neuterYn === "Y" ? "yes" : "no",
        profileImage: data.dogImg || undefined,
      });

      console.log("✅ API 응답 성공:", data);
    } catch (err) {
      console.error("❌ API 실패:", err);
      Alert.alert("불러오기 실패", "반려견 정보를 불러오지 못했습니다.");
    }
  };

  fetchData();
}, []);
  

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
      <Header />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
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

          <DisabledInput
            label="견종"
            placeholder="골든 리트리버"
            value={petInfo.breed}
            required
          />

          <SelectButton
            label="성별"
            options={genderOptions}
            selectedValue={petInfo.gender}
            onSelect={() => {}}
            disabled
            required
          />

          <DisabledInput
            label="동물등록번호"
            value={petInfo.registrationNumber}
            required
          />
          <DisabledInput
            label="RFID_CD코드"
            value={petInfo.rfidCode}
            required
          />
          <DisabledInput
            label="담당기관명"
            value={petInfo.organization}
            required
          />
          <DisabledInput
            label="담당기관 전화번호"
            value={petInfo.phoneNumber}
            required
          />

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

          <SelectButton
            label="중성화 여부"
            options={neuteredOptions}
            selectedValue={petInfo.neutered}
            onSelect={() => {}}
            disabled
            required
          />

          <NoseSelect
            onRegister={handleBiometricRegister}
            onVerify={handleBiometricVerify}
          />
        </View>
      </ScrollView>
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
