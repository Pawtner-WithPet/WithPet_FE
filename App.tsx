import React from 'react';
import { View } from 'react-native';
import PetRegisterScreen from './src/screens/Home/PetRegisterScreen'; // ← 경로 정확히 맞게!

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <PetRegisterScreen />
    </View>
  );
};

export default App;
