import api from "./api";

// 실시간 검색 상태 타입
export type RealtimeSearchStatus = "lost" | "found";

// 실시간 검색 요청 파라미터 타입
export type RealtimeSearchParams = {
  userId: number;
  petId: number;
  status: RealtimeSearchStatus;
  keywords?: string;
  image?: File | Blob;
};

// 실시간 검색 응답 타입
export type RealtimeSearchResponse = {
  status: number;
  code: string;
  message: string;
  data?: any;
};

// 실시간 검색 시작 함수
export const startRealtimeSearch = async (
  params: RealtimeSearchParams,
): Promise<RealtimeSearchResponse | null> => {
  try {
    if (!params.keywords?.trim() && !params.image) {
      throw new Error("keywords 또는 image 중 하나 이상은 필수입니다.");
    }

    const formData = new FormData();

    // 필수 파라미터 추가
    formData.append("userId", params.userId.toString());
    formData.append("petId", params.petId.toString());
    formData.append("status", params.status);

    // 선택적 파라미터 추가
    if (params.keywords?.trim()) {
      formData.append("keywords", params.keywords);
    }

    if (params.image) {
      formData.append("image", params.image);
    }

    // FormData 내용 로깅 (React Native에서는 entries() 지원 X)
    console.log("🚀 실시간 검색 FormData 내용:");
    const parts = (formData as any)._parts;
    if (Array.isArray(parts)) {
      parts.forEach(([key, value]: [string, any]) => {
        if (key === "image") {
          console.log(`  ${key}: [File object]`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      });
    } else {
      console.log("⚠️ RN FormData는 entries() 미지원, _parts 없음");
    }

    const response = await api.post<RealtimeSearchResponse>(
      "/api/realtime/search/start",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 10000,
      },
    );

    console.log("🚀 실시간 검색 시작 응답:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("🐾 Failed to start realtime search:", error.message);

    // 더 상세한 에러 로깅
    if (error.response) {
      console.error("📦 에러 상태 코드:", error.response.status);
      console.error("📦 에러 응답 데이터:", error.response.data);
      console.error("📦 에러 응답 헤더:", error.response.headers);
    } else if (error.request) {
      console.error("📦 요청이 전송되지 않음:", error.request);
    } else {
      console.error("📦 요청 설정 오류:", error.message);
    }

    return null;
  }
};

// 키워드 배열을 쉼표로 구분된 문자열로 변환하는 헬퍼 함수
export const formatKeywordsForApi = (keywords: string[]): string => {
  return keywords.join(", ");
};

// 실시간 검색 시작 (키워드만)
export const startRealtimeSearchWithKeywords = async (
  userId: number,
  petId: number,
  status: RealtimeSearchStatus,
  keywords: string[],
): Promise<RealtimeSearchResponse | null> => {
  const keywordsString = formatKeywordsForApi(keywords);

  return startRealtimeSearch({
    userId,
    petId,
    status,
    keywords: keywordsString,
  });
};

// 실시간 검색 시작 (이미지만)
export const startRealtimeSearchWithImage = async (
  userId: number,
  petId: number,
  status: RealtimeSearchStatus,
  image: File | Blob,
): Promise<RealtimeSearchResponse | null> => {
  return startRealtimeSearch({
    userId,
    petId,
    status,
    image,
  });
};

// 실시간 검색 시작 (키워드 + 이미지)
export const startRealtimeSearchWithBoth = async (
  userId: number,
  petId: number,
  status: RealtimeSearchStatus,
  keywords: string[],
  image: File | Blob,
): Promise<RealtimeSearchResponse | null> => {
  const keywordsString = formatKeywordsForApi(keywords);

  return startRealtimeSearch({
    userId,
    petId,
    status,
    keywords: keywordsString,
    image,
  });
};
