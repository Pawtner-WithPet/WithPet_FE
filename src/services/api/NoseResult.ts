import axios from "axios";
import { API_BASE_URL } from "@env";

export interface NoseResultItem {
  petId: number;
  resultId: number;
  matchRate: number;
  nosePrintImg: string;
  isMyMissingPet: boolean;
}

export interface NoseResultResponse {
  searchId: number;
  ownerId: number;
  nosePrintImg: string;
  searchLocation: string;
  searchDatetime: string;
  searchType: "lost" | "found";
  result: NoseResultItem[];
}

export const fetchNoseResult = async (searchId: number): Promise<NoseResultResponse> => {
  const response = await axios.get(`${API_BASE_URL}/api/noseprint/list/${searchId}`);
  return response.data.data;
};



export interface SaveNoseResultRequest {
  searchId: number;
  ownerId: number;
  nosePrintId: number;
  matchRate: number;
  isMyMissingPet: boolean;
}

export const saveNoseprintResult = async (body: SaveNoseResultRequest) => {
  const response = await axios.post(`${API_BASE_URL}/api/noseprint/result`, body);
  return response.data;
};