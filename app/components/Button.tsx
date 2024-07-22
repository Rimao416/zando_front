import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";


interface ButtonPropos {
    onPress: () => void;

}
const Button:React.FC<ButtonPropos> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <Text style={[{ color: "white" }, styles.buttonText]}>Continuer</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
    borderRadius: 25,
    paddingVertical: 10,
    backgroundColor: Colors.main,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Button;
