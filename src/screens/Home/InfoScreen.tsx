import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import { Colors } from '../../constants/colors';

const InfoScreen: React.FC = () => (
  <View>
    <Header />
    <View>
      <Text>비문(정보) 화면</Text>
    </View>
  </View>
);


export default InfoScreen;
