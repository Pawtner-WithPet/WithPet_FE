import api from "./api";

export type FindResult = {
  id: number;
  date: string;
  location: string;
  status: string;
  image: string | null;
  score?: number;
};

export type FindResultsResponse = {
  status: number;
  code: string;
  message: string;
  data: FindResult[];
};

export const fetchFoundPetResults = async (searchParams?: {
  location?: string;
  searchText?: string;
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
