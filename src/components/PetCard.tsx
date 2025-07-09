import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type PetCardProps = {
  name: string;
  age: string;
  breed: string;
  gender: string;
  image: any;
};

const PetCard: React.FC<PetCardProps> = ({
  name,
  age,
  breed,
  gender,
  image,
}) => (
  <View style={styles.card}>
    <View style={styles.markerContainer}>
      <View style={styles.marker}>
        <Image source={image} style={styles.avatar} />
      </View>
    </View>

    <View style={styles.info}>
      <Text style={styles.line}>
        <Text style={styles.label}>이름: </Text>
        {name}
      </Text>
      <Text style={styles.line}>
        <Text style={styles.label}>나이: </Text>
        {age}
      </Text>
      <Text style={styles.line}>
        <Text style={styles.label}>견종: </Text>
        {breed}
      </Text>
      <Text style={styles.line}>
        <Text style={styles.label}>성별: </Text>
        {gender}
      </Text>
    </View>
  </View>
);

export default PetCard;

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
    width: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 108,
    height: 108,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatar: {
    width: 97,
    height: 97,
    borderRadius: 97,
  },
  info: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
  },
  line: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    marginBottom: 4,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontFamily: "Roboto-Bold",
    color: "#000",
  },
});
