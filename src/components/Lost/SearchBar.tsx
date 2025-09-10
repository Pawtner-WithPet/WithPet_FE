import React, { memo } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from "react-native";

type Props = {
  value: string;
  onChange: (t: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  iconStyle?: ImageStyle;
  iconSource?: ImageSourcePropType;
};

const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "지역 또는 견종으로 검색",
  containerStyle,
  inputStyle,
  iconStyle,
  iconSource,
}) => {
  return (
    <View style={[styles.searchWrapper, containerStyle]}>
      <TextInput
        style={[styles.searchInput, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
      <TouchableOpacity onPress={onSubmit} activeOpacity={0.8}>
        {iconSource ? <Image source={iconSource} style={[styles.searchIcon, iconStyle]} /> : null}
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

export default memo(SearchBar);
