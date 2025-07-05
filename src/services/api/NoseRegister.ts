import api from "./api";

export type NoseprintDetail = {
  imageUrl: string;
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

export const uploadNoseprintImage = async (
  imageUri: string,
  petId: number,
  ownerId: number = 1,
): Promise<NoseprintDetail | null> => {
  try {
    const formData = new FormData();

    formData.append("nosePrintImg", {
      uri: imageUri,
      name: "noseprint.jpg",
      type: "image/jpeg",
    } as any); // RN의 FormData는 TypeScript에서 타입 오류 방지를 위해 as any 사용

    formData.append("petId", String(petId));
    formData.append("ownerId", String(ownerId));

    const res = await api.post(`/api/noseprint/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("✅ 비문 이미지 업로드 성공:", res.data);
    return res.data.data;
  } catch (error: any) {
    console.error("🐾 비문 이미지 업로드 실패:", error.message);
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
