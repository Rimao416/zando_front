import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import AnimatedInput from "../components/AnimatedInput";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Button from "../components/Button";
const Sign = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <ThemedView style={{ flex: 1,padding: 20 }}>
      <SafeAreaView>
        <Text type="subtitle">Creer un compte</Text>
        <View style={{ marginTop: 20 }}>
        <AnimatedInput label="Nom" value={name} onChange={setName} />
        <AnimatedInput label="Email" value={email} onChange={setEmail} />
        <AnimatedInput
          label="Mot de passe"
          value={password}
          onChange={setPassword}
        />
        <Button />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#f4511e",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
export default Sign;
