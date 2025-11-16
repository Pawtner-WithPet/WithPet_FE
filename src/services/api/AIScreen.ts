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
export const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) {
    return "날짜 정보 없음";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.warn(`Invalid date string: ${dateString}`);
    return "날짜 정보 없음";
  }

  try {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch (error) {
    console.error(`Date formatting error: ${error}`);
    return "날짜 정보 없음";
  }
};

// 게시글 타입 (LOST 또는 FOUND)
export type PostType = "LOST" | "FOUND";

// 실종동물 타입
export type LostPet = {
  postId: number;
  type: string;
  lostDate: string;
  lostLocation: string;
  kindNm: string;
  sex: string;
  imgUrl: string | null;
};

// 발견동물 타입
export type FoundPet = {
  postId: number;
  type: string;
  foundDate: string;
  foundLocation: string;
  kindNm: string;
  sex: string;
  imgUrl: string | null;
};

// 보호소 정보 타입
export type ShelterInfo = {
  petImg: string;
  foundLocation: string;
  feature: string;
  shelterName: string;
  shelterLocation: string;
  shelterTel: string;
};

// 상세 정보 데이터 타입
export type PetDetailData = {
  type: string;
  postId: number;
  ownerId: number;
  imgUrl: string | null;
  dogNm: string;
  kindNm: string;
  sex: string;
  age: number | null;
  features: string | null;
  lostDate: string;
  lostLocation: string;
  description: string;
  height: number | null;
  weight: number | null;
  favoritePlace: string | null;
  createdAt: string;
};

// API 응답 타입들
export type LostPetListResponse = {
  status: number;
  code: string;
  message: string;
  data: LostPet[];
};

export type FoundPetListResponse = {
  status: number;
  code: string;
  message: string;
  data: FoundPet[];
};

export type ShelterSearchResponse = {
  status: number;
  code: string;
  message: string;
  data: ShelterInfo[];
};

export type PetDetailResponse = {
  status: number;
  code: string;
  message: string;
  data: PetDetailData;
};

// 사용자 실종 반려견 데이터 타입
export interface UserLostPet {
  petId: number; // dogId → petId
  dogNm: string;
  kindNm: string; // 추가
  status: string; // 추가
  age?: number;
  breed?: string;
  sex?: string;
  weight?: number;
  height?: number;
  imgUrl?: string | null;
}

// API 응답 타입
export type UserLostPetsResponse = {
  status: number;
  code: string;
  message: string;
  data: UserLostPet[];
};

