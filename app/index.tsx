import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  useColorScheme,
  Pressable,
} from "react-native";

import { ThemedView as View } from "@/components/ThemedView";
import { hp, wp } from "@/helpers/common";
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
    <View>
      <SafeAreaView>
        <View style={styles.imageContainer}>
          <LinearGradient
            colors={[
              "rgba(255,255,255,0)",
              "rgba(255,255,255,0.5)",
              Colors[colorScheme ?? "light"].background,
              Colors[colorScheme ?? "light"].background,
            ]}
            style={styles.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.8 }}
          />

          <Animated.Image
            source={require("../assets/images/login.png")}
            style={[styles.image, { transform: [{ translateY: translateY1 }] }]}
          />
          <Animated.Image
            source={require("../assets/images/login_2.png")}
            style={[styles.image, { transform: [{ translateY: translateY2 }] }]}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text>Pixels</Text>
          <Text>Every Pixel Tells a Story</Text>
          <View>
            <Pressable>
              <Text>Start Explore</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  imageContainer: {
    position: "absolute",
    width: "100%",
    height: hp(100),
    flex: 1,
  },
  image: {
    position: "absolute",
    width: "100%",
    // height: height,
    height: hp(100),
    resizeMode: "cover",
    zIndex: -1,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: wp(100),
    height: hp(65),
    zIndex: 5,
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    width: wp(100),
    height: hp(65),
    backgroundColor:"transparent",
    zIndex: 10,
  },
});
