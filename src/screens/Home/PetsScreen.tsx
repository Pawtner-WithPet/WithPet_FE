import React from 'react';
import { Colors } from '../../constants/colors';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import PetCard from '../../components/PetCard';


// 로컬 이미지 import (asset bundling)
const pets = [
  {
    id: '1',
    name: '해피',
    age: '1세',
    breed: '골든리트리버',
    gender: '암컷',
    image: require('../../assets/images/happy1.png'),
  },
  {
    id: '2',
    name: '나나나',
    age: '2세',
    breed: '말티즈',
    gender: '숫컷',
    image: require('../../assets/images/happy2.png'),
  },
];



const PetsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={pets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PetCard
            name={item.name}
            age={item.age}
            breed={item.breed}
            gender={item.gender}
            image={item.image}
          />
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 16,
  },
});


export default PetsScreen;
