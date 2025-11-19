import { useState, useEffect } from "react";
import {
  LostPet,
  FoundPet,
  UserLostPet,
  formatDate,
  fetchLostPetList,
  fetchFoundPetList,
  fetchCurrentUserLostPets,
} from "../../services/api/AIScreen";
import happy1 from "../../assets/images/happy1.png";

export interface CombinedPetData {
  id: string;
  status: "실종" | "발견";
  gender?: "male" | "female";
  name?: string;
  age?: string;
  breed: string;
  height?: string;
  weight?: string;
  feature?: string;
  extra?: string;
  dateTime: string;
  location: string;
  image?: any;
  postId: number;
  sex: string;
  imgUrl?: string | null;
}

const convertGender = (sex: string): "male" | "female" | undefined => {
  if (sex === "MALE" || sex === "수컷") return "male";
  if (sex === "FEMALE" || sex === "암컷") return "female";
  return undefined;
};

const transformPetData = (
  lostPets: LostPet[],
  foundPets: FoundPet[],
): CombinedPetData[] => {
  const transformedLost: CombinedPetData[] = lostPets.map((pet) => ({
    id: `lost-${pet.postId}`,
    status: "실종" as const,
    gender: convertGender(pet.sex),
    breed: pet.kindNm,
    dateTime: formatDate(pet.lostDate),
    location: pet.lostLocation,
    postId: pet.postId,
    sex: pet.sex,
    imgUrl: pet.imgUrl,
    image: pet.imgUrl ? { uri: pet.imgUrl } : happy1,
  }));

  const transformedFound: CombinedPetData[] = foundPets.map((pet) => ({
    id: `found-${pet.postId}`,
    status: "발견" as const,
    gender: convertGender(pet.sex),
    breed: pet.kindNm,
    dateTime: formatDate(pet.foundDate),
    location: pet.foundLocation,
    postId: pet.postId,
    sex: pet.sex,
    imgUrl: pet.imgUrl,
    image: pet.imgUrl ? { uri: pet.imgUrl } : happy1,
  }));

  return [...transformedLost, ...transformedFound].sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
  );
};

export const usePetData = () => {
  const [lostPets, setLostPets] = useState<LostPet[]>([]);
  const [foundPets, setFoundPets] = useState<FoundPet[]>([]);
  const [combinedPets, setCombinedPets] = useState<CombinedPetData[]>([]);
  const [userLostPets, setUserLostPets] = useState<UserLostPet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadUserLostPets = async () => {
    try {
      console.log("사용자 실종 반려견 목록 로딩 중...");
      const userPets = await fetchCurrentUserLostPets();
      setUserLostPets(userPets);
      console.log("사용자 실종 반려견 목록 로딩 완료:", userPets);
    } catch (error) {
      console.error("사용자 실종 반려견 목록 로딩 오류:", error);
      setUserLostPets([]);
    }
  };

  const loadPetData = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);

    try {
      console.log("반려동물 데이터 로딩 시작...");

      const [lostData, foundData] = await Promise.all([
        fetchLostPetList(),
        fetchFoundPetList(),
      ]);

      console.log("실종동물 데이터:", lostData);
      console.log("발견동물 데이터:", foundData);

      setLostPets(lostData);
      setFoundPets(foundData);

      const combined = transformPetData(lostData, foundData);
      setCombinedPets(combined);

      console.log("데이터 로딩 완료, 총", combined.length, "건");
    } catch (error) {
      console.error("데이터 로딩 중 오류:", error);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([loadPetData(false), loadUserLostPets()]);
    setIsRefreshing(false);
  };

  const handleSearch = (searchText: string) => {
    if (!searchText.trim()) {
      const combined = transformPetData(lostPets, foundPets);
      setCombinedPets(combined);
      return;
    }

    const searchKeyword = searchText.trim().toLowerCase();
    const combined = transformPetData(lostPets, foundPets);

    const filtered = combined.filter(
      (pet) =>
        pet.location.toLowerCase().includes(searchKeyword) ||
        pet.breed.toLowerCase().includes(searchKeyword),
    );

    setCombinedPets(filtered);
    console.log(`검색 결과: ${filtered.length}건 (검색어: ${searchKeyword})`);
  };

  useEffect(() => {
    loadPetData();
    loadUserLostPets();
  }, []);

  return {
    lostPets,
    foundPets,
    combinedPets,
    userLostPets,
    isLoading,
    isRefreshing,
    setIsLoading,
    loadPetData,
    loadUserLostPets,
    onRefresh,
    handleSearch,
    convertGender,
  };
};
