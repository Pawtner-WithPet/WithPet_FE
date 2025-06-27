import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Colors } from "../constants/colors";

const ICONS = {
  Walk: {
    inactive: require("../assets/icons_bar/walking.png"),
    active: require("../assets/icons_bar/walking_active.png"),
  },
  Lost: {
    inactive: require("../assets/icons_bar/lost.png"),
    active: require("../assets/icons_bar/lost_active.png"),
  },
  Pets: {
    inactive: require("../assets/icons_bar/pet.png"),
    active: require("../assets/icons_bar/pet_active.png"),
  },
  Nose: {
    inactive: require("../assets/icons_bar/nose.png"),
    active: require("../assets/icons_bar/nose_active.png"),
  },
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, idx) => {
        const isFocused = state.index === idx;
        const { inactive, active } = ICONS[route.name as keyof typeof ICONS];

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(route.name)}
          >
            <Image source={isFocused ? active : inactive} style={styles.icon} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: Platform.select({ ios: 64, android: 87 }),
    borderTopWidth: 1,
    borderTopColor: Colors.card,
    backgroundColor: Colors.background,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 74,
    height: 43,
  },
});

export default CustomTabBar;
