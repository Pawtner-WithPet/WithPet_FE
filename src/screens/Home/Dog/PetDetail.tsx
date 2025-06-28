import React, { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { CustomInput } from "../../../components/PetDetail/InputField";
import { DisabledInput } from "../../../components/PetDetail/DisableInput";
import { SelectButton } from "../../../components/PetDetail/SelectBtn";
import { ProfileImagePicker } from "../../../components/PetDetail/ImageUploader";
import { NoseSelect } from "../../../components/PetDetail/NoseSelect";
import Header from "../../../components/Header";
import {
  getPetDetail,
  updatePetDetail,
  uploadPetImage,
} from "../../../services/api/PetDetail";

type PetInfo = {
  name: string;
  age: string;
  breed: string;
  gender: string;
  registrationNumber: string;
  rfidCode: string;
  rfidLocation: string;
  organization: string;
  phoneNumber: string;
  features: string;
  neutered: string;
  profileImage?: string;
};

const PetDetailScreen: React.FC = () => {
  const [petInfo, setPetInfo] = useState<PetInfo>({
    name: "",
    age: "",
    breed: "",
    gender: "",
    registrationNumber: "",
    rfidCode: "",
    rfidLocation: "",
    organization: "",
    phoneNumber: "",
    features: "",
    neutered: "",
    profileImage: undefined,
  });

  const [errors, setErrors] = useState<Partial<PetInfo>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPetDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getPetDetail(1);
        setPetInfo({
          name: data.dogNm,
          age: `${data.dogAge}세`,
          breed: data.kindNm,
          gender: data.sexNm === "암컷" ? "female" : "male",
          registrationNumber: data.dogRegNo,
          rfidCode: data.rfidCd,
          rfidLocation: data.rfidGubun,
          organization: data.orgNm,
          phoneNumber: data.officeTel,
          features: data.features,
          neutered: data.neuterYn === "중성" ? "yes" : "no",
          profileImage: data.dogImg,
        });
      } catch (error) {
        Alert.alert("불러오기 실패", "반려견 정보를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetDetail();
  }, []);

  const handleImageSelected = async (uri: string) => {
    try {
      setIsLoading(true);
      const result = await uploadPetImage(1, uri, 1);
      console.log("✅ 이미지 업로드 완료:", result);
      setPetInfo(prev => ({ ...prev, profileImage: uri }));
    } catch (err) {
      Alert.alert("업로드 실패", "이미지 업로드 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadHappy1 = async () => {
    try {
      setIsLoading(true);
      const asset = Asset.fromModule(require("../../../assets/images/happy1.png"));
      await asset.downloadAsync();
      const fileUri = asset.localUri || asset.uri;
      const result = await uploadPetImage(1, fileUri, 1);
      console.log("✅ 이미지 업로드 성공:", result);
      setPetInfo(prev => ({ ...prev, profileImage: result.dogImg }));
    } catch (err) {
      Alert.alert("이미지 업로드 실패", "서버 전송 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("새로고침 완료", "반려견 정보가 업데이트되었습니다.");
    }, 1500);
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
          onPress: async () => {
            try {
              const payload = { userId: 1, features: petInfo.features };
              const updated = await updatePetDetail(1, payload);
              console.log("Pet info saved:", updated);
            } catch (error) {
              Alert.alert("저장 실패", "서버에 저장하지 못했습니다.");
              console.error("❌ 저장 오류:", error);
            }
          },
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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>반려견 상세 정보 입력</Text>
          <TouchableOpacity onPress={handleRefresh} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#666" />
            ) : (
              <Image source={{ uri: petInfo.profileImage }} style={{ width: 50, height: 50 }} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.profileSection}>
            <ProfileImagePicker imageUri={petInfo.profileImage} onImageSelected={handleImageSelected} />
            <View style={styles.nameAgeWrapper}>
              <DisabledInput label="이름" placeholder="해피" value={petInfo.name} required />
              <DisabledInput label="나이" placeholder="2세" value={petInfo.age} required />
            </View>
          </View>

          <DisabledInput label="견종" placeholder="골든 리트리버" value={petInfo.breed} required />

          <SelectButton
            label="성별"
            options={genderOptions}
            selectedValue={petInfo.gender}
            onSelect={(value: string) => setPetInfo(prev => ({ ...prev, gender: value }))}
            required
            disabled
          />

          <DisabledInput label="동물등록번호" value={petInfo.registrationNumber} required />
          <DisabledInput label="RFID_CD코드" value={petInfo.rfidCode} required />
          <DisabledInput label="RFID 구분" value={petInfo.rfidLocation} required />
          <DisabledInput label="담당기관명" value={petInfo.organization} required />
          <DisabledInput label="담당기관 전화번호" value={petInfo.phoneNumber} required />

          <CustomInput
            label="특징"
            placeholder="골든 리트리버"
            value={petInfo.features}
            onChangeText={(value: string) => setPetInfo(prev => ({ ...prev, features: value }))}
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
            onSelect={(value: string) => setPetInfo(prev => ({ ...prev, neutered: value }))}
            required
            disabled
          />

          <NoseSelect onRegister={handleBiometricRegister} onVerify={handleBiometricVerify} />
        </View>

        <View style={styles.bottomButton}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#101828",
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
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  saveButton: {
    backgroundColor: "#161F40",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PetDetailScreen;
