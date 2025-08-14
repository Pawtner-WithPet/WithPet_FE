import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import type { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './src/navigation/TabNavigator';
import { Colors } from './src/constants/colors';
import NoseCamera from './src/screens/Home/Nose/NoseCamera';
import NoseList from './src/screens/Home/Nose/NoseList';
import NoseResult from './src/screens/Home/Nose/NoseResult';
import MyPageStack, { MyPageStackParamList } from './src/navigation/MyPageStack';

// 루트 스택 타입
type RootStackParamList = {
  MainTabs: undefined; // TabNavigator 등록 이름과 일치시켜 주세요
  MyPageStack: NavigatorScreenParams<MyPageStackParamList>;
  NoseCamera: undefined;
  NoseList: undefined;
  NoseResult: { noseId?: string } | undefined;
};

const Root = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => (
  <NavigationContainer >
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.primaryLight} />
      <Root.Navigator screenOptions={{ headerShown: false }}>
        <Root.Screen name="MainTabs" component={TabNavigator} />
        <Root.Screen name="MyPageStack" component={MyPageStack} />
        <Root.Screen name="NoseCamera" component={NoseCamera} />
        <Root.Screen name="NoseList" component={NoseList} />
        <Root.Screen name="NoseResult" component={NoseResult} />
      </Root.Navigator>
    </SafeAreaView>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
});

export default App;
