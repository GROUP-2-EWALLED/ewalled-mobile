import { Stack, useRouter } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { useEffect, useState } from "react";
import useAuthStore from "./store/authStore";

export default function RootLayout() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const wallet = useAuthStore((state) => state.wallet);

  useEffect(() => {
    if (!user || !wallet) {
      // Delay routing to avoid navigation error before layout is mounted
      setTimeout(() => {
        router.replace("/login");
      }, 0);
    }
  }, [user, wallet]);

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
