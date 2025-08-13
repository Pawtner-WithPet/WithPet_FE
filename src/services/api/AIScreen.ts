import api from "./api";

// 성별을 한국어로 변환하는 함수
export const getSexInKorean = (sex: string) => {
  switch (sex) {
    case "MALE":
      return "수컷";
    case "FEMALE":
      return "암컷";
    default:
      return sex;
  }
};

// 날짜를 원하는 형식으로 변환하는 함수
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export type LostPet = {
  postId: number;
  type: string;
  lostDate: string;
  lostLocation: string;
  kindNm: string;
  sex: string;
  imgUrl: string | null;
};

export type LostPetListResponse = {
  status: number;
  code: string;
  message: string;
  data: LostPet[];
};

export type FindResult = {
  postId: number;
  foundDate: string;
  foundLocation: string;
  kindNm: string;
  sex: string;
  imgUrl: string | null;
};

export type FindResultsResponse = {
  status: number;
  code: string;
  message: string;
  data: FindResult[];
};

export const fetchFoundPetResults = async (searchParams?: {
  petId?: number;
  keywords?: string;
  userId?: number;
}): Promise<FindResult[]> => {
  try {
    const response = await api.get<FindResultsResponse>(
      "/api/search/withfoundpet",
      {
        params: searchParams,
      },
    );
    console.log("🔍 발견된 반려동물 검색 결과:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("🐾 Failed to fetch found pet results:", error.message);
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

export const fetchLostPetList = async (searchParams?: {
  petId?: number;
  keywords?: string;
  userId?: number;
}): Promise<LostPet[]> => {
  try {
    const response = await api.get<LostPetListResponse>(
      "/api/search/lost-list",
      {
        params: searchParams,
      },
    );
    console.log("🔍 실종 반려동물 목록 조회 결과:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("🐾 Failed to fetch lost pet list:", error.message);
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
