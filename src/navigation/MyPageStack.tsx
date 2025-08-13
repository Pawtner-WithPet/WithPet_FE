import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatList from "../screens/Home/Mypage/ChatList";
import MyAnimals from "../screens/Home/Mypage/MyAnimals";
import ProfileEdit from "../screens/Home/Mypage/ProfileEdit";
import LostPostDetail from "../screens/Home/Lost/LostPostDetail";

export type MyPageStackParamList = {
  ChatList: undefined;
  MyAnimals: undefined;
  ProfileEdit: undefined;
  LostPostDetail: { post: any; from?: string };
};

const Stack = createNativeStackNavigator<MyPageStackParamList>();

const MyPageStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="MyAnimals" component={MyAnimals} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="LostPostDetail" component={LostPostDetail} />
    </Stack.Navigator>
  );
};

export default MyPageStack;
