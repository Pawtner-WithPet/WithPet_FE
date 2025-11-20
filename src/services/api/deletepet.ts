// deletepet.ts
import axios from "axios";
import { API_BASE_URL } from "@env";

export const deleteFoundPost = async (postId: number) => {
  try {
    const res = await axios.delete(
      `${API_BASE_URL}/api/search/done/found-post/${postId}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (err: any) {
    if (err.response) throw err.response.data; // 404, 500
    throw new Error("SERVER_ERROR");
  }
};

export const deleteLostPost = async (postId: number) => {
  try {
    const res = await axios.delete(
      `${API_BASE_URL}/api/search/done/lost-post/${postId}`,
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (err: any) {
    if (err.response) throw err.response.data;
    throw new Error("SERVER_ERROR");
  }
};
