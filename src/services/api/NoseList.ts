import api from "./api";

export type NoseprintPet = {
  id: number;
  dogRegNo: string;
  dogNm: string;
  dogAge: number;
  kindNm: string;
  sexNm: string;
  dogImg: string | null;
  noseprintId?: string;
  noseprintImg?: string;
};

export type NoseprintPetsResponse = {
  status: number;
  code: string;
  message: string;
  data: NoseprintPet[];
};

export const fetchNoseprintPets = async (
  userId: number,
): Promise<NoseprintPet[]> => {
  try {
    const response = await api.get<NoseprintPetsResponse>(
      "/api/noseprint/pets",
      {
        params: { userId }, // data 대신 params 사용
      },
    );
    console.log("비문 반려동물 응답 데이터:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("🐾 Failed to fetch noseprint pets:", error.message);
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
