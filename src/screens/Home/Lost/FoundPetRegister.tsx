import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native"; // 1. [수정] useNavigation 훅 임포트
import { Colors } from "../../../constants/colors";
import icon_camera from "../../../assets/icons/camera.png";
import icon_close from "../../../assets/icons/icon_close.png";
import icon_detail_page from "../../../assets/icons/icon_detail_page.png";
import enter_image from "../../../assets/icons/enter_image.png";
import icon_calendar from "../../../assets/icons/icon_calendar.png";
// Header 컴포넌트가 사용되지 않아 주석 처리합니다.
// import Header from "../../../components/Header"; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary } from "react-native-image-picker";

// ⚠️ [추가] API 함수와 타입을 임포트합니다. 경로는 실제 프로젝트 구조에 맞게 확인하세요.
import { postFoundPost, FoundPostRequest } from "../../../services/api/SearchPet"; 

// [이동] 날짜 ISO 문자열 변환 헬퍼 함수 (컴포넌트 외부에 위치)
const toLocalIsoSeconds = (d: Date) => {
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"
};


const LostPetRegister: React.FC = () => {
  const navigation = useNavigation<any>(); // 2. [수정] navigation 객체 선언

  // --- 상태 정의 ---
  const [profileUri, setProfileUri] = useState<string | null>(null);
  const [gender, setGender] = useState<"male" | "female" | "unknown" | null>(null);
  const [breed, setBreed] = useState("");
  const [noseUri, setNoseUri] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [hour, setHour] = useState("0");
  const [minute, setMinute] = useState("0");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // --- 헬퍼 함수 ---
  
  // 날짜/시간 조합 함수
  const buildFoundDate = (): string | null => {
    if (!date) return null;
    const h = parseInt(hour || "0", 10) || 0;
    const m = parseInt(minute || "0", 10) || 0;
    const composed = new Date(date);
    composed.setHours(h, m, 0, 0);
    return toLocalIsoSeconds(composed);
  };
  
  // [수정] 등록 로직 (API 호출 및 finally 블록 포함)
  const onPressRegisterFound = async () => {
    if (submitting) return;
    setSubmitting(true);
    
    try {
        const foundDateIso = buildFoundDate();
        if (!foundDateIso || !location.trim() || !gender) {
            Alert.alert("입력 필요", "발견 날짜, 장소, 성별을 모두 선택/입력해 주세요.");
            return;
        }

        // FoundPostRequest Payload 구성
        const req: FoundPostRequest = {
            gender: gender,
            breed: breed.trim(),
            noseprintImageUri: noseUri,
            foundDate: foundDateIso,
            foundLocation: location.trim(),
            description: description.trim(),
        };

        const img = profileUri
            ? { uri: profileUri, name: "found.jpg", type: "image/jpeg" }
            : null;

        console.log("➡️[FORM] /api/search/foundPost request:", req, "image:", !!img);
        const res = await postFoundPost(req, img);
        console.log("✅ 등록 성공:", res);

        Alert.alert("등록 완료", "발견 게시글이 등록되었습니다.", [
            {
                text: "확인",
                // 3. [수정] DB 저장 성공 후 목록 화면으로 이동
                onPress: () => navigation.goBack(), 
            },
        ]);
    } catch (e) {
        console.error("❌ 등록 실패:", e);
        Alert.alert("오류", `등록 실패: ${e instanceof Error ? e.message : '알 수 없는 오류'}`);
    } finally {
        // 4. [수정] finally 블록을 사용하여 로딩 상태 해제
        setSubmitting(false);
    }
  };


  // --- 기존의 renderClear 및 컴포넌트 UI 로직 (생략) ---
  const renderClear = (value: string, clearFn: () => void) =>
    value.length > 0 ? (
      <TouchableOpacity onPress={clearFn}>
        <Image source={icon_close} style={styles.clearIcon} />
      </TouchableOpacity>
    ) : null;
    
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* ... (중간 생략: 성별, 견종, 비문 등 UI) ... */}
        
        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>발견 정보</Text>
        <Text style={styles.label}>발견 일시</Text>
        <View style={styles.datetimeRow}>
          {/* 날짜 선택 */}
          <TouchableOpacity
            style={styles.dateBox}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {date
                ? `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`
                : "날짜 선택"}
            </Text>
            <Image source={icon_calendar} style={styles.calendarIcon} />
          </TouchableOpacity>

          {/* 시/분 선택 */}
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={hour}
              onValueChange={(val) => setHour(val)}
              dropdownIconColor="#000"
            >
              {[...Array(24).keys()].map((h) => (
                <Picker.Item key={h} label={`${h}`} value={`${h}`} />
              ))}
            </Picker>
          </View>
          <Text style={styles.timeLabel}>시</Text>

          <View style={styles.pickerBox}>
            <Picker
              selectedValue={minute}
              onValueChange={(val) => setMinute(val)}
            >
              {[...Array(60).keys()].map((m) => (
                <Picker.Item key={m} label={`${m}`} value={`${m}`} />
              ))}
            </Picker>
          </View>
          <Text style={styles.timeLabel}>분</Text>
        </View>

        <LabelInput
          label="발견 장소"
          value={location}
          onChangeText={setLocation}
        />
        <LabelInput
          label="추가 설명"
          value={description}
          onChangeText={setDescription}
        />

        {/* 등록 버튼: onPressRegisterFound 함수 연결 및 submitting 상태 반영 */}
        <TouchableOpacity 
            style={[styles.submitBtn, { backgroundColor: submitting ? "#999" : "#4262FF" }]}
            onPress={onPressRegisterFound} 
            disabled={submitting}
        >
          <Text style={styles.submitText}>{submitting ? "등록 중..." : "등록하기"}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 날짜 선택 모달은 그대로 유지 */}
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
// --- (LabelInput, InputWithClear, styles는 컴포넌트 외부에 그대로 유지) ---

export default LostPetRegister;