import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  useColorScheme,
  View,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { ThemedText as Text } from "@/components/ThemedText";

const { height } = Dimensions.get("window");

const Login = () => {
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();

  useEffect(() => {
    const animate = () => {
      scrollAnim.setValue(0);
      Animated.loop(
        Animated.timing(scrollAnim, {
          toValue: height,
          duration: 25000, // Durée de l'animation en millisecondes
          useNativeDriver: true,
        })
      ).start();
    };
    animate();
  }, [scrollAnim]);

  const translateY1 = scrollAnim.interpolate({
    inputRange: [0, height],
    outputRange: [0, -height],
  });

  const translateY2 = scrollAnim.interpolate({
    inputRange: [0, height],
    outputRange: [height, 0],
  });

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Animated.Image
          source={require("../assets/images/login.png")}
          style={[styles.image, { transform: [{ translateY: translateY1 }] }]}
        />
        <Animated.Image
          source={require("../assets/images/login_2.png")}
          style={[styles.image, { transform: [{ translateY: translateY2 }] }]}
        />
        <LinearGradient
          colors={[
            colorScheme === "dark" ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)",
            colorScheme === "dark"
              ? "rgba(0,0,0,0.5)"
              : "rgba(255,255,255,0.5)",
            Colors[colorScheme ?? "light"].background,
            Colors[colorScheme ?? "light"].background,
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        >
          <View style={styles.textContainer}>
            <Image source={require("../assets/images/logo.png")} style={styles.logo} />
            <Text type="title">Bienvenue sur Zando</Text>
            <View style={styles.button}>
              <TouchableOpacity
                style={[{ backgroundColor: Colors.main }, styles.buttonWrapper]}
              >
                <Text style={[{ color: "white" }, styles.buttonText]}>
                  S'inscrire
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[{ backgroundColor: Colors.gray }, styles.buttonWrapper]}
              >
                <Text style={[{ color: "black" }, styles.buttonText]}>Se connecter</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.textConfidentialite}>
              En continuant, vous acceptez les Conditions d’utilisation de Zando
              et reconnaissez avoir lu notre Politique de confidentialité.
              Informations concernant la collecte de données
            </Text>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: height, // Ajuste la hauteur pour chaque image
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "65%", // Ajuste la hauteur selon tes besoins
    zIndex: 5,
  },
  textContainer: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    gap: 14,
  },
  button: {
    flexDirection: "column",
    gap: 10,
    width: "100%",
    marginTop: 10,
  },
  buttonWrapper: {
    width: "100%",
    borderRadius: 25,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  textConfidentialite: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 10,
  },
});
