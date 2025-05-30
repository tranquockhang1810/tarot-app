import { Provider } from "@ant-design/react-native";
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import useColor from "@/src/hooks/useColor";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/src/context/auth/useAuth";
import appCheck from '@react-native-firebase/app-check';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from "react";
import enUS from '@ant-design/react-native/lib/locale-provider/en_US';
import { MessageProvider } from "@/src/context/socket/useMessage";

export default function RootLayout() {
  const screens = ["index", "(anonymous)", "(tabs)", "(routes)"];
  const { brandPrimary, brandPrimaryTap } = useColor();

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync('overlay-swipe');
  }, []);

  useEffect(() => {
    appCheck().activate(
      'play-integrity',
      true
    );
  }, []);

  return (
    <AuthProvider>
      <MessageProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: brandPrimary }}>
            <Provider
              locale={enUS}
              theme={{
                brand_primary: brandPrimary,
                ghost_button_color: brandPrimaryTap,
                primary_button_fill: brandPrimary,
                primary_button_fill_tap: brandPrimaryTap,
                prefix_padding: 0,
              }}
            >
              <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
              <Stack screenOptions={{ headerShown: false }}>
                {screens.map((screen, index) => (
                  <Stack.Screen key={index} name={screen} options={{ headerShown: false }} />
                ))}
              </Stack>
            </Provider>
          </View>
        </GestureHandlerRootView>
      </MessageProvider>
    </AuthProvider>
  );
}
