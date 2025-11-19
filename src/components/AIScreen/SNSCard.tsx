import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

interface SNSCardProps {
  keywords: string;
  platform: string;
  image: any;
  onPress: () => void;
}

const SNSCard: React.FC<SNSCardProps> = ({
  keywords,
  platform,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.profileImage} />
      </View>

      <View style={styles.info}>
        <Text style={styles.keywords}>{keywords}</Text>
        <Text style={styles.platform}>{platform}</Text>
      </View>

      <Image
        source={require("../../assets/icons/Vector.png")}
        style={styles.chevronIcon}
        resizeMode="contain"
      />
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
  keywords: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  platform: {
    fontSize: 14,
    color: "#666666",
  },
  chevronIcon: {
    width: 24,
    height: 24,
    tintColor: "#000000",
  },
});

export default SNSCard;
