import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserLostPet } from "../../types/Lost";

const getUserId = async (): Promise<string | null> => {
  try {
    const userId = "11";
    console.log("임시 사용자 ID 사용:", userId);
    return userId;
  } catch (error) {
    console.error("사용자 ID 가져오기 실패:", error);
    return null;
  }
};

/**
 * 사용자의 실종 반려견 목록 조회
 */
export const fetchUserLostPets = async (): Promise<UserLostPet[]> => {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("사용자 ID를 찾을 수 없습니다.");

    console.log(`사용자 ${userId}의 실종 반려견 목록 조회 중...`);
    const response = await api.get(`/api/search/${userId}/pets/lost`);

    console.log("실종 반려견 목록 조회 성공:", response.data);

    // 🔥 응답 구조: { status, code, message, data: [...] }
    const data = response.data?.data;

    if (!Array.isArray(data)) {
      console.error("❌ API의 data가 배열이 아닙니다:", data);
      return [];
    }

    const pets: UserLostPet[] = data.map((pet: any) => ({
      petId: pet.petId ?? pet.dogId,
      dogNm: pet.dogNm,
      kindNm: pet.kindNm ?? pet.breed ?? "",
      status: pet.status,
      age: pet.age,
      breed: pet.breed,
      sex: pet.sex,
      weight: pet.weight,
      height: pet.height,
      imgUrl: pet.imgUrl,
    }));

    return pets;
  } catch (error) {
    console.error("실종 반려견 목록 조회 실패:", error);
    throw error;
  }
};

/**
 * 특정 실종 반려견 상세 조회
 */
export const fetchLostPetDetail = async (
  petId: number,
): Promise<UserLostPet> => {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("사용자 ID를 찾을 수 없습니다.");

    console.log(`사용자 ${userId}의 반려견 ${petId} 상세 조회 중...`);
    const response = await api.get(`/api/search/${userId}/pets/lost/${petId}`);

    console.log("실종 반려견 상세 조회 성공:", response.data);

    // 🔥 상세 응답 구조: { status, code, message, data: {...} }
    const data = response.data?.data;

    if (!data) {
      throw new Error("반려견 상세 정보가 존재하지 않습니다.");
    }

    const pet: UserLostPet = {
      petId: data.petId ?? data.dogId,
      dogNm: data.dogNm,
      kindNm: data.kindNm ?? data.breed ?? "",
      status: data.status,
      age: data.age,
      breed: data.breed,
      sex: data.sex,
      weight: data.weight,
      height: data.height,
      imgUrl: data.imgUrl,
    };

    return pet;
  } catch (error) {
    console.error("반려견 상세 정보 조회 실패:", error);
    throw error;
  }
};