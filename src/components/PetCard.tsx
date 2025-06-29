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
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    elevation: 3,
    alignItems: "center", // 세로 중앙 정렬
  },
  markerContainer: {
    width: 110,
    alignItems: "center",
    justifyContent: "center", // 세로 중앙 정렬
  },
  marker: {
    width: 108,
    height: 108,
    borderRadius: 100,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 108,
    height: 108,
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
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
