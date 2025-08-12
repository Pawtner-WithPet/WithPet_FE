import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PetsScreen from "../screens/Home/Dog/PetsScreen";
import PetDetailScreen from "../screens/Home/Dog/PetDetail";
import NoseListScreen from "../screens/Home/Nose/NoseList";

export type PetsStackParamList = {
  PetsScreen: undefined;
  PetDetailScreen: { id: number };
  NoseList: undefined; // NoseList 추가
  NoseCamera: {
    fromScreen?: "PetDetail" | "NoseList";
    petId?: number;
    hasNoseprint?: boolean;
  };
};

const Stack = createNativeStackNavigator<PetsStackParamList>();

const PetsStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PetsScreen" component={PetsScreen} />
      <Stack.Screen name="PetDetailScreen" component={PetDetailScreen} />
      <Stack.Screen name="NoseList" component={NoseListScreen} />
    </Stack.Navigator>
  );
};

export default PetsStack;
