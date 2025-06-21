import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import { registerPet } from '../../services/api/doginfo';
import type { PetRegisterRequest } from '../../types/pet';

const PetRegisterScreen = () => {
  const [form, setForm] = useState<PetRegisterRequest>({
    name: '',
    age: 0,
    gender: '수컷',
    breed: '',
    regNumber: '',
    rfidCode: '',
    rfidType: '',
    orgName: '',
    orgPhone: '',
    feature: '',
  });

  const token = 'YOUR_FAKE_TOKEN'; // 나중에 실제 토큰으로 교체

  const handleChange = (key: keyof PetRegisterRequest, value: string | number) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const result = await registerPet(form, token);
      Alert.alert('등록 성공', `반려견 ID: ${result.data.id}`);
    } catch (error) {
      console.error(error);
      Alert.alert('등록 실패', '입력값을 확인해주세요');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>반려견 등록</Text>

      <TextInput style={styles.input} placeholder="이름" onChangeText={(text) => handleChange('name', text)} />
      <TextInput style={styles.input} placeholder="나이" keyboardType="numeric" onChangeText={(text) => handleChange('age', parseInt(text) || 0)} />
      <TextInput style={styles.input} placeholder="성별 (수컷/암컷)" onChangeText={(text) => handleChange('gender', text)} />
      <TextInput style={styles.input} placeholder="견종" onChangeText={(text) => handleChange('breed', text)} />
      <TextInput style={styles.input} placeholder="동물등록번호" onChangeText={(text) => handleChange('regNumber', text)} />
      <TextInput style={styles.input} placeholder="RFID 코드" onChangeText={(text) => handleChange('rfidCode', text)} />
      <TextInput style={styles.input} placeholder="RFID 구분" onChangeText={(text) => handleChange('rfidType', text)} />
      <TextInput style={styles.input} placeholder="담당기관명" onChangeText={(text) => handleChange('orgName', text)} />
      <TextInput style={styles.input} placeholder="담당기관 전화번호" keyboardType="phone-pad" onChangeText={(text) => handleChange('orgPhone', text)} />
      <TextInput style={styles.input} placeholder="특징" onChangeText={(text) => handleChange('feature', text)} />

      <Button title="등록하기" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default PetRegisterScreen;
