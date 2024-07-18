import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

import { ThemedView as View } from "@/components/ThemedView";
import { hp } from "@/helpers/common";

const { height } = Dimensions.get("window");

const Login = () => {
  const scrollAnim = useRef(new Animated.Value(0)).current;

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
    <View>
      <SafeAreaView>
        <View style={styles.imageContainer}>
          <Animated.Image 
            source={require("../assets/images/login.png")} 
            style={[styles.image, { transform: [{ translateY: translateY1 }] }]} 
          />
          <Animated.Image 
            source={require("../assets/images/login_2.png")} 
            style={[styles.image, { transform: [{ translateY: translateY2 }] }]} 
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    width: "100%",
    height: hp(100),
  },
  image: {
    position: "absolute",
    width: "100%",
    height: height,
    resizeMode: "cover",
  },
});
