import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Dimensions,
  Pressable,
} from "react-native";
import { NavigationContainer, createNavigationContainerRef, NavigatorScreenParams  } from "@react-navigation/native";
import TabNavigator, { TabParamList } from "./src/navigation/TabNavigator";
import { Colors } from "./src/constants/colors";
import NoseCamera from "./src/screens/Home/Nose/NoseCamera";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoseImageR from "./src/screens/Home/Nose/NoseImageRModal";
import NoseList from "./src/screens/Home/Nose/NoseList";
import NoseResult from "./src/screens/Home/Nose/NoseResult";
import LostPetRegister from "./src/screens/Home/Lost/LostPetRegister";
import FoundPetRegister from "./src/screens/Home/Lost/FoundPetRegister";
import LostPostDetail from "./src/screens/Home/Lost/LostPostDetail";


import ChatList from "./src/screens/Home/Mypage/ChatList";
import MyAnimals from "./src/screens/Home/Mypage/MyAnimals";
import AddProfile from "./src/screens/Home/Mypage/AddProfile";
import ProfileEdit from "./src/screens/Home/Mypage/ProfileEdit";




const Stack = createNativeStackNavigator();
const { width } = Dimensions.get("window");
const MENU_WIDTH = Math.min(300, Math.round(width * 0.78));
const enter_image = require('./src/assets/icons/enter_image.png');
const icon_detail_page = require('./src/assets/icons/icon_detail_page.png');
const chat = require('./src/assets/icons/chat.png');
const my_pet = require('./src/assets/icons/my_pet.png');
const setting = require('./src/assets/icons/setting.png');

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

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

interface Props {
  profileUri?: string | null;
  nickname: string;
  onPress?: () => void;
}


const App: React.FC = () => {
  const [isMenuMounted, setMenuMounted] = useState(false); 
  const slideX = useRef(new Animated.Value(-MENU_WIDTH)).current; 
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const [nickname, setNickname] = useState("닉네임");
  const [profileUri, setProfileUri] = useState<string | null>(null);
  const onPress = () => {
    closeMenu();
    if (navigationRef.isReady()) {
      navigationRef.navigate("ProfileEdit");
    }
  };

  const openMenu = () => {
    if (!isMenuMounted) setMenuMounted(true);
    Animated.parallel([
      Animated.timing(slideX, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideX, {
        toValue: -MENU_WIDTH,
        duration: 200,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) setMenuMounted(false);
    });
  };

  // 전역 핸들러 (Header에서 호출)
  useEffect(() => {
    globalThis.__openSideMenu = openMenu;
    globalThis.__closeSideMenu = closeMenu;
    return () => {
      if (globalThis.__openSideMenu) delete globalThis.__openSideMenu;
      if (globalThis.__closeSideMenu) delete globalThis.__closeSideMenu;
    };
  }, []);


  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.primaryLight} />

        {/* 사이드 메뉴 오버레이 (모든 화면 위) */}
        {isMenuMounted && (
          <View
            style={StyleSheet.absoluteFill}
            pointerEvents="box-none"
          >
            <Animated.View style={[StyleSheet.absoluteFill, { zIndex: 1 }]}>
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: "rgba(0,0,0,0.35)", opacity: backdropOpacity },
                ]}
              />
              <Pressable
                onPress={closeMenu}
                style={StyleSheet.absoluteFill}
                android_ripple={{ color: "transparent" }}
              />
            </Animated.View>

            <Animated.View
              style={[
                styles.sidePanel,
                {
                  transform: [{ translateX: slideX }],
                  zIndex: 2,
                  elevation: 8, 
                },
              ]}
              pointerEvents="auto"
            >
              {/* 닫기 버튼 */}
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={closeMenu}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>

              {/* 프로필 영역 */}
              <View style={styles.profileContainer}>
                <View style={styles.profileImageWrapper}>
                  <View style={styles.petImage}>
                    {profileUri ? (
                      <Image source={{ uri: profileUri }} style={styles.petImageIcon} />
                    ) : (
                      <Image source={enter_image} style={styles.enterImageIcon} />
                    )}
                  </View>
                </View>

                <TouchableOpacity style={styles.nicknameBtn} onPress={onPress}>
                  <Text style={styles.nickname}>{nickname}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.divider} />

              {/* 메뉴 */}
              <MenuRow
                label="채팅목록"
                icon={chat}
                tintColor="#000"
                onPress={() =>
                   {
                  closeMenu();
                  if (navigationRef.isReady()) navigationRef.navigate("ChatList");
                }}
              />
              <View style={styles.divider} />
              <MenuRow
                label="등록했던 동물 목록"
                icon={my_pet}
                onPress={() => {
                  closeMenu();
                  if (navigationRef.isReady()) navigationRef.navigate("MyAnimals");
                }}
              />
              <View style={styles.divider} />
              <MenuRow
                label="프로필 수정"
                icon={setting}
                onPress={() => {
                  closeMenu();
                  if (navigationRef.isReady()) navigationRef.navigate("ProfileEdit");
                }}
              />
              <View style={styles.divider} />

              {/* 로그아웃 */}
              <View style={styles.footer}>
                <TouchableOpacity style={styles.logoutBtn} onPress={() => { closeMenu(); /* TODO: logout */ }}>
                  <Text style={styles.logoutText}>로그아웃</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        )}

        {/* 네비게이션 */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="NoseCamera" component={NoseCamera} />
          <Stack.Screen name="NoseList" component={NoseList} />
          <Stack.Screen name="NoseResult" component={NoseResult} />
          <Stack.Screen name="LostPetRegister" component={LostPetRegister} />
          <Stack.Screen name="FoundPetRegister" component={FoundPetRegister} /> 
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="MyAnimals" component={MyAnimals} />
          <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
          <Stack.Screen name="AddProfile" component={AddProfile} />
          <Stack.Screen name="LostPostDetail" component={LostPostDetail} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

// 사이드 메뉴 아이템
const MenuRow: React.FC<{ label: string; icon: any; onPress?: () => void; tintColor?: string }> = ({ label, icon, onPress, tintColor }) => (
  <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.8}>
    <Image source={icon} style={[styles.rowIcon, tintColor && { tintColor }]} />
    <Text style={styles.rowText}>{label}</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sidePanel: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: Colors.background,
    paddingTop: 18,
    paddingHorizontal: 16,
    elevation: 8,
  },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 6,
  },
  closeText: { fontSize: 18, color: "#6B7280" },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  profileImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  petImageIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  enterImageIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  nicknameBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 10,
  },
  chevron: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 12,
  },
  rowText: {
    fontSize: 17,
    color: "#111",
    fontWeight: "500",
  },

  footer: { flex: 1, justifyContent: "flex-end", paddingBottom: 16 },
  logoutBtn: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#F5F6F8",
  },
  logoutText: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
});

export default App;
