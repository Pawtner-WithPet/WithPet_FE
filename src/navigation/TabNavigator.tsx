import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import LostScreen from "../screens/Home/LostScreen";
import NoseResult from "../screens/Home/Nose/NoseResult";
import PetsScreen from "../screens/Home/Dog/PetsScreen";
import CustomTabBar from "../components/CustomTabBar";
import PetsStack from "./PetsStack";
import NoseStack from "./NoseStack";
import WalkScreen from "../screens/Home/WalkScreen";
import NoseImageR from "../screens/Home/Nose/NoseImageR";

export type TabParamList = {
  Walk: undefined;
  Lost: undefined;
  Pets: undefined;
  Nose: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "";
        const hideTabBarRoutes = ["NoseCamera", "NoseImagePick"];
        const isTabBarVisible = !hideTabBarRoutes.includes(routeName);

        return {
          headerShown: false,
          tabBarStyle: isTabBarVisible ? undefined : { display: "none" },
        };
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Walk" component={NoseImageR} />
      <Tab.Screen name="Lost" component={NoseResult} />
      <Tab.Screen name="Pets" component={PetsStack} />
      <Tab.Screen name="Nose" component={NoseStack} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
