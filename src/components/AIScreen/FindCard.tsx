import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type FindCardProps = {
  date: string;
  location: string;
  status: string;
  image: string | null; // 타입을 string | null로 변경
  onPress?: () => void;
};

const FindCard: React.FC<FindCardProps> = ({
  date,
  location,
  status,
  image,
  onPress,
}) => {
  // 이미지 소스를 처리하는 함수
  const getImageSource = () => {
    if (image && typeof image === "string") {
      // URL 문자열인 경우
      return { uri: image };
    } else if (image) {
      // 로컬 이미지인 경우
      return image;
    } else {
      // 기본 이미지 (플레이스홀더)
      return require("../../assets/icons/placeholder.png"); // 기본 이미지 경로
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={getImageSource()}
          style={styles.dogImage}
          defaultSource={require("../../assets/icons/placeholder.png")} // 로딩 중 기본 이미지
          onError={(error) => console.log("Image loading error:", error)} // 에러 핸들링
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.statusText}>{status}</Text>
      </View>

      <Image
        source={require("../../assets/icons/Vector.png")}
        style={styles.chevronIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    alignItems: "center",
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 16,
    backgroundColor: "#E0E0E0", // 이미지 로딩 중 배경색
  },
  dogImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 2,
  },
  statusText: {
    fontSize: 14,
    color: "#666666",
  },
  chevronIcon: {
    width: 24,
    height: 24,
    tintColor: "#000000",
  },
});

export default FindCard;
