import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

export const CustomText: React.FC<TextProps> = ({ style, ...props }) => (
  <Text style={[styles.regular, style]} {...props} />
);

export const MediumText: React.FC<TextProps> = ({ style, ...props }) => (
  <Text style={[styles.medium, style]} {...props} />
);

export const SemiBoldText: React.FC<TextProps> = ({ style, ...props }) => (
  <Text style={[styles.semiBold, style]} {...props} />
);

const styles = StyleSheet.create({
  regular: {
    fontFamily: "Roboto Regular",
  },
  medium: {
    fontFamily: "Roboto Medium",
  },
  semiBold: {
    fontFamily: "Roboto SemiBold",
  },
});
