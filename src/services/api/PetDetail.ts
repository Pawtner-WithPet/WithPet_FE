import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.2.2:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 반려견 타입
export interface PetDetail {
  petId: number;
  userId: number;
  dogRegNo: string;
  dogNm: string;
  dogAge: number;
  kindNm: string;
  sexNm: string;
  rfidCd: string;
  rfidGubun: string;
  orgNm: string;
  officeTel: string;
  features: string;
  neuterYn: string;
  dogImg?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 반려견 상세 조회
export const getPetDetail = async (petId: number) => {
  const res = await api.get(`/api/pet/${petId}`);
  return res.data.data;
};

// 반려견 정보 업데이트 (features)
export const updatePetDetail = async (
  petId: number,
  payload: { userId: number; features: string },
) => {
  const res = await api.patch(`/api/pet/${petId}`, payload);
  return res.data.data;
};

// 반려견 이미지 업로드
export const uploadPetImage = async (
  petId: number,
  imageUri: string,
  userId: number,
) => {
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

// 반려견 정보 갱신
export const refreshPetInfo = async (petId: number, payload: object) => {
  const res = await api.post(`/api/pet/${petId}/refresh`, payload);
  return res.data;
};
