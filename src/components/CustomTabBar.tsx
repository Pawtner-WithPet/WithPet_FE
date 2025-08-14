import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
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
} as const;

const DEFAULT_ICON = {
  inactive: require("../assets/icons_bar/walking.png"),
  active: require("../assets/icons_bar/walking_active.png"),
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

  const currentRoute = state.routes[state.index];
  const currentRouteName =
    getFocusedRouteNameFromRoute(currentRoute) || currentRoute.name;

  const hiddenTabs = new Set(["MyPage"]);
  const hideTabBarRoutes = ["NoseCamera", "NoseImagePick"];
  const shouldHideTabBar = hideTabBarRoutes.includes(currentRouteName);
  if (shouldHideTabBar) return null;

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom },
      ]}
    >
      {state.routes
      .filter((r) => !hiddenTabs.has(r.name))
      .map((route, idx) => {
        const isFocused = state.index === idx;
        const iconSet =
          (ICONS as Record<string, { inactive: any; active: any }>)[route.name] ??
          DEFAULT_ICON;

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => navigation.navigate(route.name as never)}
          >
            <Image
              source={isFocused ? iconSet.active : iconSet.inactive}
              style={styles.icon}
              resizeMode="contain"
            />
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
    backgroundColor: "#FFFFFF",
    elevation: 12,
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
