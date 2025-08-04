import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { Colors } from '../../../constants/colors';
import icon_camera from '../../../assets/icons/camera.png';
import icon_close from '../../../assets/icons/icon_close.png';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { LostStackParamList } from '../../../navigation/LostStack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';

const LostPetRegister: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LostStackParamList>>();

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [feature, setFeature] = useState('');
  const [location, setLocation] = useState('');
  const [familiar, setFamiliar] = useState('');
  const [description, setDescription] = useState('');

  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [date, setDate] = useState<Date | null>(null);
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const renderClear = (value: string, clearFn: () => void) => (
    value.length > 0 ? (
      <TouchableOpacity onPress={clearFn}>
        <Image source={icon_close} style={styles.clearIcon} />
      </TouchableOpacity>
    ) : null
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>실종동물 등록</Text>

        {/* 프로필 */}
        <View style={styles.profileSection}>
          <View style={styles.profileCircle} />
          <TouchableOpacity style={styles.cameraOverlay}>
            <Image source={icon_camera} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>

        {/* 이름 */}
        <LabelInput label="이름" value={name} onChangeText={setName} />

        {/* 성별 */}
        <Text style={styles.label}>성별</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.selectBox}><Text>수컷</Text></TouchableOpacity>
          <TouchableOpacity style={styles.selectBox}><Text>암컷</Text></TouchableOpacity>
        </View>

        {/* 나이/신장/체중 */}
        <Text style={styles.label}>나이 / 신장 / 체중</Text>
        <View style={styles.row}>
          <InputWithClear value={age} setValue={setAge} placeholder="0 세" />
          <InputWithClear value={height} setValue={setHeight} placeholder="0 cm" />
          <InputWithClear value={weight} setValue={setWeight} placeholder="0 kg" />
        </View>

        <LabelInput label="견종" value={breed} onChangeText={setBreed} />

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

        <LabelInput label="특징" value={feature} onChangeText={setFeature} />

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 실종 정보 */}
        <Text style={styles.sectionHeader}>실종 정보</Text>
        <Text style={styles.label}>실종 일시</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
            <Text>{date ? date.toLocaleDateString() : '실종 날짜'}</Text>
          </TouchableOpacity>
          <Picker style={styles.picker} selectedValue={hour} onValueChange={setHour}>
            {[...Array(24).keys()].map(h => (
              <Picker.Item key={h} label={`${h} 시`} value={String(h)} />
            ))}
          </Picker>
          <Picker style={styles.picker} selectedValue={minute} onValueChange={setMinute}>
            {[...Array(60).keys()].map(m => (
              <Picker.Item key={m} label={`${m} 분`} value={String(m)} />
            ))}
          </Picker>
        </View>

        <LabelInput label="실종 장소" value={location} onChangeText={setLocation} />
        <LabelInput label="익숙한 장소" value={familiar} onChangeText={setFamiliar} />
        <LabelInput label="추가 설명" value={description} onChangeText={setDescription} />

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>등록하기</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 날짜 선택 모달 */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(date) => {
          setDate(date);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
      />
    </View>
  );
};

const LabelInput = ({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={label} />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <Image source={icon_close} style={styles.clearIcon} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const InputWithClear = ({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: (val: string) => void;
  placeholder: string;
}) => (
  <View style={[styles.inputWrapper, { flex: 1, marginHorizontal: 4 }]}>
    <TextInput
      style={[styles.input, { flex: 1 }]}
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      keyboardType="numeric"
    />
    {value.length > 0 && (
      <TouchableOpacity onPress={() => setValue('')}>
        <Image source={icon_close} style={styles.clearIcon} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContainer: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  profileSection: { alignItems: 'center', marginBottom: 20 },
  profileCircle: { width: 100, height: 100, backgroundColor: '#EEE', borderRadius: 50 },
  cameraOverlay: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
  },
  cameraIcon: { width: 16, height: 16, tintColor: '#333' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontSize: 14, marginBottom: 6, color: '#333' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  input: { flex: 1, padding: 12, fontSize: 14 },
  clearIcon: { width: 16, height: 16, tintColor: '#999', marginLeft: 8 },
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
  iconSm: { width: 16, height: 16, tintColor: '#333', marginLeft: 6 },
  datePicker: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 6,
  },
  picker: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 4,
    borderRadius: 10,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 20,
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
});

export default LostPetRegister;
