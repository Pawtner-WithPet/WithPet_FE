import api from "./api";

export interface LostPetRegisterRequest {
  userId: number;
  dogId?: number; // 등록된 반려견 선택 시
  name: string;
  gender: "MALE" | "FEMALE";
  age: number;
  height: number; // cm
  weight: number; // kg
  breed: string;
  feature?: string;
  profileImage?: string; // base64 or URL
  noseImage?: string; // base64 or URL
  lostDate: string; // ISO 8601 format (YYYY-MM-DDTHH:mm:ss)
  lostLocation: string;
  familiarPlace?: string;
  description?: string;
}

export interface LostPetRegisterResponse {
  status: number;
  code: string;
  message: string;
  data: {
    lostPostId: number;
    createdAt: string;
  };
}

// 실종동물 등록
export const registerLostPet = async (
  petData: LostPetRegisterRequest,
): Promise<number> => {
  try {
    const response = await api.post<LostPetRegisterResponse>(
      "/api/search/lostPost",
      petData,
    );
    console.log("✅ 실종동물 등록 성공:", response.data);
    return response.data.data.lostPostId;
  } catch (error: any) {
    console.error("❌ 실종동물 등록 실패:", error.message);
    if (error.response) {
      console.error("📦 서버 응답 상태:", error.response.status);
      console.error("📦 서버 응답 데이터:", error.response.data);
    }
    throw error;
  }
};

// 이미지를 base64로 변환하는 헬퍼 함수
export const convertImageToBase64 = async (
  uri: string,
): Promise<string | null> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("이미지 변환 오류:", error);
    return null;
  }
};

// FormData 형식으로 전송하는 경우
export const registerLostPetWithFormData = async (
  petData: LostPetRegisterRequest,
  profileImageUri?: string,
  noseImageUri?: string,
): Promise<number> => {
  try {
    const formData = new FormData();

    // JSON 데이터 추가
    formData.append(
      "petData",
      JSON.stringify({
        userId: petData.userId,
        dogId: petData.dogId,
        name: petData.name,
        gender: petData.gender,
        age: petData.age,
        height: petData.height,
        weight: petData.weight,
        breed: petData.breed,
        feature: petData.feature,
        lostDate: petData.lostDate,
        lostLocation: petData.lostLocation,
        familiarPlace: petData.familiarPlace,
        description: petData.description,
      }),
    );

    // 이미지 파일 추가
    if (profileImageUri) {
      formData.append("profileImage", {
        uri: profileImageUri,
        type: "image/jpeg",
        name: "profile.jpg",
      } as any);
    }

    if (noseImageUri) {
      formData.append("noseImage", {
        uri: noseImageUri,
        type: "image/jpeg",
        name: "nose.jpg",
      } as any);
    }

    const response = await api.post<LostPetRegisterResponse>(
      "/api/search/lostPost",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    console.log("✅ 실종동물 등록 성공:", response.data);
    return response.data.data.lostPostId;
  } catch (error: any) {
    console.error("❌ 실종동물 등록 실패:", error.message);
    if (error.response) {
      console.error("📦 서버 응답 상태:", error.response.status);
      console.error("📦 서버 응답 데이터:", error.response.data);
    }
    throw error;
  }
};
