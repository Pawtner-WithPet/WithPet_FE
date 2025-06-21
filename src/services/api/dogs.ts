import axios from "axios";

export type Dog = {
  dogRegNo: string;
  dogNm: string;
  dogAge: number;
  kindNm: string;
  sexNm: string;
  dogImg: string | null;
};

const API_URL = "api/pet/list";

export const fetchDogs = async (token: string): Promise<Dog[]> => {
  try {
    const response = await axios.get<{ status: number; data: Dog[] }>(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
    return [];
  }
};
