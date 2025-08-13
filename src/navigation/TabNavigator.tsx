import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  getFocusedRouteNameFromRoute,
  NavigatorScreenParams,
} from "@react-navigation/native";
import LostScreen from "../screens/Home/Lost/LostScreen";
import PetsScreen from "../screens/Home/Dog/PetsScreen";
import CustomTabBar from "../components/CustomTabBar";
import PetsStack from "./PetsStack";
import LostStack from "./LostStack";
import NoseStack, { NoseStackParamList } from "./NoseStack";
import WalkScreen from "../screens/Home/WalkScreen";

import MyPageStack, {MyPageStackParamList} from "./MyPageStack";

export type TabParamList = {
  Walk: undefined;
  Lost: undefined;
  Pets: undefined;
  Nose: NavigatorScreenParams<NoseStackParamList>; 
  MyPage: NavigatorScreenParams<MyPageStackParamList>; 
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
      <Tab.Screen name="Walk" component={WalkScreen} />
      <Tab.Screen name="Lost" component={LostStack} />
      <Tab.Screen name="Pets" component={PetsStack} />
      <Tab.Screen name="Nose" component={NoseStack} />
      
    </Tab.Navigator>
  );
};

export default TabNavigator;
