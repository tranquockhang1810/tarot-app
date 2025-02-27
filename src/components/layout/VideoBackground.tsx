import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Video, ResizeMode } from "expo-av";
import useColor from "@/src/hooks/useColor";
import { LOGIN_BACKGROUND_VIDEO } from "@/src/consts/ImgPath";

export default function VideoBackground({ children }: { children?: React.ReactNode }) {
  const videoRef = useRef<Video>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { brandPrimary } = useColor();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playAsync().catch(error => console.error(error));
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* 🔹 Loading Indicator trong lúc chờ video load */}
      {!isVideoLoaded && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={brandPrimary} />
        </View>
      )}

      <Video
        ref={videoRef}
        source={{ uri: LOGIN_BACKGROUND_VIDEO }}
        style={StyleSheet.absoluteFillObject}
        isMuted
        shouldPlay
        isLooping
        resizeMode={ResizeMode.COVER}
        onLoad={() => setIsVideoLoaded(true)}
      />
      {isVideoLoaded && children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
