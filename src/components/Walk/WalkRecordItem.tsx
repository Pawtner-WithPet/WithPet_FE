import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { WalkRecord, Pet } from "../../types/index";
import { PetTag } from "./PetTag";

interface WalkRecordItemProps {
  record: WalkRecord;
  pets?: Pet[];
  onPress: (record: WalkRecord) => void;
}

export const WalkRecordItem: React.FC<WalkRecordItemProps> = ({
  record,
  pets = [],
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(record)}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={styles.date}>{record.date}</Text>

          <View style={styles.timeRow}>
            <Image
              source={require("../../assets/icons/time.png")}
              style={styles.statIconImage}
            />
            <Text style={styles.timeText}>{record.time}</Text>
          </View>

          <View style={styles.speedRow}>
            <Image
              source={require("../../assets/icons/speed.png")}
              style={styles.statIconImage}
            />
            <Text style={styles.speedText}>{record.speed}</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.petContainer}>
            {pets.map((pet) => (
              <PetTag key={pet.id} pet={pet} />
            ))}
          </View>

          <View style={styles.distanceRow}>
            <Image
              source={require("../../assets/icons/map.png")}
              style={styles.mapIconImage}
            />
            <Text style={styles.distanceText}>{record.distance}</Text>
          </View>
        </View>
      </View>

      <View style={styles.chevron}>
        <Image
          source={require("../../assets/icons/icon_detail_page.png")}
          style={styles.chevronIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  date: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  timeIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  timeText: {
    fontSize: 14,
    color: "#666",
  },
  speedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  speedIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  speedText: {
    fontSize: 14,
    color: "#666",
  },
  moodContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  petContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanceIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  distanceText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4262FF",
  },
  statIconImage: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  mapIconImage: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: "#4262FF",
  },
  chevron: {
    paddingRight: 16,
  },
  chevronIcon: {
    width: 38,
    height: 38,
    tintColor: "#000000",
  },
});
