import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Colors } from '../../../constants/colors';
import icon_camera from '../../../assets/icons/camera.png';
import icon_close from '../../../assets/icons/icon_close.png';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { LostStackParamList } from '../../../navigation/LostStack';
import Header from '../../../components/Header';

const LostPetRegister: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LostStackParamList>>();

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [feature, setFeature] = useState('');
  const [location, setLocation] = useState('');
  const [familiar, setFamiliar] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>실종동물 등록</Text>

        {/* 프로필 이미지 */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImageWrapper}>
            <View style={styles.petImage} />
            <TouchableOpacity style={styles.cameraButton}>
              <Image source={icon_camera} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 이름 */}
        <LabelInput
          label="이름"
          value={name}
          onChangeText={setName}
          placeholder="이름"
        />

        {/* 성별 */}
        <Text style={styles.label}>성별</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.selectBox}><Text>수컷</Text></TouchableOpacity>
          <TouchableOpacity style={styles.selectBox}><Text>암컷</Text></TouchableOpacity>
        </View>

        {/* 나이/신장/체중 */}
        <Text style={styles.label}>나이 / 신장 / 체중</Text>
        <View style={styles.row}>
          <TextInput style={styles.inputSmall} placeholder="0 세" keyboardType="numeric" />
          <TextInput style={styles.inputSmall} placeholder="0 cm" keyboardType="numeric" />
          <TextInput style={styles.inputSmall} placeholder="0 kg" keyboardType="numeric" />
        </View>

        {/* 견종 */}
        <LabelInput
          label="견종"
          value={breed}
          onChangeText={setBreed}
          placeholder="견종"
        />

        {/* 비문 */}
        <Text style={styles.label}>비문</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.noseBtn}>
            <Text>비문 등록하기</Text>
            <Image source={icon_camera} style={styles.iconSm} />
          </TouchableOpacity>
          <View style={styles.noseBtnDisabled}>
            <Text style={{ color: '#fff' }}>등록완료</Text>
          </View>
        </View>

        {/* 특징 */}
        <LabelInput
          label="특징"
          value={feature}
          onChangeText={setFeature}
          placeholder="특징"
        />

        {/* 실종 정보 */}
        <Text style={styles.sectionHeader}>실종 정보</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.datePicker}><Text>실종 날짜</Text></TouchableOpacity>
          <TextInput style={styles.inputTiny} placeholder="시" keyboardType="numeric" />
          <TextInput style={styles.inputTiny} placeholder="분" keyboardType="numeric" />
        </View>

        {/* 실종 장소 */}
        <LabelInput
          label="실종 장소"
          value={location}
          onChangeText={setLocation}
          placeholder="특징"
        />

        {/* 익숙한 장소 */}
        <LabelInput
          label="익숙한 장소"
          value={familiar}
          onChangeText={setFamiliar}
          placeholder="익숙한 장소1, 장소2"
        />

        {/* 추가 설명 */}
        <LabelInput
          label="추가 설명"
          value={description}
          onChangeText={setDescription}
          placeholder="추가설명"
        />

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>등록하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const LabelInput = ({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Image source={icon_close} style={styles.clearIcon} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContainer: { padding: 20 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 16,
  },
  label: { fontSize: 14, marginBottom: 6, color: '#333' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  clearIcon: { width: 16, height: 16, tintColor: '#999', marginLeft: 8 },
  inputSmall: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 4,
  },
  inputTiny: {
    width: 60,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    textAlign: 'center',
  },
  selectBox: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  noseBtn: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  noseBtnDisabled: {
    flex: 1,
    backgroundColor: '#aaa',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePicker: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: '#3366FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageWrapper: {
    position: 'relative',
  },
  petImage: {
    width: 100,
    height: 100,
    backgroundColor: '#EEE',
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
  },
  cameraIcon: {
    width: 16,
    height: 16,
    tintColor: '#333',
  },

  iconSm: {
    width: 16,
    height: 16,
    tintColor: '#333',
    marginLeft: 6,
  },
});

export default LostPetRegister;
