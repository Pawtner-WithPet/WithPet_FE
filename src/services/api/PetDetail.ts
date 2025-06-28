// 반려견 상세 정보 타입 정의
export interface PetDetail {
  petId: number; // 실제 petId 추가
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
  neuterYn: string; // 'Y' or 'N'
  dogImg?: string;
  createdAt?: string;
  updatedAt?: string;
}

// API 베이스 URL (환경에 맞게 수정)
const API_BASE_URL = "http://10.0.2.2:8080"; // 실제 서버 주소로 변경 (예시)

/**
 * dogRegNo로 petId 조회
 * @param dogRegNo - 반려견 등록번호
 * @returns Promise<{ petId: number }>
 */
export const getPetIdByRegNo = async (
  dogRegNo: string,
): Promise<{ petId: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pet/regNo/${dogRegNo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("petId 조회 실패:", error);
    throw new Error("반려견 ID 조회에 실패했습니다.");
  }
};

/**
 * 반려견 상세 정보 조회
 * @param petId - 반려견 ID (숫자형 petId)
 * @returns Promise<PetDetail>
 */
export const getPetDetail = async (petId: string): Promise<PetDetail> => {
  console.log("getPetDetail 호출됨, petId:", petId);
  console.log("요청 URL:", `${API_BASE_URL}/api/pet/${petId}`);

  try {
    const response = await fetch(`${API_BASE_URL}/api/pet/${petId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 필요시 인증 헤더 추가
        // 'Authorization': `Bearer ${token}`,
      },
      // Android에서 네트워크 보안 정책으로 인한 문제 해결을 위한 옵션
      // React Native에서는 기본적으로 HTTPS만 허용됨
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response error text:", errorText);

      if (response.status === 404) {
        throw new Error("반려견 정보를 찾을 수 없습니다.");
      } else if (response.status === 500) {
        throw new Error("서버 오류가 발생했습니다.");
      } else {
        throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
      }
    }

    const data: PetDetail = await response.json();
    console.log("받아온 데이터:", data);
    return data;
  } catch (error) {
    console.error("반려견 상세 정보 조회 실패:", error);

    // 네트워크 연결 오류 체크
    if (
      error instanceof TypeError &&
      error.message.includes("Network request failed")
    ) {
      throw new Error("네트워크 연결을 확인해주세요.");
    }

    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(
        "반려견 상세 정보를 불러오는 중 알 수 없는 오류가 발생했습니다.",
      );
    }
  }
};

/**
 * 반려견 정보 업데이트 (특징 수정)
 * @param petId - 반려견 ID
 * @param updateData - 업데이트할 데이터
 * @returns Promise<PetDetail>
 */
export const updatePetDetail = async (
  petId: number,
  updateData: { features: string },
): Promise<PetDetail> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pet/${petId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 필요시 인증 헤더 추가
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data: PetDetail = await response.json();
    return data;
  } catch (error) {
    console.error("반려견 정보 업데이트 실패:", error);
    throw new Error("반려견 정보 업데이트에 실패했습니다.");
  }
};

/**
 * 반려견 프로필 이미지 업데이트
 * @param petId - 반려견 ID
 * @param formData - 이미지 FormData
 * @returns Promise<{ success: boolean; imageUrl?: string }>
 */
export const updatePetImage = async (
  petId: number,
  formData: FormData,
): Promise<{ success: boolean; imageUrl?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pet/${petId}/image`, {
      method: "POST",
      headers: {
        // FormData 사용시 Content-Type 헤더를 설정하지 않음 (자동 설정됨)
        // 필요시 인증 헤더만 추가
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("반려견 이미지 업데이트 실패:", error);
    throw new Error("반려견 이미지 업데이트에 실패했습니다.");
  }
};

/**
 * 반려견 정보 갱신 (외부 API에서 최신 정보 가져오기)
 * @param petId - 반려견 ID
 * @param refreshData - 갱신 요청 데이터
 * @returns Promise<{ success: boolean }>
 */
export const renewPetInfo = async (
  petId: number,
  refreshData: object,
): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pet/${petId}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 필요시 인증 헤더 추가
      },
      body: JSON.stringify(refreshData),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("반려견 정보 갱신 실패:", error);
    throw new Error("반려견 정보 갱신에 실패했습니다.");
  }
};
