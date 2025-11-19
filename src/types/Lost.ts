export interface UserLostPet {
  petId: number;
  dogNm: string;
  kindNm: string;
  status: string;
  age?: number;
  breed?: string;
  sex?: string;
  weight?: number;
  height?: number;
  imgUrl?: string | null;
}

// 게시글 타입 (LOST 또는 FOUND)
export type PostType = "LOST" | "FOUND";

// 실종동물 타입
export type LostPet = {
  postId: number;
  type: string;
  lostDate: string;
  lostLocation: string;
  kindNm: string;
  sex: string;
  imgUrl: string | null;
};

// 발견동물 타입
export type FoundPet = {
  postId: number;
  type: string;
  foundDate: string;
  foundLocation: string;
  kindNm: string;
  sex: string;
  imgUrl: string | null;
};

// 보호소 정보 타입
export type ShelterInfo = {
  petImg: string;
  foundLocation: string;
  feature: string;
  shelterName: string;
  shelterLocation: string;
  shelterTel: string;
};

// 상세 정보 데이터 타입
export type PetDetailData = {
  type: string;
  postId: number;
  ownerId: number;
  imgUrl: string | null;
  dogNm: string;
  kindNm: string;
  sex: string;
  age: number | null;
  features: string | null;
  lostDate: string;
  lostLocation: string;
  description: string;
  height: number | null;
  weight: number | null;
  favoritePlace: string | null;
  createdAt: string;
};
