import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HourPicker = () => {
  const [hour, setHour] = useState('0');

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>시간 선택</Text>

      <View style={styles.pickerBox}>
        <Picker
          selectedValue={hour}
          onValueChange={(val) => setHour(val)}
          dropdownIconColor="#000"
        >
          {[...Array(24).keys()].map(h => (
            <Picker.Item key={h} label={`${h} 시`} value={`${h}`} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  pickerBox: {
    width: 160,
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default HourPicker;
