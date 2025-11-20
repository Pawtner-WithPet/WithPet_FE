import axios from "axios";
import { API_BASE_URL } from "@env";
import { UploadImage } from "../../types/UploadImage";

// ------------------------------------
// ✔ 실종 동물 등록 요청 타입
// ------------------------------------
export type LostPetRequest = {
  owner: number;
  pet: number;
  height: number;
  weight: number;
  lostDate: string;
  lostLocation: string;
  favoritePlace: string;
  description: string;
};

// ------------------------------------
// ✔ 실종 동물 등록 API
// ------------------------------------
export const postLostPet = async (
  requestData: LostPetRequest,
  imageFile: UploadImage | null
) => {
  const formData = new FormData();

  // request JSON
  formData.append("request", JSON.stringify(requestData));

  // image (optional)
  if (imageFile !== null) {
    formData.append("image", {
      uri: imageFile.uri,
      type: imageFile.type,
      name: imageFile.fileName,
    } as any);
  }

  const response = await axios.post(
    `${API_BASE_URL}/api/search/lostPost`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};



// ------------------------------------
// ✔ 발견 동물 등록 요청 타입
// ------------------------------------
export type FoundPostRequest = {
  owner: number;
  sex: string;
  kindNm: string;
  foundDate: string;
  foundLocation: string;
  description: string;
};

// ------------------------------------
// ✔ 발견 동물 등록 API (정답)
// ------------------------------------
export const postFoundPet = async (
  requestData: FoundPostRequest,
  imageFile: UploadImage | null
) => {
  try {
    const formData = new FormData();

    // request(JSON)
    formData.append("request", JSON.stringify(requestData));

    // image (required — found는 이미지 있어야함)
    if (imageFile !== null) {
      formData.append("image", {
        uri: imageFile.uri,
        type: imageFile.type,
        name: imageFile.fileName,
      } as any);
    }

    const response = await axios.post(
      `${API_BASE_URL}/api/search/foundPost`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("📌 발견 동물 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.log("❌ 발견 동물 등록 오류:", error);
    throw error;
  }
};
