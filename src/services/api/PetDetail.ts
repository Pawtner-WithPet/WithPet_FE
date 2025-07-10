import api from "./api";
import { PetDetail, UpdatePetPayload } from "../../types/PetTypes";

// 반려견 상세 조회
export const getPetDetail = async (petId: number): Promise<PetDetail> => {
  const res = await api.get(`/api/pet/${petId}`);
  return res.data.data;
};

// 반려견 정보 업데이트 (features)
export const updatePetDetail = async (
  petId: number,
  payload: UpdatePetPayload,
): Promise<PetDetail> => {
  const res = await api.patch(`/api/pet/${petId}`, payload);
  return res.data.data;
};

// 반려견 이미지 업로드
export const uploadPetImage = async (
  petId: number,
  imageUri: string,
  userId: number,
): Promise<PetDetail> => {
  const formData = new FormData();
  formData.append("userId", String(userId));
  formData.append("dogImg", {
    uri: imageUri,
    name: "dogImg.png",
    type: "image/png",
  } as any);

  const res = await api.patch(`/api/pet/${petId}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};
