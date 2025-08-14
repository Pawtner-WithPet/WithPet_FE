// App.tsx
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./src/navigation/TabNavigator";
import { Colors } from "./src/constants/colors";
import NoseCamera from "./src/screens/Home/Nose/NoseCamera";
import NoseList from "./src/screens/Home/Nose/NoseList";
import NoseResult from "./src/screens/Home/Nose/NoseResult";

// ✅ Header에서 가져오지 말고 전용 파일에서만 가져온다
import { navigationRef } from "./src/navigation/RootNavigation";

const Stack = createNativeStackNavigator();

const App: React.FC = () => (
  <NavigationContainer ref={navigationRef}>
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.primaryLight} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="NoseCamera" component={NoseCamera} />
        <Stack.Screen name="NoseList" component={NoseList} />
        <Stack.Screen name="NoseResult" component={NoseResult} />
      </Stack.Navigator>
    </SafeAreaView>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
});

export default App;
