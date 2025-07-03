import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
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
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

  // 현재 포커스된 루트 이름 가져오기
  const currentRoute = state.routes[state.index];
  const currentRouteName =
    getFocusedRouteNameFromRoute(currentRoute) || currentRoute.name;

  // 숨겨야 할 화면들
  const hideTabBarRoutes = ["NoseCamera", "NoseImagePick"];
  const shouldHideTabBar = hideTabBarRoutes.includes(currentRouteName);

  // 탭바를 숨겨야 하는 경우 null 반환
  if (shouldHideTabBar) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, idx) => {
        const isFocused = state.index === idx;
        const { inactive, active } = ICONS[route.name as keyof typeof ICONS];

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={() => navigation.navigate(route.name)}
          >
            <Image
              source={isFocused ? active : inactive}
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
