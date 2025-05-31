// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WalkScreen from '../screens/Home/WalkScreen';
import LostScreen from '../screens/Home/LostScreen';
import PetsScreen from '../screens/Home/PetsScreen';
import InfoScreen from '../screens/Home/InfoScreen';
import CustomTabBar from '../components/CustomTabBar';

export type TabParamList = {
  Walk: undefined;
  Lost: undefined;
  Pets: undefined;
  Info: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}

      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Walk" component={WalkScreen} />
      <Tab.Screen name="Lost" component={LostScreen} />
      <Tab.Screen name="Pets" component={PetsScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
