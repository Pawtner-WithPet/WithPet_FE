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
import icon_detail_page from '../../../assets/icons/icon_detail_page.png';
import enter_image from '../../../assets/icons/enter_image.png';
import icon_calendar from '../../../assets/icons/icon_calendar.png';
import Header from '../../../components/Header';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { LostStackParamList } from '../../../navigation/LostStack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';




const LostPetRegister: React.FC = () => {
  const navigation = useNavigation<any>();

  const [profileUri, setProfileUri] = useState<string | null>(null);

  const [gender, setGender] = useState<'male' | 'female' | 'unknown' | null>(null);
  const [breed, setBreed] = useState('');
  const [noseUri, setNoseUri] = useState<string | null>(null);

  const [date, setDate] = useState<Date | null>(null);
  const [hour, setHour] = useState('0');
  const [minute, setMinute] = useState('0');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');

  const [description, setDescription] = useState('');

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
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={icon_detail_page} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>발견동물 등록</Text>
        </View>

        {/* 프로필 */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImageWrapper}>
            <View style={styles.petImage}>
              {profileUri ? (
                <Image source={{ uri: profileUri }} style={styles.petImageIcon} />
              ) : (
                <Image source={enter_image} style={styles.enterImageIcon} />
              )}
            </View>
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => {
                launchImageLibrary({ mediaType: 'photo' }, (response) => {
                  if (response.assets && response.assets.length > 0) {
                    setProfileUri(response.assets[0].uri || null);
                  }
                });
              }}
            >
              <Image source={icon_camera} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 성별 */}
        <Text style={styles.label}>성별</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.selectBox,
                gender === 'male' && styles.selectedBox,
              ]}
              onPress={() => setGender('male')}
            >
              <Text style={[styles.selectText, gender === 'male' && styles.selectedText]}>
                수컷
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.selectBox,
                gender === 'female' && styles.selectedBox,
              ]}
              onPress={() => setGender('female')}
            >
              <Text style={[styles.selectText, gender === 'female' && styles.selectedText]}>
                암컷
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.selectBox,
                gender === 'unknown' && styles.selectedBox,
              ]}
              onPress={() => setGender('unknown')}
            >
              <Text style={[styles.selectText, gender === 'unknown' && styles.selectedText]}>
                불명확
              </Text>
            </TouchableOpacity>
          </View>



        <LabelInput label="견종" value={breed} onChangeText={setBreed} />

        {/* 비문 */}
        <Text style={styles.label}>비문</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.noseBtn}
              onPress={() => {
                navigation.navigate('NoseCamera', { fromScreen: 'LostPetRegister' });
              }}
            >
              <Text style={styles.noseBtnText}>비문 등록하기</Text>
              <Image source={icon_camera} style={styles.iconSm} />
            </TouchableOpacity>

            {noseUri && (
              <View style={[styles.noseBtnDisabled, noseUri && styles.noseBtnActive]}>
                <Text style={[styles.noseDoneText, noseUri && styles.noseDoneTextActive]}>등록완료</Text>
              </View>
            )}

            {renderClear(noseUri ?? '', () => setNoseUri(null))}
          </View>




        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 실종 정보 */}
        <Text style={styles.sectionHeader}>발견 정보</Text>
        <Text style={styles.label}>발견 일시</Text>
        <View style={styles.datetimeRow}>
          {/* 날짜 선택 */}
          <TouchableOpacity style={styles.dateBox} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>
              {date ? `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.` : '날짜 선택'}
            </Text>
            <Image source={icon_calendar} style={styles.calendarIcon} />
          </TouchableOpacity>

          {/* 시 선택 */}
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={hour}
              onValueChange={(val) => setHour(val)}
              dropdownIconColor="#000"
            >
              {[...Array(24).keys()].map(h => (
                <Picker.Item key={h} label={`${h}`} value={`${h}`} />
              ))}
            </Picker>
          </View>
          <Text style={styles.timeLabel}>시</Text>

          {/* 분 선택 */}
          <View style={styles.pickerBox}>
            <Picker selectedValue={minute} onValueChange={(val) => setMinute(val)}>
              {[...Array(60).keys()].map(m => (
                <Picker.Item key={m} label={`${m}`} value={`${m}`} />
              ))}
            </Picker>
          </View>
          <Text style={styles.timeLabel}>분</Text>
        </View>


        <LabelInput label="발견 장소" value={location} onChangeText={setLocation} />
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
  container: { 
    flex: 1, 
    backgroundColor: Colors.background
  },
  scrollContainer: { 
    padding: 20 
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    marginBottom: 20,
  },
  backButton: { marginRight: 90 },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    transform: [{ scaleX: -1 }], 
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  profileContainer: { alignItems: 'center', marginBottom: 20 },
  profileImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#EEE',
    borderRadius: 100,
  },
  petImage: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  petImageIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  enterImageIcon:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 20,
    padding: 6,
  },
  cameraIcon: { width: 28, height: 28 },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 10 
  },
  label: { 
    fontSize: 18, 
    marginBottom: 6, 
    fontWeight: 'bold',
    color: '#333' 
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  input: { flex: 1, padding: 12, fontSize: 14 },
  clearIcon: { width: 16, height: 16, marginLeft: 8 },
  selectBox: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectText: { fontSize: 14, color: '#333' },
  selectedBox: { backgroundColor: '#4262FF' },
  selectedText: { color: '#fff', fontWeight: 'bold' },
  noseBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  noseBtnDisabled: {
    flex: 1,
    backgroundColor: '#979696',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noseBtnActive: { backgroundColor: '#4262FF' },
  noseDoneTextActive: { color: '#fff', fontWeight: 'bold' },
  iconSm: { width: 30, height: 30, tintColor: '#979696' },
  noseBtnText: { padding:12, color: '#979696', fontSize: 14 },
  noseDoneText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
  },
  datetimeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
  },
  dateText: { fontSize: 14, color: '#333', marginRight: 6 },
  calendarIcon: { width: 16, height: 16, tintColor: '#999' },
  pickerBox: {
    width: 100,
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: { width: '100%', height: 40, color: '#333' },
  timeLabel: { fontSize: 14, color: '#333', marginHorizontal: 4 },
  divider: { borderBottomColor: '#ccc', borderBottomWidth: 1, marginVertical: 20 },
  submitBtn: {
    backgroundColor: '#4262FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});


export default LostPetRegister;
