import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { Button, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Provider store={store}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auth)/login"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="(auth)/sign"
                options={{
                  headerShown: true, // Pour montrer le header
                  headerTitle: "Créer un compte", // Titre du header
                  headerStyle: {
                    backgroundColor: Colors[colorScheme ?? "light"].background, // Couleur de fond du header
                  },
                  headerTintColor: Colors[colorScheme ?? "light"].text, // Couleur du texte du header
                  headerTitleStyle: {
                    fontWeight: "bold", // Style du texte du titre
                  },
               
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <MaterialIcons
                        name="arrow-back-ios"
                        size={24}
                        color={Colors[colorScheme ?? "light"].text}
                      />
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
          </Provider>
        </ThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
