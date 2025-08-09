import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
  onAddKeyword: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onAddKeyword,
}) => (
  <View style={styles.container}>
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="견종,발견장소,성별 등을 키워드로 검색"
        placeholderTextColor="#CCCCCC"
      />
      <TouchableOpacity onPress={onAddKeyword} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
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
  addButton: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
  },
  addButtonText: {
    fontSize: 20,
    color: "#666666",
    fontWeight: "500",
  },
});

export default SearchBar;
