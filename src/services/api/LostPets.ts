import api from "./api";
import type { UserLostPet as AISUserLostPet } from "./AIScreen";

type LostPetItemDTO = {
  id?: number;
  petId?: number;
  dogNm?: string;
  kindNm?: string;                        
  sexNm?: "수컷" | "암컷" | "MALE" | "FEMALE";
  sex?: "MALE" | "FEMALE";
  status?: boolean;                       
  dogImg?: string | null;
};

const toAIS = (p: LostPetItemDTO): AISUserLostPet => {
  const raw = (p.sex ?? p.sexNm ?? "").toString().toUpperCase();
  const sex: "MALE" | "FEMALE" =
    raw.includes("FEMALE") || raw.includes("암컷") ? "FEMALE" : "MALE";

  return {
    petId: p.petId ?? p.id ?? 0,
    dogNm: p.dogNm ?? "",                               
    kindNm: p.kindNm ?? "",                            
    sex,                                               
    status: p.status ?? false,                         
  };
};

export const fetchLostPetsForUser = async (userId: number): Promise<AISUserLostPet[]> => {
  try {
    const res = await api.get<LostPetItemDTO[]>(`/api/search/${userId}/pets/lost`);
    console.log("📦 실종 상태 반려견 목록 응답:", res.data);
    return Array.isArray(res.data) ? res.data.map(toAIS) : [];
  } catch (error: any) {
    console.error("🐾 Failed to fetch lost pets:", error?.message);
    if (error?.response) {
      console.error("📦 서버 응답 상태:", error.response.status);
      console.error("📦 서버 응답 데이터:", error.response.data);
    } else if (error?.request) {
      console.error("🚫 요청 전송됨, 응답 없음:", error.request);
    } else {
      console.error("❗ 알 수 없는 에러:", error?.message);
    }
    return [];
  }
};
