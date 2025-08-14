import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatList from "../screens/Home/Mypage/ChatList";
import MyAnimals from "../screens/Home/Mypage/MyAnimals";
import ProfileEdit from "../screens/Home/Mypage/ProfileEdit";
import AddProfile from "../screens/Home/Mypage/AddProfile";
import Header from "../components/Header";

export type MyPageStackParamList = {
  ChatList: undefined;
  MyAnimals: undefined;
  ProfileEdit: undefined;
  AddProfile: undefined;
};

const Stack = createNativeStackNavigator<MyPageStackParamList>();



const MyPageStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="MyAnimals" component={MyAnimals} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="AddProfile" component={AddProfile} />
    </Stack.Navigator>
  );
};

export default MyPageStack;
