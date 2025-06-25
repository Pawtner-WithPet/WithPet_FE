import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { Colors } from "../../constants/colors";

type NoseCardProps = {
  date: string;
  location: string;
  percentage: string;
  image: any;
};

const NoseCard: React.FC<NoseCardProps> = ({
  date,
  location,
  percentage,
  image,
}) => (
  <View style={styles.card}>
    <View style={styles.markerContainer}>
      <View style={styles.marker}>
        <Image source={image} style={styles.avatar} />
      </View>
    </View>

    <View style={styles.info}>
      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.locationText}>{location}</Text>
      <Text style={styles.percentage}>{percentage}</Text>
    </View>
  </View>
);

export default NoseCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: Colors.card || "white",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  markerContainer: {
    width: 100,
    alignItems: "center",
  },
  marker: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight || "#B8D4FF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  pointer: {
    position: "absolute",
    bottom: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: Colors.primaryLight || "#B8D4FF",
  },
  info: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    color: Colors.text || "#333",
    marginBottom: 4,
    fontWeight: "500",
  },
  locationText: {
    fontSize: 14,
    marginBottom: 12,
  },
  percentage: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.text || "#333",
  },
});
