import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoseListScreen from "../screens/Home/Nose/NoseList";
import NoseCamera from "../screens/Home/Nose/NoseCamera";
import NoseImagePick from "../screens/Home/Nose/NoseImagePickModal";
import NoseImageR from "../screens/Home/Nose/NoseImageRModal";

export type NoseCameraRouteParams = {
  fromScreen?: "PetDetail" | "NoseList";
  petId?: string;
};

export type NoseStackParamList = {
  NoseCamera: NoseCameraRouteParams;
  NoseImagePick: {
    imageUri: string;
  };
  NoseImageR: {
    imageUri: string;
  };
  NoseListScreen: undefined;
  NoseDetailScreen: { petId: string };
};

const Stack = createNativeStackNavigator<NoseStackParamList>();

const NoseStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NoseListScreen" component={NoseListScreen} />
      <Stack.Screen name="NoseCamera" component={NoseCamera} />
    </Stack.Navigator>
  );
};

export default NoseStack;
