import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { Colors } from "../../constants/colors";
import locationIcon from "../../assets/icons/location.png";

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
      <View style={styles.percentageContainer}>
        <Text style={styles.percentageNumber}>{percentage}</Text>
        <Text style={styles.percentagePercent}>%</Text>
        <Text style={styles.percentageText}> 일치</Text>
      </View>
      <Text style={styles.dateText}>{date}</Text>
      <View style={styles.locationContainer}>
        <Image source={locationIcon} style={styles.locationIcon} />
        <Text style={styles.locationText}>{location}</Text>
      </View>
    </View>
  </View>
);

export default NoseCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#D9D9D940",
    borderColor: "#B9B9B9",
    borderWidth: 2,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    alignItems: "center",
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
    width: 96,
    height: 96,
    borderRadius: 35,
  },
  info: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
  },
  percentageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  percentageNumber: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#4262FF",
  },
  percentagePercent: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 2,
  },
  percentageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 4,
  },
  dateText: {
    fontSize: 18,
    color: Colors.text || "#333",
    marginBottom: 4,
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationIcon: {
    width: 22,
    height: 22,
    marginRight: 6,
    resizeMode: "contain",
  },
  locationText: {
    color: "#686767",
    fontSize: 16,
  },
});
