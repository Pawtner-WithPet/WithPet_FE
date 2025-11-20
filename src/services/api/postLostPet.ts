import axios from "axios";
import { API_BASE_URL } from "@env";
import { UploadImage } from "../../types/UploadImage";

type LostPetRequest = {
  owner: number;
  pet: number;
  height: number;
  weight: number;
  lostDate: string;
  lostLocation: string;
  favoritePlace: string;
  description: string;
};

export const postLostPet = async (
  requestData: LostPetRequest,
  imageFile: UploadImage | null   
) => {
  const formData = new FormData();
  formData.append("request", JSON.stringify(requestData));
  if (imageFile !== null) {
    formData.append("image", {
      uri: imageFile.uri,
      type: imageFile.type,
      name: imageFile.fileName,
    } as any); 
  }

  const response = await axios.post(
    `${API_BASE_URL}/api/search/lostPost`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
