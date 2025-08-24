import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NavigatorScreenParams } from "@react-navigation/native";

import TabNavigator from "./src/navigation/TabNavigator";
import MyPageStack, {
  MyPageStackParamList,
} from "./src/navigation/MyPageStack";
import { Colors } from "./src/constants/colors";

import NoseCamera from "./src/screens/Home/Nose/NoseCamera";
import NoseList from "./src/screens/Home/Nose/NoseList";
import NoseResult from "./src/screens/Home/Nose/NoseResult";
import LostPetRegister from "./src/screens/Home/Lost/LostPetRegister";
import FoundPetRegister from "./src/screens/Home/Lost/FoundPetRegister";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import SignUpScreen from "./src/screens/Auth/SignUpScreen";
import ChatRoom from "./src/screens/Auth/Mypage/ChatRoom"; 

// 루트 스택 타입 정의
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  MainTabs: undefined;
  MyPageStack: NavigatorScreenParams<MyPageStackParamList>;
  NoseCamera: undefined;
  NoseList: undefined;
  NoseResult: { noseId?: string } | undefined;
  LostPetRegister: undefined;
  FoundPetRegister: undefined;
  ChatRoom: { roomId?: string; title?: string; subtitle?: string; avatar?: any;} | undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => (
  <NavigationContainer>
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <RootStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {/* Auth */}
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="SignUp" component={SignUpScreen} />

        {/* Main */}
        <RootStack.Screen name="MainTabs" component={TabNavigator} />
        <RootStack.Screen name="MyPageStack" component={MyPageStack} />

        {/* Nose Screens */}
        <RootStack.Screen name="NoseCamera" component={NoseCamera} />
        <RootStack.Screen name="NoseList" component={NoseList} />
        <RootStack.Screen name="NoseResult" component={NoseResult} />

        {/* Lost & Found */}
        <RootStack.Screen name="LostPetRegister" component={LostPetRegister} />
        <RootStack.Screen
          name="FoundPetRegister"
          component={FoundPetRegister}
        />

        {/* Chat */}
        <RootStack.Screen name="ChatRoom" component={ChatRoom} />
      </RootStack.Navigator>
    </SafeAreaView>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
});

export default App;
