import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { Colors } from "../constants/colors";

const ICONS = {
  logo: require("../assets/icons/logo.png"),
  bell: require("../assets/icons/bell.png"),
  user: require("../assets/icons/user.png"),
};

const Header: React.FC = () => (
  <View style={styles.container}>
    {/* 왼쪽: 유저 아이콘 */}
    <TouchableOpacity>
      <Image source={ICONS.user} style={styles.icon} />
    </TouchableOpacity>

    {/* 중앙: 로고 */}
    <Image source={ICONS.logo} style={styles.logo} />

    {/* 오른쪽: 알림 아이콘 */}
    <TouchableOpacity>
      <Image source={ICONS.bell} style={styles.icon} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 24,
    height:
      56 + (Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) : 0),
    backgroundColor: Colors.background,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 4,
  },
  logo: {
    width: 46,
    height: 23,
    resizeMode: "contain",
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "black",
  },
});

export default Header;
