import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";
import { Colors } from "./src/constants/colors";
import NoseCamera from "./src/screens/Home/Nose/NoseCamera";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoseImageR from "./src/screens/Home/Nose/NoseImageRModal";

const Stack = createNativeStackNavigator();

const App: React.FC = () => (
  <NavigationContainer>
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.primaryLight}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="NoseCamera" component={NoseCamera} />
      </Stack.Navigator>
    </SafeAreaView>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
});

export default App;
