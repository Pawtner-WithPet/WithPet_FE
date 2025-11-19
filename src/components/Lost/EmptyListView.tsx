import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface EmptyListViewProps {
  isLoading: boolean;
  searchText: string;
}

const EmptyListView: React.FC<EmptyListViewProps> = ({
  isLoading,
  searchText,
}) => {
  const getMessage = () => {
    if (isLoading) return "데이터를 불러오는 중...";
    if (searchText.trim()) return "검색 결과가 없습니다";
    return "등록된 정보가 없습니다";
  };

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{getMessage()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default EmptyListView;
