import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LostPetListScreen from "../screens/Home/Lost/LostScreen";
import LostPetRegister from "../screens/Home/Lost/LostPetRegister";
import FoundPetRegister from "../screens/Home/Lost/FoundPetRegister";
import LostPostDetail from "../screens/Home/Lost/LostPostDetail";

export type LostStackParamList = {
  LostPetListScreen: undefined;
  LostPetRegister: undefined;
  FoundPetRegister: undefined;
  LostPostDetail: { petId: string } | { post: any };
};
const Stack = createNativeStackNavigator<LostStackParamList>();

const LostStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LostPetListScreen" component={LostPetListScreen} />
      <Stack.Screen name="LostPetRegister" component={LostPetRegister} />
      <Stack.Screen name="FoundPetRegister" component={FoundPetRegister} />
      <Stack.Screen name="LostPostDetail" component={LostPostDetail} />
    </Stack.Navigator>
  );
};

export default LostStack;
