import api from "./api";

export type NoseprintDetail = {
  nosePrintId: number;
  nosePrintImg: string;
  petId: number;
  ownerId: number;
  registerDatetime: string;
};

export type NoseprintDetailResponse = {
  status: number;
  code: string;
  message: string;
  data: NoseprintDetail;
};

export const fetchNoseprintByPetId = async (
  petId: number,
): Promise<NoseprintDetail | null> => {
  try {
    const response = await api.get<NoseprintDetailResponse>(
      `/api/noseprint/${petId}`,
      {
        params: {
          userId: 1, // 임시로 userId 1 추가
        },
      },
    );

    console.log("✅ 비문 이미지 조회 성공:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("🐾 Failed to fetch noseprint by petId:", error.message);
    if (error.response) {
      console.error("📦 서버 응답 상태:", error.response.status);
      console.error("📦 서버 응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("🚫 요청이 전송됐으나 응답이 없습니다:", error.request);
    } else {
      console.error("❗ 알 수 없는 에러:", error.message);
    }
    return null;
  }
};
