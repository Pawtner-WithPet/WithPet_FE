import api from "./api";

export interface FoundPostRequest {
  owner: number;                
  sex: "MALE" | "FEMALE";       
  kindNm: string;
  foundDate: string;           
  foundLocation: string;
  description?: string;
}

export interface UploadImage {
  uri: string;
  name?: string;
  type?: string;
}

export const postFoundPost = async (
  request: FoundPostRequest,
  image?: UploadImage | null,
): Promise<any> => {
  try {
    const form = new FormData();

    form.append("request", JSON.stringify(request));

    if (image?.uri) {
      const filename =
        image.name ?? `found_${request.owner}_${Date.now()}.jpg`;
      const mime = image.type ?? (
        filename.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg"
      );

      form.append("image", {
        uri: image.uri,
        name: filename,
        type: mime,
      } as any);
    }

    const res = await api.post("/api/search/foundPost", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (data) => data, 
    });

    console.log("✅ 발견 게시글 등록 성공:", res.status, res.data);
    return res.data;
  } catch (error: any) {
    console.error("🐾 Failed to post foundPost:", error?.message);
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
