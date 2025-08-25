import React, { useRef, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  Pressable,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Colors } from "../constants/colors";
import {
  useNavigation,
  type NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { MyPageStackParamList } from "../navigation/MyPageStack";

const ICONS = {
  logo: require("../assets/icons/logo.png"),
  bell: require("../assets/icons/bell.png"),
  user: require("../assets/icons/user.png"),
  enter_image: require("../assets/icons/enter_image.png"),
  chat: require("../assets/icons/chat.png"),
  my_pet: require("../assets/icons/my_pet.png"),
  setting: require("../assets/icons/setting.png"),
};

type RootStackParamList = {
  MainTabs: undefined;
  MyPageStack: NavigatorScreenParams<MyPageStackParamList>;
  NoseCamera: undefined;
  NoseList: undefined;
  NoseResult: { noseId?: string } | undefined;
};

const { width } = Dimensions.get("window");
const MENU_WIDTH = Math.min(300, Math.round(width * 0.78));

const Header: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const slideX = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const [nickname] = useState("닉네임");
  const [profileUri] = useState<string | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openMenu = () => {
    setMenuVisible(true);
    Animated.parallel([
      Animated.timing(slideX, {
        toValue: 0,
        duration: 220,
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
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start(() => setMenuVisible(false));
  };

  return (
    <>
      {/* StatusBar 검은색 아이콘 */}
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* SafeAreaView로 StatusBar 겹침 방지 */}
      <SafeAreaView style={{ backgroundColor: Colors.background }}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={openMenu}>
            <Image source={ICONS.user} style={styles.icon} />
          </TouchableOpacity>
          <Image source={ICONS.logo} style={styles.logo} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MyPageStack", { screen: "Notifications" })
            }
          >
            <Image source={ICONS.bell} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {isMenuVisible && (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <Animated.View style={[StyleSheet.absoluteFill, { zIndex: 1 }]}>
            <Animated.View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "rgba(0,0,0,0.35)",
                opacity: backdropOpacity,
              }}
            />
            <Pressable onPress={closeMenu} style={StyleSheet.absoluteFill} />
          </Animated.View>

          <Animated.View
            style={[
              styles.sidePanel,
              { transform: [{ translateX: slideX }], zIndex: 2 },
            ]}
          >
            {/* 상단 닫기 버튼 */}
            <TouchableOpacity
              onPress={closeMenu}
              style={styles.closeBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            {/* 프로필 영역 */}
            <View style={styles.profileContainer}>
              <View style={styles.profileImageWrapper}>
                <View style={styles.petImage}>
                  {profileUri ? (
                    <Image
                      source={{ uri: profileUri }}
                      style={styles.petImageIcon}
                    />
                  ) : (
                    <Image
                      source={ICONS.enter_image}
                      style={styles.enterImageIcon}
                    />
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={styles.nicknameBtn}
                onPress={() => {
                  closeMenu();
                  navigation.navigate("MyPageStack", { screen: "ProfileEdit" });
                }}
              >
                <Text style={styles.nickname}>{nickname}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* 메뉴 목록 */}
            <MenuRow
              label="채팅목록"
              icon={ICONS.chat}
              onPress={() => {
                closeMenu();
                navigation.navigate("MyPageStack", { screen: "ChatList" });
              }}
            />
            <View style={styles.divider} />
            <MenuRow
              label="등록했던 동물 목록"
              icon={ICONS.my_pet}
              onPress={() => {
                closeMenu();
                navigation.navigate("MyPageStack", { screen: "MyAnimals" });
              }}
            />
            <View style={styles.divider} />
            <MenuRow
              label="프로필 수정"
              icon={ICONS.setting}
              onPress={() => {
                closeMenu();
                navigation.navigate("MyPageStack", { screen: "ProfileEdit" });
              }}
            />
            <View style={styles.divider} />

            <View style={styles.logoutWrap}>
              <TouchableOpacity style={styles.logoutBtn}>
                <Text style={styles.logoutText}>로그아웃</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </>
  );
};

const MenuRow: React.FC<{ icon: any; label: string; onPress: () => void }> = ({
  icon,
  label,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Image source={icon} style={[styles.menuIcon, { tintColor: "black" }]} />
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    backgroundColor: Colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    elevation: 4,
  },
  logo: { width: 46, height: 23, resizeMode: "contain" },
  icon: { width: 24, height: 24, tintColor: "black" },

  sidePanel: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: Math.min(300, Math.round(Dimensions.get("window").width * 0.78)),
    backgroundColor: "#fff",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  closeBtn: { alignSelf: "flex-end", padding: 6 },
  closeText: { fontSize: 18, color: "#6B7280" },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  profileImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: "#EEE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  petImageIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 100,
  },
  enterImageIcon: { width: 40, height: 40, resizeMode: "contain" },

  nicknameBtn: { flexDirection: "row", alignItems: "center" },
  nickname: { fontSize: 22, fontWeight: "bold", marginRight: 10 },

  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 12 },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  menuIcon: { width: 20, height: 20, resizeMode: "contain", marginRight: 12 },
  menuLabel: { fontSize: 15, fontWeight: "500", color: "#111" },

  logoutWrap: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingLeft: 8,
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "flex-start",
    backgroundColor: "#F5F6F8",
  },
  logoutText: { fontSize: 12, fontWeight: "600", color: "#6B7280" },
});

export default Header;
