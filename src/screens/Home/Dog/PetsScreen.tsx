import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PetsStackParamList } from "../../../navigation/PetsStack";
import { fetchDogs, Dog } from "../../../services/api/dogs";
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

  useEffect(() => {
    const loadDogs = async () => {
      try {
        const fetchedDogs = await fetchDogs(1);
        console.log("불러온 반려견 목록:", fetchedDogs);
        setDogs(fetchedDogs);
      } catch (error) {
        Alert.alert("오류", "반려견 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadDogs();
  }, []);

  const handlePetPress = (petId: string) => {
    navigation.navigate("PetDetailScreen", { petId });
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
        keyExtractor={(item) => item.dogRegNo}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePetPress(item.dogRegNo)}>
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
            <Header />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 16,
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
    padding: 20,
  },
});

export default PetsScreen;
