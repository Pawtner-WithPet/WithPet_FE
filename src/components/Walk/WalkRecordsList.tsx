import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { WalkRecord, Pet } from "../../types/index";
import { WalkRecordItem } from "./WalkRecordItem";

interface WalkRecordsListProps {
  records: WalkRecord[];
  pets: Pet[];
  onRecordPress: (record: WalkRecord) => void;
}

export const WalkRecordsList: React.FC<WalkRecordsListProps> = ({
  records,
  pets,
  onRecordPress,
}) => {
  const renderItem = ({ item }: { item: WalkRecord; index: number }) => (
    <WalkRecordItem record={{ ...item, isFavorite: false }} pets={pets} onPress={onRecordPress} />
  );

  return (
    <FlatList
      data={records}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.date}-${index}`}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingVertical: 8,
  },
});
