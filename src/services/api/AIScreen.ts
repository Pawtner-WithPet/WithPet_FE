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

// 보호소 기반 탐색 결과를 가져오는 함수
export const fetchShelterResults = async (searchParams?: {
  petId?: number;
  keywords?: string;
}): Promise<ShelterInfo[]> => {
  try {
    // 파라미터 정리: null/undefined 값 제거
    const cleanParams = Object.fromEntries(
      Object.entries(searchParams || {}).filter(([_, value]) => value != null),
    );

    console.log("🏠 보호소 검색 요청 파라미터:", cleanParams);

    const response = await api.get<ShelterSearchResponse>(
      "/api/search/withshelter",
      {
        params: cleanParams,
      },
    );
    console.log("🏠 보호소 기반 탐색 결과:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("🐾 Failed to fetch shelter results:", error.message);
    if (error.response) {
      console.error("📦 상태 코드:", error.response.status);
      console.error("📦 응답 데이터:", error.response.data);
    }
    return [];
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
