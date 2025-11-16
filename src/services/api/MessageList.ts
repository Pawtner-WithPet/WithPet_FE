import api from "./api";
import axios from "axios";
import { API_BASE_URL } from "@env";

export type ApiChatRoom = {
  roomId: number;
  opponentId: number;
  opponentNickname: string;
  opponentProfileImg: string | null;
  lastMessageContent: string;
  lastMessageAt: string;
  unreadCount: number;
};

// API 호출 함수
export const getChatRooms = async (): Promise<ApiChatRoom[]> => {
  try {
    const response = await axios.get<{ data: ApiChatRoom[] }>(
      `${API_BASE_URL}/api/chat/rooms`,
    );

    console.log("✅ 채팅방 목록 응답:", response.data);

    return response.data.data;
  } catch (error: any) {
    console.error("🐶 채팅방 목록 조회 실패:", error.message);

    if (error.response) {
      console.error("📦 서버 응답 상태:", error.response.status);
      console.error("📦 서버 응답 데이터:", error.response.data);

      if (error.response.status === 401) {
        throw new Error("인증되지 않은 사용자입니다. 다시 로그인해주세요.");
      }
    } else if (error.request) {
      console.error("🚫 요청은 전송되었으나 응답이 없습니다:", error.request);
    } else {
      console.error("❗ 알 수 없는 에러:", error.message);
    }

    throw new Error("서버 오류 또는 네트워크 오류가 발생했습니다.");
  }
};
