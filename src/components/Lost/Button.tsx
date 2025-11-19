import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

interface ButtonProps {
  icon?: any;             
  label?: string;          
  onPress: () => void;  
  style?: ViewStyle;       
  textStyle?: TextStyle;   
  iconStyle?: ImageStyle;  
}

const Button: React.FC<ButtonProps> = ({ icon, label, onPress, style, textStyle, iconStyle }) => {
  return (
    <TouchableOpacity style={[styles.fab, style]} onPress={onPress} activeOpacity={0.8}>
      {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
      {label && <Text style={[styles.label, textStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#3366FF",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: "#fff",
  },
  label: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    marginTop: -4,
  },
});

export default Button;
