import axios from "axios";

export type Dog = {
  petId: string;
  dogRegNo: string;
  dogNm: string;
  dogAge: number;
  kindNm: string;
  sexNm: string;
  dogImg: string | null;
};

export type DogListResponse = {
  status: number;
  code: string;
  message: string;
  data: Dog[];
};

const API_URL = "http://10.0.2.2:8080/api/pet/list";

export const fetchDogs = async (userId: number): Promise<Dog[]> => {
  try {
    const response = await axios.get<DogListResponse>(API_URL, {
      params: { userId },
    });
    console.log("서버 응답 데이터:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("🐶 Failed to fetch dogs:", error.message);
    if (error.response) {
      console.error("📦 서버 응답 상태:", error.response.status);
      console.error("📦 서버 응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("🚫 요청이 전송됐으나 응답이 없습니다:", error.request);
    } else {
      console.error("❗ 알 수 없는 에러:", error.message);
    }
    return [];
  }
};
