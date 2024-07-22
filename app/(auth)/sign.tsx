import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import AnimatedInput from "../components/AnimatedInput";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import Button from "../components/Button";
import { Colors } from "@/constants/Colors";
import CountryPicker, {
  Country,
  CountryCode,
  DARK_THEME,
  DEFAULT_THEME,
} from "react-native-country-picker-modal";
import { useRouter } from "expo-router";
const Sign = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const allowedCountryCodes: CountryCode[] = ["CD", "CG"]; // République Démocratique du Congo et République du Congo
  const [countryCode, setCountryCode] = useState<CountryCode>("CD");
  const [textSwitch, setTextSwitch] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const renderCountry = (country: Country) => (
    <Text>{country.cca2}</Text> // Affiche le code du pays
  );
  const nextScreen = () => {
    router.push("/signOtp");
  };

  return (
    <ThemedView style={{ flex: 1, padding: 20 }}>
      <SafeAreaView>
        <Text type="subtitle">Creer un compte</Text>
        <View style={{ marginTop: 20 }}>
          {textSwitch ? (
            <AnimatedInput label="Email" value={email} onChange={setEmail} />
          ) : (
            <View style={styles.signNumber}>
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withAlphaFilter
                withCallingCodeButton
                withCallingCode
                onSelect={(country) => setCountryCode(country.cca2)}
                theme={colorScheme === "dark" ? DARK_THEME : DEFAULT_THEME}
                countryCodes={allowedCountryCodes} // Limiter les pays affichés
                // Pass only allowed countries
              />
              <TextInput
                placeholder="Numero de Telephone"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={{
                  color: Colors[colorScheme ?? "light"].text,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              />
            </View>
          )}

          <Text
            onPress={() => setTextSwitch(!textSwitch)}
            style={styles.signOption}
          >
            Inscription par{textSwitch ? " Numéro de telephone" : " Email"}
          </Text>
          <View style={{ marginTop: 20 }}>
            <Button onPress={nextScreen} />
          </View>
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
  signOption: {
    fontSize: 12,
    color: Colors.gray_twitter,
  },
  signNumber: {
    flexDirection: "row",
    gap: 10,
    borderBottomWidth: 1,
    borderColor: Colors.gray_twitter,
  },
});
export default Sign;
