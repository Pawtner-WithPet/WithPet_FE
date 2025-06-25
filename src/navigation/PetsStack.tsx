import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PetsScreen from "../screens/Home/Dog/PetsScreen";
import PetDetailScreen from "../screens/Home/Dog/PetDetail";

export type PetsStackParamList = {
  PetsScreen: undefined;
  PetDetailScreen: { petId: string };
};

const Stack = createNativeStackNavigator<PetsStackParamList>();

const PetsStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PetsScreen" component={PetsScreen} />
      <Stack.Screen name="PetDetailScreen" component={PetDetailScreen} />
    </Stack.Navigator>
  );
};

export default PetsStack;
