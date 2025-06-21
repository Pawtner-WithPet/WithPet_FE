import React from 'react';
import { Button, Alert } from 'react-native';
import { renewDogInfo } from '../services/api/dog';

const RenewButton = () => {
  const handleRenew = async () => {
    try {
      const result = await renewDogInfo({
        dogRegNo: "410100008128355",
        rfidCd: "410100008128355",
        ownerNm: "김지선",
        ownerBirth: "770505",
        userId: 1,
      });

      if (result.status === 200) {
        Alert.alert("성공", result.message);
        console.log("갱신된 정보:", result.data);
      } else {
        Alert.alert("실패", result.message || "갱신에 실패했습니다.");
      }
    } catch (e) {
      Alert.alert("에러", "서버 오류로 갱신에 실패했습니다.");
    }
  };

  return <Button title="정보 갱신" onPress={handleRenew} />;
};

export default RenewButton;
