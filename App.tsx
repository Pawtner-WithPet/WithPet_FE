import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";
import { Colors } from "./src/constants/colors";
import NoseCamera from "./src/screens/Home/Nose/NoseCamera";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoseList from "./src/screens/Home/Nose/NoseList";
import NoseResult from "./src/screens/Home/Nose/NoseResult";
import LostPetRegister from "./src/screens/Home/Lost/LostPetRegister";
import FoundPetRegister from "./src/screens/Home/Lost/FoundPetRegister";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import SignUpScreen from "./src/screens/Auth/SignUpScreen";

const Stack = createNativeStackNavigator();

const App: React.FC = () => (
  <NavigationContainer>
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
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
