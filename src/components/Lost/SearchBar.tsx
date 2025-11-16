import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import icon_search from "../../assets/icons/search.png";

interface SearchBarProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  onSearchTextChange,
  onSearch,
}) => {
  return (
    <View style={styles.searchWrapper}>
      <TextInput
        style={styles.searchInput}
        placeholder="지역 또는 견종으로 검색"
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={onSearchTextChange}
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity onPress={onSearch}>
        <Image source={icon_search} style={styles.searchIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: "#333",
    paddingVertical: 12,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: "#000",
    marginLeft: 8,
  },
});

export default SearchBar;
