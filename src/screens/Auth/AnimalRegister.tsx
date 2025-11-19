import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import CustomHeader from "../../components/Auth/AnimalRegister/CustomHeader";
import SystemDropdown from "../../components/Auth/AnimalRegister/SystemDropdown";
import InputField from "../../components/Auth/AnimalRegister/InputField";
import ConfirmBtn from "../../components/Auth/AnimalRegister/ConfirmBtn";

const AnimalRegister: React.FC = () => {
  const [animalNumber, setAnimalNumber] = useState("");
  const [rfidCode, setRfidCode] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleConfirm = () => {
    console.log("확인 버튼 클릭");
    console.log({
      animalNumber,
      rfidCode,
      ownerName,
      birthDate,
    });
  };

  const clearField = (field: string) => {
    switch (field) {
      case "animalNumber":
        setAnimalNumber("");
        break;
      case "rfidCode":
        setRfidCode("");
        break;
      case "ownerName":
        setOwnerName("");
        break;
      case "birthDate":
        setBirthDate("");
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="동물등록 확인하기" />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <SystemDropdown />

            <InputField
              label="동물등록번호"
              value={animalNumber}
              onChangeText={setAnimalNumber}
              onClear={() => clearField("animalNumber")}
              placeholder="입력"
            />

            <InputField
              label="RFID 코드"
              value={rfidCode}
              onChangeText={setRfidCode}
              onClear={() => clearField("rfidCode")}
              placeholder="입력"
            />

            <InputField
              label="소유자 성명"
              value={ownerName}
              onChangeText={setOwnerName}
              onClear={() => clearField("ownerName")}
              placeholder="입력"
            />

            <InputField
              label="생년월일"
              value={birthDate}
              onChangeText={setBirthDate}
              onClear={() => clearField("birthDate")}
              placeholder="입력"
            />
          </View>
        </ScrollView>

        <ConfirmBtn onPress={handleConfirm} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
    paddingBottom: 100,
  },
});

export default AnimalRegister;
