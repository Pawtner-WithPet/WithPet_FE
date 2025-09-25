import api from "./api";


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

export async function fetchSearchDetail(postId: number, type: PostType) {
  try {
    const res = await api.get<SearchDetailResponse>("/api/search/detail", {
      params: { postId, type },
    });
    console.log("📄 게시글 상세 응답 데이터:", res.data);
    return res.data; 
  } catch (error: any) {
    console.error("🐾 Failed to fetch search detail:", error.message);

    if (error.response) {
      console.error("📦 서버 응답 상태:", error.response.status);
      console.error("📦 서버 응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("🚫 요청이 전송됐으나 응답이 없습니다:", error.request);
    } else {
      console.error("❗ 알 수 없는 에러:", error.message);
    }

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
