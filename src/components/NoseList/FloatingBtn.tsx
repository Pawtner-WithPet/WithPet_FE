// components/FloatingButton.tsx
import React from "react";
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";

type FloatingButtonProps = {
  icon: ImageSourcePropType;
  onPress: () => void;
  style?: ViewStyle;
};

const FloatingBtn: React.FC<FloatingButtonProps> = ({
  icon,
  onPress,
  style,
}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Image source={icon} style={styles.icon} resizeMode="contain" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: "#4262FF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  icon: {
    width: 50,
    height: 50,
    tintColor: "white",
  },
});

export default FloatingBtn;
