import React from "react";
import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import { Colors } from "../constants/colors";

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
      <ImageBackground
        source={require("../assets/images/bg_shape.png")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.marker}>
          <Image source={image} style={styles.avatar} />
        </View>
      </ImageBackground>
      <View style={styles.pointer} />
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
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    elevation: 3,
  },
  markerContainer: {
    width: 80,
    alignItems: "center",
  },
  background: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    resizeMode: "contain",
  },
  marker: {
    width: 70,
    height: 70,
    borderRadius: 30,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
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
    borderTopColor: Colors.primaryLight,
  },
  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  line: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  label: {
    fontWeight: "600",
  },
});
