import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
  onSearch: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => (
  <View style={styles.container}>
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="키워드로 검색"
        placeholderTextColor="#CCCCCC"
      />
      <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
        <Image
          source={require("../../assets/icons/search.png")}
          style={styles.searchIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333333",
  },
  searchButton: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
});

export default SearchBar;
