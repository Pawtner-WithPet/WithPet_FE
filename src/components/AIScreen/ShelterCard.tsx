import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

type ShelterCardProps = {
  name: string; // shelterName
  location: string; // shelterLocation
  contact: string; // shelterTel
  image: string; // petImg
  foundLocation?: string; // foundLocation (추가)
  feature?: string; // feature (추가)
  onPress?: () => void;
};

const ShelterCard: React.FC<ShelterCardProps> = ({
  name,
  location,
  contact,
  image,
  foundLocation,
  feature,
  onPress,
}) => {
  // 이미지 소스를 처리하는 함수
  const getImageSource = () => {
    if (image && typeof image === "string") {
      return { uri: image };
    } else if (image) {
      return image;
    } else {
      return require("../../assets/icons/placeholder.png"); // 기본 이미지
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={getImageSource()}
          style={styles.petImage}
          defaultSource={require("../../assets/icons/placeholder.png")}
          onError={(error) =>
            console.log("Shelter image loading error:", error)
          }
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.shelterNameText}>{name}</Text>

        {foundLocation && (
          <Text style={styles.foundLocationText}>
            발견위치: {foundLocation}
          </Text>
        )}

        {feature && <Text style={styles.featureText}>특징: {feature}</Text>}

        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.contactText}>연락처: {contact}</Text>
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
    alignItems: "flex-start", // 상단 정렬로 변경
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 16,
    backgroundColor: "#E0E0E0",
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    paddingVertical: 4,
  },
  shelterNameText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 6,
  },
  foundLocationText: {
    fontSize: 13,
    color: "#2196F3",
    marginBottom: 4,
    fontWeight: "500",
  },
  featureText: {
    fontSize: 13,
    color: "#FF9800",
    marginBottom: 4,
    fontWeight: "500",
  },
  locationText: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
    lineHeight: 16,
  },
  contactText: {
    fontSize: 13,
    color: "#333333",
    fontWeight: "600",
  },
  chevronIcon: {
    width: 24,
    height: 24,
    tintColor: "#000000",
    marginTop: 4,
  },
});

export default ShelterCard;
