import { useState } from "react";
import { fetchUserLostPets } from "../../services/api/LostScreen";
import { UserLostPet } from "../../types/Lost";

/**
 * 실종 반려견 목록을 관리하는 커스텀 훅
 */
export const useLostPetList = () => {
  const [userLostPets, setUserLostPets] = useState<UserLostPet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 실종 반려견 목록 로드
   */
  const loadLostPets = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("실종 반려견 목록 로딩 시작...");
      const pets = await fetchUserLostPets();
      setUserLostPets(pets);
      console.log("실종 반려견 목록 로딩 완료:", pets);
      return pets;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 오류";
      console.error("실종 반려견 목록 로딩 실패:", errorMessage);
      setError(errorMessage);
      setUserLostPets([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 반려견 목록 초기화
   */
  const clearLostPets = () => {
    setUserLostPets([]);
    setError(null);
  };

  return {
    userLostPets,
    isLoading,
    error,
    loadLostPets,
    clearLostPets,
  };
};
