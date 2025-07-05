import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import NoseCamera from "../screens/Home/Nose/NoseCamera";
import NoseImageR from "../screens/Home/Nose/NoseImageRModal";

export type RootStackParamList = {
  Tabs: undefined;
  NoseCamera: { fromScreen?: "PetDetail" | "NoseList"; petId?: string };
  NoseImageR: { imageUri?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="NoseCamera" component={NoseCamera} />
      <Stack.Screen
        name="NoseImageR"
        component={NoseImageR}
        options={{
          presentation: "modal",
          contentStyle: { backgroundColor: "transparent" },
          animation: "fade",
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
