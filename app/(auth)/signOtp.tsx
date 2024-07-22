import { View, SafeAreaView,KeyboardAvoidingView, Platform, StyleSheet, useColorScheme } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText as Text } from "@/components/ThemedText";
import Otp from "../components/Otp";
import OTPInput from 'react-native-otp-textinput';
import { Colors } from "@/constants/Colors";
import Button from "../components/Button";

const SignOtp = () => {
    const [otp, setOtp] = useState<string>("");
    const colorScheme = useColorScheme();
    const handleSubmit = () => {
        // Gérer la soumission du code OTP ici
        console.log("Code OTP soumis :", otp);
      };
      const combinedOtpInputStyle = {
        ...styles.otpInput,
        color: Colors[colorScheme ?? "light"].text
      };
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        
      >
        <Text type="subtitle">Entrez le code OTP</Text>
        <Text style={styles.description}>
          Nous avons envoyé un code OTP à votre numéro de téléphone. Entrez le ci-dessous et cliquez sur continuer
        </Text>
        <OTPInput
          handleTextChange={setOtp}
          tintColor={Colors.main}
          offTintColor="#ccc"
          textInputStyle={combinedOtpInputStyle}
          containerStyle={styles.otpContainer}
          inputCount={6}
          inputCellLength={1}
          autoFocus
        />
        <Text style={styles.sendCode}>Vous n'avez pas de code ? <Text>Renvoyer</Text></Text>
        </KeyboardAvoidingView>
        
        <Button onPress={handleSubmit} />
      </SafeAreaView>
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
    // backgroundColor: '#fff',
  },
//   title: {
//     fontSize: 28,
//     marginBottom: 48,
//     color: '#333',
//     textAlign: 'center',
//   },
  description: {
    fontSize: 16,
    marginTop: 20,
    // marginBottom: 48,
    color: '#666',
  },
  otpContainer: {
    // width: '80%',
    // alignSelf: 'center',
    marginTop: 20,
  },
  otpInput: {
    width: 45,
    height: 45,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
  },
  sendCode:{
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    marginBottom: 20,
  }
});


export default SignOtp;
