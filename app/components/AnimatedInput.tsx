import { Colors } from "@/constants/Colors";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";

interface AnimatedInputProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const colorScheme = useColorScheme();
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value !== "" ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelStyle = {
    position: "absolute" as "absolute",
    left: 0,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 2],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        Colors[colorScheme ?? "light"].text,
        Colors[colorScheme ?? "light"].text,
      ],
      // outputRange: ["#aaa", "#aaa"],
    }),
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableWithoutFeedback onPress={handleFocus}>
        <View style={styles.innerContainer}>
          <Animated.Text style={labelStyle}>{label}</Animated.Text>
          <TextInput
            style={[
              { color: Colors[colorScheme ?? "light"].text },
              styles.input,
            ]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={onChange}
            value={value}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    position: "relative",
    borderBottomWidth: 1,
    borderColor: Colors.gray_twitter,
    borderRadius: 10,
    // paddingVertical: 10,
    paddingHorizontal: 8,
  },
  innerContainer: {
    position: "relative",
  },
  input: {
    height: 40,
    fontSize: 16,
    marginTop: 10,
  },
});

export default AnimatedInput;