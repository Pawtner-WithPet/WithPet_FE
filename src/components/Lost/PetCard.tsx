import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import icon_detail_page from "../../assets/icons/icon_detail_page.png";
import happy1 from "../../assets/images/happy1.png";

interface PetCardProps {
  status: "실종" | "발견";
  dateTime: string;
  location: string;
  breed: string;
  image: any;
  onPress: () => void;
}

const PetCard: React.FC<PetCardProps> = ({
  status,
  dateTime,
  location,
  breed,
  image,
  onPress,
}) => {
  const isLost = status === "실종";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >
      <View
        style={[styles.badge, isLost ? styles.badgeLost : styles.badgeFound]}
      >
        <Text style={styles.badgeText}>{status}</Text>
      </View>

      <Image source={image} style={styles.image} defaultSource={happy1} />
      <View style={styles.cardInfo}>
        <Text style={styles.dateText}>{dateTime}</Text>
        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.breedText}>{breed}</Text>
      </View>
      <Image source={icon_detail_page} style={styles.arrowIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -6,
    left: -6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeLost: {
    backgroundColor: "#F64C4C",
    width: 60,
    height: 30,
    top: 5,
    left: 10,
  },
  badgeFound: {
    width: 60,
    height: 30,
    top: 5,
    left: 10,
    backgroundColor: "#0086FF",
  },
  badgeText: {
    color: "#fff",
    fontSize: 18,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  locationText: {
    fontSize: 17,
    color: "#999",
  },
  breedText: {
    fontSize: 17,
    color: "#999",
  },
  arrowIcon: {
    width: 40,
    height: 40,
    tintColor: "#000",
    marginLeft: 8,
  },
});

export default PetCard;
