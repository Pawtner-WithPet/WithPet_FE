import axios from "axios";


const api = axios.create({
  baseURL: "http://192.168.219.112:8080",
  timeout: 5000,
});


export const getPetDetail = async (id: number) => {
  try {
    const response = await api.get(`/api/pet/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("❌ 반려견 조회 실패:", error);
    throw error;
  }
};

export const registerPet = async (payload: {
  dogRegNo: string;
  rfidCd: string;
  ownerNm: string;
  ownerBirth: string;
  userId: number;
}) => {
  try {
    const response = await api.post("/api/pet/register", payload);
    return response.data.data;
  } catch (error) {
    console.error("❌ 등록 실패:", error);
    throw error;
  }
};
