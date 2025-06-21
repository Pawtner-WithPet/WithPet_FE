import axios from 'axios';
import type { PetRegisterRequest } from '../types/pet';

export const registerPet = async (data: PetRegisterRequest, token: string) => {
  const response = await axios.post('/services/api/pet/register', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
