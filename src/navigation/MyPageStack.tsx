import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatList from "../screens/Auth/Mypage/ChatList";
import Notifications from "../screens/Auth/Mypage/Notifications";
import MyAnimals from "../screens/Auth/Mypage/MyAnimals";
import ProfileEdit from "../screens/Auth/Mypage/ProfileEdit";
import AddProfile from "../screens/Auth/Mypage/AddProfile";
import LostPostDetail from "../screens/Home/Lost/LostPostDetail";
import ChatRoom from "../screens/Auth/Mypage/ChatRoom";
import Header from "../components/Header";

export type MyPageStackParamList = {
  ChatList: undefined;
  ChatRoom: undefined;
  MyAnimals: undefined;
  ProfileEdit: undefined;
  AddProfile: undefined;
  PetDetail: { petId: string };
  LostPostDetail: { post: any; from?: "MyAnimals" | string } | undefined;
  Notifications: undefined;
};

const Stack = createNativeStackNavigator<MyPageStackParamList>();

const MyPageStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="MyAnimals" component={MyAnimals} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="AddProfile" component={AddProfile} />
      <Stack.Screen name="PetDetail" component={LostPostDetail} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};

export default MyPageStack;
