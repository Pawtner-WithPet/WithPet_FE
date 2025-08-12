import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

type KeywordTagsProps = {
  keywords: string[];
  onRemoveKeyword: (index: number) => void;
  onSearch: () => void;
};

const KeywordTags: React.FC<KeywordTagsProps> = ({
  keywords,
  onRemoveKeyword,
  onSearch,
}) => {
  if (keywords.length === 0) {
    return null; // 키워드가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}
        >
          {keywords.map((keyword, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{keyword}</Text>
              <TouchableOpacity
                onPress={() => onRemoveKeyword(index)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 16,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexDirection: "row",
    gap: 8,
    paddingRight: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    minWidth: 60,
  },
  tagText: {
    fontSize: 14,
    color: "#666666",
    marginRight: 6,
  },
  removeButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold",
    lineHeight: 16,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});

export default KeywordTags;
