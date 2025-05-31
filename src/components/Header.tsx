import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Colors } from '../constants/colors';

// 아이콘 파일은 assets/icons 아래에 두고 필요에 따라 바꿔주세요.
const ICONS = {
  logo: require('../assets/icons/logo.png'),
  bell: require('../assets/icons/bell.png'),
  user: require('../assets/icons/user.png'),
};

const Header: React.FC = () => (
  <View style={styles.container}>
    <StatusBar backgroundColor={Colors.primaryLight} barStyle="light-content" />
    <Image source={ICONS.logo} style={styles.logo} />
    <View style={styles.actions}>
      <TouchableOpacity>
        <Image source={ICONS.bell} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={ICONS.user} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: Colors.primaryLight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 24,
    resizeMode: 'contain',
  },
  actions: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 20,
    tintColor: '#fff',
  },
});

export default Header;
