// 파일 경로: src/services/api/SearchPet.ts (기존 함수 아래에 추가)

import api from "./api"; // api 인스턴스는 다른 api 파일과 동일한 경로에서 가져와야 함


// --- 요청 본문 (Payload) 타입 정의 ---
// 실종 게시글 요청 타입
export type LostPostRequest = {
  owner: number;          // owner_id (TODO: 실제 로그인 사용자 ID로 교체)
  pet: number;            // pet_id (TODO: 실제 반려견 ID로 교체)
  height: number | undefined;
  weight: number | undefined;
  lostDate: string;       // "YYYY-MM-DDTHH:mm:ss"
  lostLocation: string;
  favoritePlace: string | undefined; // 익숙한 장소
  description: string | undefined;
};

// 발견 게시글 요청 타입
export type FoundPostRequest = {
  gender: 'male' | 'female' | 'unknown' | null;
  breed: string;
  noseprintImageUri: string | null;
  foundDate: string;
  foundLocation: string;
  description: string;
  // 소유자 ID는 발견 등록 시 보통 서버에서 처리하거나 등록자 ID를 사용
};

// --- API 함수 정의 ---

// 1. 실종 게시글 등록 API (EndPoint: /api/search/lostPost)
export const postLostPost = async (
  payload: LostPostRequest,
  imageFile: { uri: string, name: string, type: string } | undefined,
): Promise<{ postId: number }> => {
  
  const formData = new FormData();
  formData.append("requestText", JSON.stringify(payload));
  
  if (imageFile) {
    formData.append("imageFile", {
        uri: imageFile.uri,
        name: imageFile.name,
        type: imageFile.type,
    } as any);
  }

  try {
    const res = await api.post("/api/search/lostPost", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    
    // 응답 데이터에서 postId 추출 (예: "postId: 14" -> 14)
    const postId = res.data.data.split(': ')[1];
    return { postId: Number(postId) };

  } catch (error: any) {
    console.error("❌ [LostPost] 등록 실패:", error);
    if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
    }
    throw new Error('실종 게시글 등록에 실패했습니다. (서버/네트워크 문제)');
  }
};


// 2. 발견 게시글 등록 API (EndPoint: /api/search/foundPost)
export const postFoundPost = async (
  payload: FoundPostRequest,
  imageFile: { uri: string, name: string, type: string } | null,
): Promise<{ postId: number }> => {
  
  const formData = new FormData();
  // 발견 등록 요청 본문 스키마를 LostPost와 동일하게 requestText에 JSON을 넣어 전송한다고 가정
  formData.append("requestText", JSON.stringify(payload));
  
  if (imageFile) {
    formData.append("imageFile", imageFile as any);
  }

  try {
    const res = await api.post("/api/search/foundPost", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    
    const postId = res.data.data.split(': ')[1];
    return { postId: Number(postId) };

  } catch (error: any) {
    console.error("❌ [FoundPost] 등록 실패:", error);
    if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
    }
    throw new Error('발견 게시글 등록에 실패했습니다.');
  }
};


// 3. 실종 게시글 완료/삭제 API (EndPoint: /api/search/done-lost-post/{postId})
// '완료하기' 버튼은 DB에서 해당 게시글을 삭제하는 DELETE 요청으로 가정합니다.
export const deleteLostPost = async (postId: number): Promise<void> => {
    try {
        await api.delete(`/api/search/done-lost-post/${postId}`);
    } catch (error: any) {
        console.error(`❌ 실종 게시글 ${postId} 완료 처리 실패:`, error);
        throw new Error('실종 게시글 완료 처리에 실패했습니다. (API 오류)');
    }
};

// 4. 발견 게시글 완료/삭제 API (EndPoint: /api/search/done-found-post/{postId})
export const deleteFoundPost = async (postId: number): Promise<void> => {
    try {
        await api.delete(`/api/search/done-found-post/${postId}`);
    } catch (error: any) {
        console.error(`❌ 발견 게시글 ${postId} 완료 처리 실패:`, error);
        throw new Error('발견 게시글 완료 처리에 실패했습니다. (API 오류)');
    }
};