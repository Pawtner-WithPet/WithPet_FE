import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface WalkData {
  date: string;
  time: string;
  duration: string;
  distance: string;
  speed: string;
}

interface WalkInfoCardProps {
  walkData: WalkData;
}

export const WalkInfoCard: React.FC<WalkInfoCardProps> = ({ walkData }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.dateTimeText}>
        {walkData.date} / {walkData.time}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>🕐</Text>
          <Text style={styles.statLabel}>시간</Text>
          <Text style={styles.statValue}>{walkData.duration}</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statIcon}>📏</Text>
          <Text style={styles.statLabel}>거리</Text>
          <Text style={styles.statValue}>{walkData.distance}</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statIcon}>⚡</Text>
          <Text style={styles.statLabel}>속도</Text>
          <Text style={styles.statValue}>{walkData.speed}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  dateTimeText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#888888",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4262FF",
  },
});
