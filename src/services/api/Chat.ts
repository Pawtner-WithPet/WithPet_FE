import api from "./api";

/**
 * 사용자 ID 가져오기 (임시 11)
 */
const getUserId = async (): Promise<string | null> => {
  try {
    const userId = "11";
    console.log("임시 사용자 ID 사용:", userId);
    return userId;
  } catch (error) {
    console.error("사용자 ID 가져오기 실패:", error);
    return null;
  }
};

/**
 * 게시글에서 채팅방 입장 요청
 * @param postId - 게시글 ID
 * @param ownerId - 게시글 작성자 ID
 * @param postType - 게시글 타입 ("LOST" | "FOUND")
 */
export interface EnterChatRoomRequest {
  postId: string | number;
  ownerId: string | number;
  postType: "LOST" | "FOUND";
}

export interface EnterChatRoomResponse {
  roomId: string;
  roomName?: string;
  participantId?: string;
  createdAt?: string;
}

export const enterChatRoomFromPost = async (
  params: EnterChatRoomRequest,
): Promise<EnterChatRoomResponse> => {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("사용자 ID를 찾을 수 없습니다.");

    console.log("채팅방 입장 요청:", params);

    const response = await api.post("/api/chat/rooms/enter-from-post", {
      postId: params.postId,
      ownerId: params.ownerId,
      postType: params.postType,
    });

    console.log("채팅방 입장 성공:", response.data);

    // 응답 구조: { status, code, message, data: {...} }
    const data = response.data?.data;

    if (!data || !data.roomId) {
      throw new Error("채팅방 정보를 받아올 수 없습니다.");
    }

    return {
      roomId: data.roomId,
      roomName: data.roomName,
      participantId: data.participantId,
      createdAt: data.createdAt,
    };
  } catch (error: any) {
    console.error("채팅방 입장 실패:", error);

    // 에러 메시지 처리
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("채팅방 입장에 실패했습니다.");
  }
};
