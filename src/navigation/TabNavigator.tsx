import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LostScreen from "../screens/Home/LostScreen";
import PetsScreen from "../screens/Home/Dog/PetsScreen";
import CustomTabBar from "../components/CustomTabBar";
import PetsStack from "./PetsStack";
import NoseStack from "./NoseStack";
import NoseListScreen from "../screens/Home/Nose/NoseList";
import WalkScreen from "../screens/Home/WalkScreen";
import NoseImagePick from "../screens/Home/Nose/NoseImagePick";
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
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Walk" component={NoseImageR} />
      <Tab.Screen name="Lost" component={LostScreen} />
      <Tab.Screen name="Pets" component={PetsStack} />
      <Tab.Screen name="Nose" component={NoseListScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
