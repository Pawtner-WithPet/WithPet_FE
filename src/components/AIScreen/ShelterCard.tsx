import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

interface ShelterCardProps {
  name: string;
  location: string;
  contact: string;
  image: any;
  onPress: () => void;
}

const ShelterCard: React.FC<ShelterCardProps> = ({
  name,
  location,
  contact,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.profileImage} />
      </View>

      <View style={styles.info}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.contactText}>{contact}</Text>
      </View>
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
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
  },
  nameText: {
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
  contactText: {
    fontSize: 14,
    color: "#666666",
  },
});

export default ShelterCard;
