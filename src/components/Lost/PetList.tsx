import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import PetCard from "./PetCard";
import EmptyListView from "./EmptyListView";

interface CombinedPetData {
  id: string;
  status: "실종" | "발견";
  gender?: "male" | "female";
  name?: string;
  age?: string;
  breed: string;
  height?: string;
  weight?: string;
  feature?: string;
  extra?: string;
  dateTime: string;
  location: string;
  image?: any;
  postId: number;
  sex: string;
  imgUrl?: string | null;
}

interface PetListProps {
  data: CombinedPetData[];
  isRefreshing: boolean;
  isLoading: boolean;
  searchText: string;
  onRefresh: () => void;
  onCardPress: (item: CombinedPetData) => void;
}

const PetList: React.FC<PetListProps> = ({
  data,
  isRefreshing,
  isLoading,
  searchText,
  onRefresh,
  onCardPress,
}) => {
  const renderItem = ({ item }: { item: CombinedPetData }) => (
    <PetCard
      status={item.status}
      dateTime={item.dateTime}
      location={item.location}
      breed={item.breed}
      gender={item.gender} 
      image={item.image}
      onPress={() => onCardPress(item)}
    />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={["#3366FF"]}
          tintColor="#3366FF"
        />
      }
      ListEmptyComponent={
        <EmptyListView isLoading={isLoading} searchText={searchText} />
      }
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 120,
  },
});

export default PetList;
