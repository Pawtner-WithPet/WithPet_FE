import React, { memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";

export type PetCardData = {
  id: string;
  status: "실종" | "발견";
  dateTime: string;
  location: string;
  breed: string;
  image?: any; // { uri: string } | require(...)
};

type Props = {
  item: PetCardData;
  onPress: (item: PetCardData) => void;
  arrowIconSource: ImageSourcePropType; 
};

const PetCard: React.FC<Props> = ({ item, onPress, arrowIconSource }) => {
  const isLost = item.status === "실종";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(item)}
      style={styles.card}
      accessibilityRole="button"
      accessibilityLabel={`${item.status} 게시글, ${item.breed}, ${item.location}, ${item.dateTime}`}
    >
      <View
        style={[styles.badge, isLost ? styles.badgeLost : styles.badgeFound]}
      >
        <Text style={styles.badgeText}>{item.status}</Text>
      </View>

      <Image
        source={item.image}
        style={styles.image}
        defaultSource={item.image}
      />

      <View style={styles.cardInfo}>
        <Text style={styles.dateText}>{item.dateTime}</Text>
        <Text style={styles.locationText}>{item.location}</Text>
        <Text style={styles.breedText}>{item.breed}</Text>
      </View>

      <Image source={arrowIconSource} style={styles.arrowIcon} />
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
    top: 5,
    left: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 30,
  },
  badgeLost: { backgroundColor: "#F64C4C" },
  badgeFound: { backgroundColor: "#0086FF" },
  badgeText: { color: "#fff", fontSize: 18 },
  image: { width: 90, height: 90, borderRadius: 100, marginRight: 12 },
  cardInfo: { flex: 1 },
  dateText: { fontWeight: "bold", fontSize: 18 },
  locationText: { fontSize: 17, color: "#999" },
  breedText: { fontSize: 17, color: "#999" },
  arrowIcon: { width: 40, height: 40, tintColor: "#000", marginLeft: 8 },
});

export default memo(PetCard);
