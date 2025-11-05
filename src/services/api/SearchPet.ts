import api from "./api";
import { AxiosError } from 'axios';

// --- [ 1. 공통 타입 및 유틸리티 ] ---

// 게시글 목록 항목 타입 (LostList.ts에서 가져옴)
export type PostItem = {
  id: string;
  status: "실종" | "발견";
  gender?: "male" | "female";
  breed: string;
  dateTime: string;            
  location: string;
  image?: { uri: string };
  postId: number;
  sex: string | null;
  raw: any;
};

// 게시글 상세 타입 (SearchDetail.ts에서 가져옴)
export type PostType = "LOST" | "FOUND";
export interface SearchDetailResponse {
  postId: number;
  type: PostType;
  dogNm?: string;         
  kindNm?: string;        
  sex?: "MALE" | "FEMALE" | "수컷" | "암컷";   
  age?: number;            
  height?: number;        
  weight?: number;        
  lostDate?: string;      
  foundDate?: string;   
  lostLocation?: string;  
  foundLocation?: string; 
  features?: string;       
  description?: string;   
  favoritePlace?: string; 
  imgUrl?: string;         
}

// 실종 등록 요청 타입 (LostPost.ts에서 가져옴)
export interface LostPostRequest {
  owner: number;         
  pet: number;           
  height?: number;
  weight?: number;
  lostDate: string;       
  lostLocation: string;
  favoritePlace?: string;
  description?: string;
}

// 발견 등록 요청 타입 (FoundPost.ts에서 가져옴)
export interface FoundPostRequest {
  owner: number;                
  sex: "MALE" | "FEMALE";  
  gender: 'male' | 'female' | 'unknown' | null;  
  breed: string;   
  noseprintImageUri: string | null;
  kindNm: string;
  foundDate: string;           
  foundLocation: string;
  description?: string;
}

// 이미지 업로드 공통 타입
export interface UploadImage {
  uri: string;
  name?: string;
  type?: string;
}

// 응답의 data 필드가 배열인 경우의 타입 정의 (Axios 제네릭용)
interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}

// 에러 핸들링 유틸리티 함수 (중복 코드를 줄입니다)
const handleApiError = (error: unknown, apiName: string): void => {
  const err = error as AxiosError;
  console.error(`🐾 Failed to ${apiName}:`, err?.message);

  if (err?.response) {
    console.error("📦 서버 응답 상태:", err.response.status);
    console.error("📦 서버 응답 데이터:", err.response.data);
  } else if (err?.request) {
    console.error("🚫 요청이 전송됐으나 응답이 없습니다:", err.request);
  } else {
    console.error("❗ 알 수 없는 에러:", err?.message);
  }
  throw err;
};


// --- [ 2. 게시글 목록 조회 API (LostList.ts 로직 포함) ] ---

