import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Text,
  Modal,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PetsStackParamList } from "../../../navigation/PetsStack";
import { fetchDogs, Dog } from "../../../services/api/dogs";
import {
  registerPet,
  RegisteredDog,
} from "../../../services/api/petRegistration";
import { Colors } from "../../../constants/colors";
import Header from "../../../components/Header";
import PetCard from "../../../components/PetCard";

type PetsScreenNavigationProp = NativeStackNavigationProp<
  PetsStackParamList,
  "PetsScreen"
>;

const PetsScreen: React.FC = () => {
  const navigation = useNavigation<PetsScreenNavigationProp>();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 등록 모달 상태
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);
  const [registeredDog, setRegisteredDog] = useState<RegisteredDog | null>(
    null,
  );

  // 등록 폼 상태
  const [dogRegNo, setDogRegNo] = useState("");
  const [rfidCd, setRfidCd] = useState("");
  const [ownerNm, setOwnerNm] = useState("");
  const [ownerBirth, setOwnerBirth] = useState("");
  const [userId, setUserId] = useState("1");

  useEffect(() => {
    const loadDogs = async () => {
      try {
        const fetchedDogs = await fetchDogs(1); // userId 하드코딩
        setDogs(fetchedDogs);
      } catch (error) {
        Alert.alert("오류", "반려견 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadDogs();
  }, []);

  const handleAddPress = () => {
    setModalVisible(true);
  };

  const handleRegister = async () => {
    if (!dogRegNo || !rfidCd || !ownerNm || !ownerBirth || !userId) {
      Alert.alert("입력 오류", "모든 필드를 입력해주세요.");
      return;
    }

    setRegisterLoading(true);
    try {
      const result = await registerPet({
        dogRegNo,
        rfidCd,
        ownerNm,
        ownerBirth,
        userId: Number(userId),
      });

      setRegisteredDog(result);
      Alert.alert("성공", "반려견 정보가 등록되었습니다!");

      const updatedDogs = await fetchDogs(1);
      setDogs(updatedDogs);

      resetForm();
    } catch (error: any) {
      Alert.alert("오류", error.message);
    } finally {
      setRegisterLoading(false);
    }
  };

  const resetForm = () => {
    setDogRegNo("");
    setRfidCd("");
    setOwnerNm("");
    setOwnerBirth("");
    setUserId("1");
    setRegisteredDog(null);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    resetForm();
  };

  // PetCard 클릭 시 상세 화면으로 이동 (id를 petId로 전달)
  const handlePetCardPress = (petId: number) => {
    navigation.navigate("PetDetailScreen", { id: petId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={dogs}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePetCardPress(item.id)}>
            <PetCard
              name={item.dogNm}
              age={`${item.dogAge}세`}
              breed={item.kindNm}
              gender={item.sexNm}
              image={
                item.dogImg
                  ? { uri: item.dogImg }
                  : require("../../../assets/images/default.png")
              }
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>등록된 반려견이 없습니다.</Text>
            <Text style={styles.emptySubText}>
              + 버튼을 눌러 반려견을 등록해보세요!
            </Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>반려견 등록</Text>
                <TouchableOpacity onPress={handleCloseModal}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.input}
                placeholder="등록번호 (dogRegNo)"
                value={dogRegNo}
                onChangeText={setDogRegNo}
              />
              <TextInput
                style={styles.input}
                placeholder="RFID 코드 (rfidCd)"
                value={rfidCd}
                onChangeText={setRfidCd}
              />
              <TextInput
                style={styles.input}
                placeholder="소유자 이름 (ownerNm)"
                value={ownerNm}
                onChangeText={setOwnerNm}
              />
              <TextInput
                style={styles.input}
                placeholder="소유자 생년월일 (예: 770505)"
                value={ownerBirth}
                onChangeText={setOwnerBirth}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="사용자 ID (userId)"
                value={userId}
                onChangeText={setUserId}
                keyboardType="numeric"
              />

              {registerLoading ? (
                <ActivityIndicator
                  size="large"
                  color="#4285F4"
                  style={styles.loader}
                />
              ) : (
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleRegister}
                >
                  <Text style={styles.registerButtonText}>등록</Text>
                </TouchableOpacity>
              )}

              {registeredDog && (
                <View style={styles.resultContainer}>
                  <Text style={styles.resultTitle}>등록된 반려견 정보</Text>
                  <Text style={styles.resultText}>
                    이름: {registeredDog.dogNm}
                  </Text>
                  <Text style={styles.resultText}>
                    나이: {registeredDog.dogAge}세
                  </Text>
                  <Text style={styles.resultText}>
                    품종: {registeredDog.kindNm}
                  </Text>
                  <Text style={styles.resultText}>
                    성별: {registeredDog.sexNm}
                  </Text>
                  {registeredDog.dogImg ? (
                    <Image
                      source={{ uri: registeredDog.dogImg }}
                      style={styles.dogImage}
                    />
                  ) : (
                    <Text style={styles.resultText}>이미지 없음</Text>
                  )}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  addButtonText: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    lineHeight: 30,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    fontSize: 24,
    color: "#666",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#4285F4",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    marginVertical: 20,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  resultText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
  },
  dogImage: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default PetsScreen;
