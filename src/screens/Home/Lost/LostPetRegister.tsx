import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../../../constants/colors";
import icon_camera from "../../../assets/icons/camera.png";
import icon_close from "../../../assets/icons/icon_close.png";
import icon_detail_page from "../../../assets/icons/icon_detail_page.png";
import enter_image from "../../../assets/icons/enter_image.png";
import icon_calendar from "../../../assets/icons/icon_calendar.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary } from "react-native-image-picker";

import type { LostStackParamList } from "../../../navigation/LostStack";
import { postLostPost, type LostPostRequest } from "../../../services/api/LostPost";

const LostPetRegister: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LostStackParamList>>();
  const route = useRoute<any>();

  // 업로드에 사용될 이미지 (프로필 이미지로 선택)
  const [profileUri, setProfileUri] = useState<string | null>(null);

  // 폼 상태
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [breed, setBreed] = useState("");
  const [noseUri, setNoseUri] = useState<string | null>(null);
  const [feature, setFeature] = useState("");

  const [date, setDate] = useState<Date | null>(null);
  const [hour, setHour] = useState("0");
  const [minute, setMinute] = useState("0");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [location, setLocation] = useState("");
  const [familiar, setFamiliar] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    console.log("[MOUNT] LostPetRegister mounted");
  }, []);

  // 데모용 자동 채우기 (네가 쓰던 로직 유지)
  useEffect(() => {
    if (route.params?.petName === "곰탱이") {
      setName("곰탱이");
      setGender("female");
      setAge("1");
      setBreed("포메라니안");
    }
  }, [route.params?.petName]);

  const toLocalIsoSeconds = (d: Date) => {
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
  };

  const buildLostDate = (): string | null => {
    if (!date) return null;
    const h = parseInt(hour || "0", 10) || 0;
    const m = parseInt(minute || "0", 10) || 0;
    const composed = new Date(date);
    composed.setHours(h, m, 0, 0);
    return toLocalIsoSeconds(composed);
  };

  const parseNum = (s: string) => {
    const n = Number(s);
    return Number.isFinite(n) ? n : undefined;
  };

  const onPressRegisterLost = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      Alert.alert("확인", "등록 버튼 onPress 호출됨"); // 눌림이 보이도록

      // 간단 유효성 체크
      const lostDateIso = buildLostDate();
      if (!lostDateIso) {
        Alert.alert("입력 필요", "실종 날짜/시간을 선택해 주세요.");
        return;
      }
      if (!location.trim()) {
        Alert.alert("입력 필요", "실종 장소를 입력해 주세요.");
        return;
      }

      // 서버 스키마에 맞춘 payload
      const req: LostPostRequest = {
        owner: 14,         // TODO: 실제 로그인 사용자 ID로 교체
        pet: 2,            // TODO: 실제 반려견 ID로 교체
        height: parseNum(height),
        weight: parseNum(weight),
        lostDate: lostDateIso,
        lostLocation: location.trim(),
        favoritePlace: familiar.trim() || undefined,
        description: description.trim() || undefined,
      };

      const img = profileUri
        ? { uri: profileUri, name: "lost.jpg", type: "image/jpeg" }
        : undefined;

      console.log("➡️[FORM] /api/search/lostPost request:", req, "image:", !!img);
      const res = await postLostPost(req, img);
      console.log("✅ 등록 성공:", res);

      Alert.alert("등록 완료", "실종 게시글이 등록되었습니다.", [
        {
          text: "확인",
          onPress: () => {
            if (navigation.canGoBack()) navigation.goBack();
            else (navigation as any).navigate("LostPetListScreen");
          },
        },
      ]);
    } catch (e) {
      console.error("❌ 등록 실패:", e);
      Alert.alert("오류", "등록에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderClear = (value: string, clearFn: () => void) =>
    value.length > 0 ? (
      <TouchableOpacity onPress={clearFn}>
        <Image source={icon_close} style={styles.clearIcon} />
      </TouchableOpacity>
    ) : null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 헤더 */}
        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={icon_detail_page} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>실종동물 등록</Text>
        </View>

        {/* 프로필 이미지 (업로드 대상) */}
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
                launchImageLibrary({ mediaType: "photo" }, (response) => {
                  const uri = response.assets?.[0]?.uri || null;
                  setProfileUri(uri);
                });
              }}
            >
              <Image source={icon_camera} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 이름 */}
        <LabelInput label="이름" value={name} onChangeText={setName} />

        {/* 성별 */}
        <Text style={styles.label}>성별</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.selectBox, gender === "male" && styles.selectedBox]}
            onPress={() => setGender("male")}
          >
            <Text style={[styles.selectText, gender === "male" && styles.selectedText]}>수컷</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selectBox, gender === "female" && styles.selectedBox]}
            onPress={() => setGender("female")}
          >
            <Text style={[styles.selectText, gender === "female" && styles.selectedText]}>암컷</Text>
          </TouchableOpacity>
        </View>

        {/* 나이/신장/체중 */}
        <View style={styles.row}>
          <View style={styles.field}>
            <Text style={styles.label}>나이</Text>
            <InputWithClear value={age} setValue={setAge} placeholder="0 세" />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>신장</Text>
            <InputWithClear value={height} setValue={setHeight} placeholder="0 cm" />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>체중</Text>
            <InputWithClear value={weight} setValue={setWeight} placeholder="0 kg" />
          </View>
        </View>

        <LabelInput label="견종" value={breed} onChangeText={setBreed} />

        {/* 비문 */}
        <Text style={styles.label}>비문</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.noseBtn}
            onPress={() => {
              launchImageLibrary({ mediaType: "photo" }, (response) => {
                const uri = response.assets?.[0]?.uri || null;
                setNoseUri(uri);
              });
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

          {renderClear(noseUri ?? "", () => setNoseUri(null))}
        </View>

        <LabelInput label="특징" value={feature} onChangeText={setFeature} />

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 실종 정보 */}
        <Text style={styles.sectionHeader}>실종 정보</Text>
        <Text style={styles.label}>실종 일시</Text>
        <View style={styles.datetimeRow}>
          {/* 날짜 */}
          <TouchableOpacity style={styles.dateBox} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>
              {date ? `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.` : "날짜 선택"}
            </Text>
            <Image source={icon_calendar} style={styles.calendarIcon} />
          </TouchableOpacity>

          {/* 시간(시/분) */}
          <View style={styles.pickerBox}>
            <Picker selectedValue={hour} onValueChange={(val) => setHour(val)} dropdownIconColor="#000">
              {[...Array(24).keys()].map((h) => (
                <Picker.Item key={h} label={`${h}`} value={`${h}`} />
              ))}
            </Picker>
          </View>
          <Text style={styles.timeLabel}>시</Text>

          <View style={styles.pickerBox}>
            <Picker selectedValue={minute} onValueChange={(val) => setMinute(val)}>
              {[...Array(60).keys()].map((m) => (
                <Picker.Item key={m} label={`${m}`} value={`${m}`} />
              ))}
            </Picker>
          </View>
          <Text style={styles.timeLabel}>분</Text>
        </View>

        <LabelInput label="실종 장소" value={location} onChangeText={setLocation} />
        <LabelInput label="익숙한 장소" value={familiar} onChangeText={setFamiliar} />
        <LabelInput label="추가 설명" value={description} onChangeText={setDescription} />

        {/* 등록 버튼 */}
        <TouchableOpacity
          onPress={onPressRegisterLost}
          disabled={submitting}
          style={[
            styles.submitBtn,
            { backgroundColor: submitting ? "#999" : "#4262FF" },
          ]}
        >
          <Text style={styles.submitText}>{submitting ? "등록 중..." : "등록하기"}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 날짜 선택 모달 */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={(d) => {
          setDate(d);
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
        <TouchableOpacity onPress={() => onChangeText("")}>
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
      <TouchableOpacity onPress={() => setValue("")}>
        <Image source={icon_close} style={styles.clearIcon} />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContainer: { padding: 20 },
  headerWrapper: { flexDirection: "row", alignItems: "center", paddingTop: 12, marginBottom: 20 },
  backButton: { marginRight: 90 },
  backIcon: { width: 40, height: 40, resizeMode: "contain", transform: [{ scaleX: -1 }] },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#1A1A1A" },

  profileContainer: { alignItems: "center", marginBottom: 20 },
  profileImageWrapper: { alignItems: "center", justifyContent: "center", width: 120, height: 120, backgroundColor: "#EEE", borderRadius: 100 },
  petImage: { width: 120, height: 120, alignItems: "center", justifyContent: "center", borderRadius: 100 },
  petImageIcon: { width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 },
  enterImageIcon: { alignItems: "center", justifyContent: "center", width: 70, height: 70, resizeMode: "contain" },
  cameraButton: { position: "absolute", bottom: 0, right: 0, backgroundColor: "#000", borderRadius: 20, padding: 6 },
  cameraIcon: { width: 28, height: 28 },

  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  label: { fontSize: 18, marginBottom: 6, fontWeight: "bold", color: "#333" },
  field: { flex: 1, marginHorizontal: 4 },

  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#F3F4F6", borderRadius: 10, paddingHorizontal: 12 },
  input: { flex: 1, padding: 12, fontSize: 14 },
  clearIcon: { width: 16, height: 16, marginLeft: 8 },

  selectBox: { flex: 1, backgroundColor: "#F3F4F6", padding: 12, borderRadius: 10, alignItems: "center", marginHorizontal: 4 },
  selectText: { fontSize: 14, color: "#333" },
  selectedBox: { backgroundColor: "#4262FF" },
  selectedText: { color: "#fff", fontWeight: "bold" },

  noseBtn: { flex: 1, backgroundColor: "#F3F4F6", borderRadius: 10, flexDirection: "row", justifyContent: "center", alignItems: "center", marginRight: 6 },
  noseBtnDisabled: { flex: 1, backgroundColor: "#979696", padding: 12, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  noseBtnActive: { backgroundColor: "#4262FF" },
  noseDoneText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  noseDoneTextActive: { color: "#fff", fontWeight: "bold" },
  iconSm: { width: 30, height: 30, tintColor: "#979696" },
  noseBtnText: { padding: 12, color: "#979696", fontSize: 14 },

  sectionHeader: { fontSize: 20, fontWeight: "bold", marginTop: 16, marginBottom: 6 },

  datetimeRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  dateBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#F5F5F5", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginRight: 8 },
  dateText: { fontSize: 14, color: "#333", marginRight: 6 },
  calendarIcon: { width: 16, height: 16, tintColor: "#999" },

  pickerBox: { width: 100, height: 44, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, backgroundColor: "#fff", justifyContent: "center", overflow: "hidden" },
  timeLabel: { fontSize: 14, color: "#333", marginHorizontal: 4 },

  divider: { borderBottomColor: "#ccc", borderBottomWidth: 1, marginVertical: 20 },

  submitBtn: { paddingVertical: 16, borderRadius: 12, alignItems: "center", marginTop: 20, marginBottom: 30 },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default LostPetRegister;