// 사용자의 실종 반려견 목록을 가져오는 함수
export const fetchUserLostPets = async (
  userId: number,
): Promise<UserLostPet[]> => {
  try {
    console.log(`사용자 ${userId}의 실종 반려견 목록 조회 중...`);

    const response = await api.get<UserLostPetsResponse>(
      `/api/search/${userId}/pets/lost`,
    );

    console.log("사용자 실종 반려견 목록 조회 결과:", response.data);

    if (response.data.status === 200 && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(
        response.data.message ||
          "사용자 실종 반려견 목록을 가져오는데 실패했습니다.",
      );
    }
  } catch (error: any) {
    console.error("사용자 실종 반려견 목록 조회 오류:", error.message);

    if (error.response) {
      console.error("상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    }

    return [];
  }
};

// CORS 에러 감지 함수
const isCorsError = (error: any): boolean => {
  const errorMessage = error.message?.toLowerCase() || "";
  const errorName = error.name?.toLowerCase() || "";

  return (
    error.code === "ERR_NETWORK" ||
    errorMessage.includes("cors") ||
    errorMessage.includes("cross-origin") ||
    errorMessage.includes("access-control") ||
    errorName.includes("cors") ||
    (error.response?.status === 0 && !error.request?.response)
  );
};

// 네트워크 에러 감지 함수
const isNetworkError = (error: any): boolean => {
  return (
    error.code === "ECONNABORTED" ||
    error.code === "ENOTFOUND" ||
    error.code === "ECONNREFUSED" ||
    error.code === "ETIMEDOUT" ||
    error.message?.includes("timeout") ||
    error.message?.includes("network")
  );
};

// CORS 간단 테스트 함수
export const testCorsIssue = async (): Promise<boolean> => {
  try {
    console.log("🧪 CORS 테스트 시작...");

    // 간단한 GET 요청으로 테스트
    const response = await fetch("/api/search/withshelter?petId=1", {
      method: "GET",
      mode: "cors", // CORS 모드 명시적 설정
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("✅ CORS 테스트 성공:", response.status);
    console.log(
      "📋 응답 헤더:",
      Object.fromEntries(response.headers.entries()),
    );
    return true;
  } catch (error: any) {
    console.error("❌ CORS 테스트 실패:", error.message);

    if (error.name === "TypeError" && error.message.includes("CORS")) {
      console.error("🚫 CORS 에러 확인됨");
      return false;
    }

    console.error("🤔 다른 에러 타입:", error.name);
    return false;
  }
};

// 실종동물 목록을 가져오는 함수
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
    return [];
  }
};

// 발견동물 목록을 가져오는 함수
export const fetchFoundPetList = async (searchParams?: {
  petId?: number;
  keywords?: string;
  userId?: number;
}): Promise<FoundPet[]> => {
  try {
    const response = await api.get<FoundPetListResponse>(
      "/api/search/found-list",
      {
        params: searchParams,
      },
    );
    console.log("🔍 발견 반려동물 목록 조회 결과:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("🐾 Failed to fetch found pet list:", error.message);
    return [];
  }
};

// 발견동물과 매칭 결과를 가져오는 함수
export const fetchFoundPetResults = async (searchParams?: {
  petId?: number;
  keywords?: string;
}): Promise<FoundPet[]> => {
  try {
    // 파라미터 정리: null/undefined 값 제거
    const cleanParams = Object.fromEntries(
      Object.entries(searchParams || {}).filter(([_, value]) => value != null),
    );

    console.log("🔍 발견동물 검색 요청 파라미터:", cleanParams);

    const response = await api.get<FoundPetListResponse>(
      "/api/search/withfoundpet",
      {
        params: cleanParams,
      },
    );
    console.log("🔍 발견된 반려동물 검색 결과:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("🐾 Failed to fetch found pet results:", error.message);
    if (error.response) {
      console.error("📦 상태 코드:", error.response.status);
      console.error("📦 응답 데이터:", error.response.data);
    }
    return [];
  }
};

// 서버 에러 처리를 위한 개선된 fetchShelterResults 함수
export const fetchShelterResults = async (searchParams?: {
  petId?: number;
  keywords?: string;
}): Promise<ShelterInfo[]> => {
  // 재시도 로직 추가
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      attempt++;
      console.log(`🔄 보호소 검색 시도 ${attempt}/${maxRetries}`);

      const cleanParams = Object.fromEntries(
        Object.entries(searchParams || {}).filter(
          ([_, value]) => value != null,
        ),
      );

      console.log("📋 요청 파라미터:", JSON.stringify(cleanParams));

      const response = await api.get<ShelterSearchResponse>(
        "/api/search/withshelter",
        {
          params: cleanParams,
          timeout: 30000,
          headers: {
            "X-Request-ID": Math.random().toString(36).substr(2, 9),
          },
        },
      );

      console.log("✅ 보호소 검색 성공");
      return response.data.data;
    } catch (error: any) {
      console.error(`❌ 시도 ${attempt} 실패:`, error.message);

      // 500 에러 상세 분석
      if (error.response?.status === 500) {
        const errorData = error.response.data;

        console.error("🔥 서버 내부 에러 (500) 상세:");
        console.error("  - 에러 코드:", errorData.code);
        console.error("  - 에러 메시지:", errorData.message);
        console.error("  - 발생 시간:", errorData.timestamp);
        console.error("  - API 경로:", errorData.path);

        // 에러 리포팅
        const cleanParams = Object.fromEntries(
          Object.entries(searchParams || {}).filter(
            ([_, value]) => value != null,
          ),
        );

        await reportServerError({
          api: "/api/search/withshelter",
          params: cleanParams,
          errorResponse: errorData,
          timestamp: new Date().toISOString(),
        });

        // 마지막 시도가 아니면 재시도
        if (attempt < maxRetries) {
          console.log(`⏳ ${2000 * attempt}ms 후 재시도...`);
          await new Promise((resolve) =>
            setTimeout(() => resolve(undefined), 2000 * attempt),
          );
          continue;
        }
      }

      // 최종 실패 시
      if (attempt === maxRetries) {
        console.error("🚫 최대 재시도 횟수 초과 - 보호소 검색 최종 실패");

        // 백엔드 팀에게 전달할 정보
        const cleanParams = Object.fromEntries(
          Object.entries(searchParams || {}).filter(
            ([_, value]) => value != null,
          ),
        );

        console.error("📋 백엔드 팀 전달 정보:");
        console.error(`  - API: /api/search/withshelter`);
        console.error(`  - 파라미터: ${JSON.stringify(cleanParams)}`);
        console.error(`  - 에러 시간: ${new Date().toISOString()}`);
        console.error(`  - 클라이언트: React Native Android`);

        return [];
      }
    }
  }

  return [];
};

// 서버 상태 체크 함수 추가
export const checkServerStatus = async (): Promise<boolean> => {
  try {
    console.log("🏥 서버 상태 확인 중...");

    // 간단한 헬스체크 API 호출 (있다면)
    const response = await api.get("/health", { timeout: 5000 });
    console.log("✅ 서버 상태 정상");
    return true;
  } catch (error) {
    // 헬스체크 API가 없다면 다른 가벼운 API로 테스트
    try {
      const response = await api.get("/api/search/lost-list", {
        params: { limit: 1 },
        timeout: 5000,
      });
      console.log("✅ 서버 상태 정상 (대체 API 확인)");
      return true;
    } catch (fallbackError) {
      console.error("❌ 서버 상태 불량");
      return false;
    }
  }
};

// 파라미터 유효성 검증 함수
export const validateShelterSearchParams = (searchParams?: {
  petId?: number;
  keywords?: string;
}): { isValid: boolean; error?: string } => {
  if (!searchParams) {
    return { isValid: false, error: "검색 파라미터가 필요합니다" };
  }

  const { petId, keywords } = searchParams;

  // petId와 keywords 중 하나는 있어야 함
  if (!petId && !keywords) {
    return {
      isValid: false,
      error: "petId 또는 keywords 중 하나는 필수입니다",
    };
  }

  // petId 유효성 검증
  if (petId && (petId <= 0 || !Number.isInteger(petId))) {
    return {
      isValid: false,
      error: "petId는 양의 정수여야 합니다",
    };
  }

  // keywords 유효성 검증
  if (
    keywords &&
    (typeof keywords !== "string" || keywords.trim().length === 0)
  ) {
    return {
      isValid: false,
      error: "keywords는 비어있지 않은 문자열이어야 합니다",
    };
  }

  return { isValid: true };
};

// 개선된 보호소 검색 함수 (유효성 검증 + 재시도 + 상태 체크)
export const fetchShelterResultsWithValidation = async (searchParams?: {
  petId?: number;
  keywords?: string;
}): Promise<ShelterInfo[]> => {
  console.log("🚀 보호소 검색 시작");

  // 1. 파라미터 유효성 검증
  const validation = validateShelterSearchParams(searchParams);
  if (!validation.isValid) {
    console.error("❌ 파라미터 유효성 검증 실패:", validation.error);
    return [];
  }

  // 2. 서버 상태 체크 (선택사항)
  const serverStatus = await checkServerStatus();
  if (!serverStatus) {
    console.warn("⚠️ 서버 상태가 불안정하지만 요청을 계속 진행합니다");
  }

  // 3. 실제 검색 실행
  return await fetchShelterResults(searchParams);
};

// 에러 리포팅 함수 (서버 팀에게 자동으로 에러 정보 전송)
export const reportServerError = async (errorInfo: {
  api: string;
  params: any;
  errorResponse: any;
  timestamp: string;
}) => {
  try {
    // 에러 리포팅 API가 있다면 여기서 호출
    console.log("📨 에러 리포트 전송:", errorInfo);

    // 실제 구현 예시:
    // await api.post("/api/error-report", errorInfo);
  } catch (reportError) {
    console.error("📨 에러 리포트 전송 실패:", reportError);
  }
};

// 반려동물 상세 정보를 가져오는 함수
export const fetchPetDetail = async (
  postId: number,
  type: PostType,
): Promise<PetDetailData | null> => {
  try {
    const response = await api.get<PetDetailResponse>("/api/search/detail", {
      params: {
        postId,
        type,
      },
    });

    console.log("🔍 반려동물 상세 정보 조회 결과:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("🐾 Failed to fetch pet detail:", error.message);
    if (error.response) {
      console.error("📦 상태 코드:", error.response.status);
      console.error("📦 응답 데이터:", error.response.data);
    }
    return null;
  }
};

// 기존 fetchUserLostPets 함수가 없거나 다르다면 이 버전으로 교체/추가
export const fetchUserLostPetsById = async (
  userId: number,
): Promise<UserLostPet[]> => {
  try {
    console.log(`사용자 ${userId}의 실종 반려견 목록 조회 중...`);

    const response = await api.get<UserLostPetsResponse>(
      `/api/search/${userId}/pets/lost`,
    );

    console.log("사용자 실종 반려견 목록 조회 결과:", response.data);

    if (response.data.status === 200 && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(
        response.data.message ||
          "사용자 실종 반려견 목록을 가져오는데 실패했습니다.",
      );
    }
  } catch (error: any) {
    console.error("사용자 실종 반려견 목록 조회 오류:", error.message);

    if (error.response) {
      console.error("상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    }

    return [];
  }
};

// 특정 사용자 ID(11)로 실종 반려견 목록을 가져오는 함수
export const fetchCurrentUserLostPets = async (): Promise<UserLostPet[]> => {
  const userId = 11; // 임시로 하드코딩된 사용자 ID
  return await fetchUserLostPetsById(userId);
};

// 사용자 실종 반려견 목록을 드롭다운용 이름 배열로 변환하는 함수
export const getUserLostPetNames = (pets: UserLostPet[]): string[] => {
  return pets.map((pet) => pet.dogNm);
};

// 반려견 이름으로 petId를 찾는 함수
export const getPetIdByName = (
  pets: UserLostPet[],
  dogName: string,
): number | null => {
  const pet = pets.find((pet) => pet.dogNm === dogName);
  return pet ? pet.petId : null;
};
