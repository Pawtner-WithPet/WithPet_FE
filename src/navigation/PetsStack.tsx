import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PetsScreen from "../screens/Home/PetsScreen";
import InfoScreen from "../screens/Home/InfoScreen";

export type PetsStackParamList = {
  PetsScreen: undefined;
  DogDetailScreen: { petId: string };
};

const Stack = createNativeStackNavigator<PetsStackParamList>();

const PetsStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PetsScreen" component={PetsScreen} />
      <Stack.Screen name="DogDetailScreen" component={InfoScreen} />
    </Stack.Navigator>
  );
};

export default PetsStack;
