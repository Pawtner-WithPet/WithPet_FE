// src/navigation/RootNavigation.ts
import { createNavigationContainerRef } from '@react-navigation/native';
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { TabParamList } from '../navigation/TabNavigator'; // 타입 전용 import

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  NoseCamera: undefined;
  NoseList: undefined;
  NoseResult: undefined;
  LostPetRegister: undefined;
  FoundPetRegister: undefined;
  ChatList: undefined;
  MyAnimals: undefined;
  ProfileEdit: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params as any);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
