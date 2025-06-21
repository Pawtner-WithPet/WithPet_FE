export interface PetRegisterRequest {
  name: string;
  age: number;
  gender: "수컷" | "암컷";
  breed: string;
  regNumber: string;
  rfidCode: string;
  rfidType: string;
  orgName: string;
  orgPhone: string;
  feature: string;
}

export interface PetResponse {
  id: string;
  name: string;
  age: number;
  breed: string;
  gender: string;
  imageUrl: string | null;
}
