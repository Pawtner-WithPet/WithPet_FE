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
  <View style={styles.container}>
    {/* 가짜 그림자 */}
    <View style={styles.fakeShadow} />

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
  </View>
);

export default PetCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    marginHorizontal: 16,
    marginVertical: 8,
    marginBottom: 16,
    position: "relative",
  },

  fakeShadow: {
    position: "absolute",
    top: 3,
    left: 2,
    right: -2,
    bottom: -3,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    borderRadius: 12,
    zIndex: 0,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#D9D9D940",
    borderColor: "#B9B9B9",
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    zIndex: 1,
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
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 108,
    height: 108,
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 100,
  },
  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  line: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
    marginBottom: 4,
  },
  label: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
  },
});
