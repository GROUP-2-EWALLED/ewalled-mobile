import { Stack, useRouter } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { useEffect, useState } from "react";
import useAuthStore from "./store/authStore";

export default function RootLayout() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const wallet = useAuthStore((state) => state.wallet);
  useEffect(() => {
    // Wait until after mounting to redirect
    requestAnimationFrame(() => {
      if (!user || !wallet) {
        router.replace("/login");
      }
    });
  }, []);
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </PaperProvider>
  );
}
