import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { Colors } from '../../constants/colors';

const LostScreen: React.FC = () => (
  <View>
    <Header />
    <View>
      <Text>실종 신고 화면</Text>
    </View>
  </View>
);



export default LostScreen;
