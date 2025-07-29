import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type AISearchCardProps = {
  date: string;
  location: string;
  status: string;
  image: any;
  onPress?: () => void;
};

const AISearchCard: React.FC<AISearchCardProps> = ({
  date,
  location,
  status,
  image,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.card}>
    <View style={styles.imageContainer}>
      <Image source={image} style={styles.dogImage} />
    </View>

    <View style={styles.info}>
      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.locationText}>{location}</Text>
      <Text style={styles.statusText}>{status}</Text>
    </View>

    <Icon name="chevron-right" size={24} color="#CCCCCC" />
  </TouchableOpacity>
);

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
});

export default AISearchCard;
