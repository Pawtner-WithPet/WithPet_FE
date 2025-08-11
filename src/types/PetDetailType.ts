export interface PetDetail {
  petId: number;
  userId: number;
  dogRegNo: string;
  dogNm: string;
  dogAge: number;
  kindNm: string;
  sexNm: string;
  rfidCd: string;
  rfidGubun: string;
  orgNm: string;
  officeTel: string;
  features: string;
  neuterYn: string;
  dogImg?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PetInfo {
  name: string;
  age: string;
  breed: string;
  gender: string;
  registrationNumber: string;
  rfidCode: string;
  rfidLocation: string;
  organization: string;
  phoneNumber: string;
  features: string;
  neutered: string;
  profileImage?: string;
}

// 성별 옵션
export interface GenderOption {
  label: string;
  value: string;
}

// 중성화 옵션
export interface NeuteredOption {
  label: string;
  value: string;
}

// 펫 업데이트 요청 타입
export interface UpdatePetPayload {
  userId: number;
  features: string;
}

// 이미지 업로드 타입
export interface ImageUploadData {
  uri: string;
  name: string;
  type: string;
}
