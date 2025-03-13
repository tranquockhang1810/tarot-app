import { ExpoConfig, ConfigContext } from '@expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "tarot-app",
  slug: "tarot-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true
  },
  android: {
    googleServicesFile: "./google-services.json",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    permissions: [
      "INTERNET",
      "ACCESS_NETWORK_STATE"
    ],
    package: "com.tranquockhang18102004.tarotapp"
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    [
      "react-native-fbsdk-next",
      {
        appID: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID,
        clientToken: process.env.EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN,
        displayName: "Tarot App",
        scheme: `fb${process.env.EXPO_PUBLIC_FACEBOOK_APP_ID}`,
        advertiserIDCollectionEnabled: false,
        autoLogAppEventsEnabled: false,
        isAutoInitEnabled: true,
      }
    ],
    "@react-native-firebase/app",
    "@react-native-firebase/auth",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      }
    ]
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    eas: {
      projectId: "108c6501-b3b7-4ecf-a9b1-ba1131dff7c6"
    }
  }
});
