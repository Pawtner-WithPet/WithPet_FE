import api from "./api";


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

export interface UploadImage {
  uri: string;           
  name?: string;         
  type?: string;        
}


export const postLostPost = async (
  request: LostPostRequest,
  image?: UploadImage | null,
): Promise<any> => {
  try {
    const form = new FormData();
    form.append("request", JSON.stringify(request));

    if (image?.uri) {
      const filename =
        image.name ??
        `lost_${request.pet}_${Date.now()}.jpg`;
      const mime =
        image.type ??
        (filename.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg");

      form.append("image", {
        uri: image.uri,
        name: filename,
        type: mime,
      } as any); 
    }

    const res = await api.post("/api/search/lostPost", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (data) => data,
    });

    console.log("✅ 실종 게시글 등록 성공:", res.status, res.data);
    return res.data;
  } catch (error: any) {
    console.error("🐾 Failed to post lostPost:", error?.message);

    if (error?.response) {
      console.error("📦 서버 응답 상태:", error.response.status);
      console.error("📦 서버 응답 데이터:", error.response.data);
    } else if (error?.request) {
      console.error("🚫 요청이 전송됐으나 응답이 없습니다:", error.request);
    } else {
      console.error("❗ 알 수 없는 에러:", error.message);
    }

    throw error;
  }
};
