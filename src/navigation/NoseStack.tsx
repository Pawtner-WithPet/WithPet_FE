import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoseListScreen from "../screens/Home/Nose/NoseScreeen";

export type NoseStackParamList = {
  NoseListScreen: undefined;
  NoseDetailScreen: { petId: string };
};

const Stack = createNativeStackNavigator<NoseStackParamList>();

const NoseStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NoseListScreen" component={NoseListScreen} />
    </Stack.Navigator>
  );
};

export default NoseStack;
