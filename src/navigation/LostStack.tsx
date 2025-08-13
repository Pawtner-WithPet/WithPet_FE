import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LostPetListScreen from "../screens/Home/Lost/LostScreen";
import LostPetRegister from "../screens/Home/Lost/LostPetRegister";
import FoundPetRegister from "../screens/Home/Lost/FoundPetRegister";
import LostPostDetail from "../screens/Home/Lost/LostPostDetail";
import AIScreen from "../screens/Home/Lost/AIScreen";

export type LostStackParamList = {
  LostPetListScreen: undefined;
  LostPetRegister: undefined;
  FoundPetRegister: undefined;
  LostPostDetail: { post: any };
  AIScreen: { selectedPet?: string };
};

const Stack = createNativeStackNavigator<LostStackParamList>();

const LostStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LostPetListScreen" component={LostPetListScreen} />
      <Stack.Screen name="LostPetRegister" component={LostPetRegister} />
      <Stack.Screen name="FoundPetRegister" component={FoundPetRegister} />
      <Stack.Screen name="LostPostDetail" component={LostPostDetail} />
      <Stack.Screen name="AIScreen" component={AIScreen} />
    </Stack.Navigator>
  );
};

export default LostStack;
