// App.tsx
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";
import { Colors } from "./src/constants/colors";
import NoseCamera from "./src/screens/Home/Nose/NoseCamera";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoseImageR from "./src/screens/Home/Nose/NoseImageRModal";
import NoseList from "./src/screens/Home/Nose/NoseList";
import NoseResult from "./src/screens/Home/Nose/NoseResult";
import LostPetRegister from "./src/screens/Home/Lost/LostPetRegister";
import FoundPetRegister from "./src/screens/Home/Lost/FoundPetRegister";
import LoginScreen from "./src/screens/Auth/LoginScreen"; // 로그인 스크린 import

const Stack = createNativeStackNavigator();

const App: React.FC = () => (
  <NavigationContainer>
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.primaryLight}
      />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login" // 초기 화면을 Login으로 설정
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="NoseCamera" component={NoseCamera} />
        <Stack.Screen name="NoseList" component={NoseList} />
        <Stack.Screen name="NoseResult" component={NoseResult} />
        <Stack.Screen name="LostPetRegister" component={LostPetRegister} />
        <Stack.Screen name="FoundPetRegister" component={FoundPetRegister} />
      </Stack.Navigator>
    </SafeAreaView>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
});

export default App;
