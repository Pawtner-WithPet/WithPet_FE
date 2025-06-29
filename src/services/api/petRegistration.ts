import axios from "axios";

export type RegisterPetRequest = {
  dogRegNo: string;
  rfidCd: string;
  ownerNm: string;
  ownerBirth: string;
  userId: number;
};

export type RegisteredDog = {
  dogRegNo: string;
  dogNm: string;
  dogAge: number;
  kindNm: string;
  sexNm: string;
  dogImg: string | null;
};

export type RegisterPetResponse = {
  status: number;
  message: string;
  data: RegisteredDog;
};

const API_BASE_URL = "http://10.0.2.2:8080/api";

export const registerPet = async (
  petData: RegisterPetRequest,
): Promise<RegisteredDog> => {
  try {
    const response = await axios.post<RegisterPetResponse>(
      `${API_BASE_URL}/pet/register`,
      petData,
    );

    if (response.data.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "등록 실패");
    }
  } catch (error: any) {
    if (error.response) {
      // 서버가 응답했지만 오류 상태 코드
      throw new Error(
        error.response.data?.message || "서버 오류가 발생했습니다.",
      );
    } else if (error.request) {
      // 요청이 전송되었지만 응답을 받지 못함
      throw new Error("서버에 연결할 수 없습니다. 네트워크를 확인해주세요.");
    } else {
      // 요청을 설정하는 중에 오류가 발생
      throw new Error(error.message || "알 수 없는 오류가 발생했습니다.");
    }
  }
};
