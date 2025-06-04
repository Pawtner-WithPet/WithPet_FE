import React from "react";
import { SafeAreaView } from "react-native";
import DogDetailScreen from "./src/screens/Dog/DogDetailScreen";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DogDetailScreen />
    </SafeAreaView>
  );
};

export default App;