// LostList.ts 파일에서 사용된 데이터 정규화 함수들을 가져옵니다.
const normType = (v: any): "실종" | "발견" => { /* ... (LostList.ts의 normType 로직) ... */
  const s = String(v ?? "").trim().toUpperCase();
  if (s === "LOST" || s === "실종") return "실종";
  if (s === "FOUND" || s === "발견") return "발견";
  return "실종";
};
const normSex = (v: any): "male" | "female" | undefined => { /* ... (LostList.ts의 normSex 로직) ... */
  const s = String(v ?? "").trim().toUpperCase();
  if (s === "MALE" || s === "수컷") return "male";
  if (s === "FEMALE" || s === "암컷") return "female";
  return undefined;
};
const toEpochMs = (v: string | number | null | undefined): number => { /* ... (LostList.ts의 toEpochMs 로직) ... */
  if (v == null) return 0;
  if (typeof v === "number") return v < 1e12 ? v * 1000 : v; 
  const t = Date.parse(v);
  return Number.isNaN(t) ? 0 : t;
};
const fmtDot = (v: string | number | null | undefined): string => { /* ... (LostList.ts의 fmtDot 로직) ... */
  if (v == null) return "-";
  if (typeof v === "number") {
    const ms = v < 1e12 ? v * 1000 : v;
    const d = new Date(ms);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}`;
  }
  return v.replace(/-/g, ".").replace("T", " ").slice(0, 16);
};
interface ListPetDTO {
    postId: number;
    type: string;
    imgUrl?: string;
    eventDate: string;
    location: string;
    kindNm: string;
    sex: string;
    createdAt: string;
}

const mapListResponseToUI = (rows: ListPetDTO[]): PostItem[] => {
    const mapped = rows.map((r) => {
        const status = normType(r.type);
        const createdMs = toEpochMs(r.createdAt);
        const eventMs = toEpochMs(r.eventDate);

        return {
            id: `${status === "실종" ? "lost" : "found"}-${r.postId}`,
            status,
            gender: normSex(r.sex),
            breed: r.kindNm,
            dateTime: fmtDot(r.eventDate), 
            location: r.location ?? "-",
            image: r.imgUrl ? { uri: r.imgUrl } : undefined,
            postId: r.postId,
            sex: r.sex ?? null,
            raw: r,
            __prio: status === "실종" ? 0 : 1,         
            __sort: createdMs || eventMs,              
        };
    });
    mapped.sort((a, b) => (a.__prio - b.__prio) || (b.__sort - a.__sort));
    return mapped.map(({ __prio, __sort, ...rest }) => rest);
};

/**
 * 전체 등록 동물 목록 조회 (GET /api/search/all-list)
 * @param params 검색 키워드 { keyword?: string }
 */
export async function fetchSearchAllList(
  params?: { keyword?: string }
): Promise<PostItem[]> {
  try {
    const res = await api.get<ApiResponse<ListPetDTO[]>>("/api/search/all-list", { params });
    const rows: ListPetDTO[] = res?.data?.data ?? [];
    return mapListResponseToUI(rows);
  } catch (error) {
    handleApiError(error, "fetchSearchAllList");
    return []; // UI 로직을 위해 빈 배열 반환
  }
}

/**
 * 실종 동물 목록 조회 (GET /api/search/lost-list)
 * @param params 검색 키워드 { keyword?: string }
 */
export async function fetchSearchLostList(
    params?: { keyword?: string }
  ): Promise<PostItem[]> {
    try {
      const res = await api.get<ApiResponse<ListPetDTO[]>>("/api/search/lost-list", { params });
      const rows: ListPetDTO[] = res?.data?.data ?? [];
      return mapListResponseToUI(rows);
    } catch (error) {
      handleApiError(error, "fetchSearchLostList");
      return []; 
    }
  }

/**
 * 발견 동물 목록 조회 (GET /api/search/found-list)
 * @param params 검색 키워드 { keyword?: string }
 */
export async function fetchSearchFoundList(
    params?: { keyword?: string }
  ): Promise<PostItem[]> {
    try {
      const res = await api.get<ApiResponse<ListPetDTO[]>>("/api/search/found-list", { params });
      const rows: ListPetDTO[] = res?.data?.data ?? [];
      return mapListResponseToUI(rows);
    } catch (error) {
      handleApiError(error, "fetchSearchFoundList");
      return [];
    }
  }

// --- [ 3. 게시글 상세 조회 API (SearchDetail.ts 로직 포함) ] ---

/**
 * 게시글 상세 조회 (GET /api/search/detail)
 * @param postId 게시글 ID
 * @param type 게시글 타입 ('LOST' | 'FOUND')
 */
export async function fetchSearchDetail(postId: number, type: PostType): Promise<SearchDetailResponse> {
  try {
    const res = await api.get<ApiResponse<SearchDetailResponse>>("/api/search/detail", {
      params: { postId, type },
    });
    console.log("📄 게시글 상세 응답 데이터:", res.data);
    return res.data.data; 
  } catch (error) {
    handleApiError(error, "fetchSearchDetail");
    throw error;
  }
}

export function toLostPostForUI(d: SearchDetailResponse) {
    const isLost = d.type === "LOST";

    const convertGender = (
        sex?: SearchDetailResponse["sex"]
    ): "male" | "female" | undefined => {
        if (!sex) return undefined;
        if (sex === "MALE" || sex === "수컷") return "male";
        if (sex === "FEMALE" || sex === "암컷") return "female";
        return undefined;
    };

    return {
        id: String(d.postId),
        status: isLost ? "실종" : "발견" as const,
        name: d.dogNm,
        breed: d.kindNm,
        gender: convertGender(d.sex),
        age: d.age != null ? String(d.age) : undefined,
        height: d.height != null ? String(d.height) : undefined,
        weight: d.weight != null ? String(d.weight) : undefined,
        location: isLost ? d.lostLocation : d.foundLocation,
        lostDateTime: isLost ? d.lostDate : undefined,
        foundDateTime: !isLost ? d.foundDate : undefined,
        feature: d.features,
        extra: d.description,
        familiar: d.favoritePlace,
        image: d.imgUrl ? { uri: d.imgUrl } : undefined,
    };
}


// --- [ 4. 게시글 등록 API ] ---

/**
 * 실종 게시글 등록 (POST /api/search/lostPost)
 */
export const postLostPost = async (
  request: LostPostRequest,
  image?: UploadImage | null,
): Promise<any> => {
    try {
        const form = new FormData();
        form.append("request", JSON.stringify(request));

        if (image?.uri) {
            const filename = image.name ?? `lost_${request.pet}_${Date.now()}.jpg`;
            const mime = image.type ?? (filename.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg");

            form.append("image", {
                uri: image.uri,
                name: filename,
                type: mime,
            } as any); 
        }

        const res = await api.post("/api/search/lostPost", form, {
            headers: { "Content-Type": "multipart/form-data" },
            transformRequest: (data) => data,
        });

        console.log("✅ 실종 게시글 등록 성공:", res.status, res.data);
        return res.data;
    } catch (error) {
        handleApiError(error, "postLostPost");
        throw error;
    }
};

/**
 * 발견 게시글 등록 (POST /api/search/foundPost)
 */
export const postFoundPost = async (
  request: FoundPostRequest,
  image?: UploadImage | null,
): Promise<any> => {
    try {
        const form = new FormData();
        form.append("request", JSON.stringify(request)); 

        if (image?.uri) {
            form.append("image", {
                uri: image.uri,
                name: image.name ?? `found_${request.owner}_${Date.now()}.jpg`,
                type: image.type ?? "image/jpeg",
            } as any);
        }

        const res = await api.post("/api/search/foundPost", form, {
            transformRequest: (data) => data,
        });

        console.log("✅ 발견 게시글 등록 성공:", res.status, res.data);
        return res.data;
    } catch (error) {
        handleApiError(error, "postFoundPost");
        throw error;
    }
};

// --- [ 5. 기타 검색 관련 API ] ---

// LostPets.ts의 fetchLostPetsForUser 함수 통합
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
  
  export type AISUserLostPet = {
    petId: number;
    dogNm: string;                               
    kindNm: string;                            
    sex: "MALE" | "FEMALE";                                               
    status: boolean;                         
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

/**
 * 실종 상태 반려견 목록 조회 (GET /api/search/{userId}/pets/lost)
 */
export const fetchLostPetsForUser = async (userId: number): Promise<AISUserLostPet[]> => {
  try {
    const res = await api.get<ApiResponse<LostPetItemDTO[]>>(`/api/search/${userId}/pets/lost`);
    console.log("📦 실종 상태 반려견 목록 응답:", res.data);
    return Array.isArray(res.data.data) ? res.data.data.map(toAIS) : [];
  } catch (error) {
    handleApiError(error, "fetchLostPetsForUser");
    return [];
  }
};

// --- [ 6. 완료/삭제 API ] ---

/**
 * 발견 완료 (삭제) (DELETE /api/search/done-found-post/{postId})
 */
export const deleteFoundPost = async (postId: number): Promise<any> => {
    try {
        const res = await api.delete(`/api/search/done/found-post/${postId}`);
        console.log("✅ 발견 완료 처리 성공:", res.status, res.data);
        return res.data;
    } catch (error) {
        handleApiError(error, "deleteFoundPost");
        throw error;
    }
};

/**
 * 실종 완료 (삭제) (DELETE /api/search/done/lost-post/{postId})
 */
export const deleteLostPost = async (postId: number): Promise<any> => {
    try {
        const res = await api.delete(`/api/search/done/lost-post/${postId}`);
        console.log("✅ 실종 완료 처리 성공:", res.status, res.data);
        return res.data;
    } catch (error) {
        handleApiError(error, "deleteLostPost");
        throw error;
    }
};