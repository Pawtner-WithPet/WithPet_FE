import axios from "axios";
import { API_BASE_URL } from "@env";

// 공통 axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
});

// 비문 결과 항목 타입
export interface NoseResultItem {
  petId: number;
  resultId: number;
  matchRate: number;
  nosePrintImg: string;
  isMyMissingPet: boolean;
}

// 비문 결과 응답 타입
export interface NoseResultResponse {
  searchId: number;
  ownerId: number;
  nosePrintImg: string;
  searchLocation: string;
  searchDatetime: string;
  searchType: "lost" | "found";
  result: NoseResultItem[];
}

// 비문 결과 조회 API
export const fetchNoseResult = async (
  searchId: number,
): Promise<NoseResultResponse | null> => {
  try {
    const response = await api.get<{ data: NoseResultResponse }>(
      `/api/noseprint/list/${searchId}`,
    );
    console.log("🔍 비문 결과 응답 데이터:", response.data);
    return response.data.data;
  } catch (error: any) {
    console.error("🐾 Failed to fetch noseprint result:", error.message);
    if (error.response) {
      console.error("📦 서버 응답 상태:", error.response.status);
      console.error("📦 서버 응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("🚫 요청이 전송됐으나 응답이 없습니다:", error.request);
    } else {
      console.error("❗ 알 수 없는 에러:", error.message);
    }
    return null;
  }
};

// 비문 결과 저장 요청 타입
export interface SaveNoseResultRequest {
  searchId: number;
  ownerId: number;
  nosePrintId: number;
  matchRate: number;
  isMyMissingPet: boolean;
}

// 비문 결과 저장 API
export const saveNoseprintResult = async (
  body: SaveNoseResultRequest,
): Promise<boolean> => {
  try {
    const response = await api.post("/api/noseprint/result", body);
    console.log("✅ 비문 결과 저장 성공:", response.data);
    return true;
  } catch (error: any) {
    console.error("❌ Failed to save noseprint result:", error.message);
    if (error.response) {
      console.error("📦 서버 응답 상태:", error.response.status);
      console.error("📦 서버 응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("🚫 요청이 전송됐으나 응답이 없습니다:", error.request);
    } else {
      console.error("❗ 알 수 없는 에러:", error.message);
    }
    return false;
  }
};
