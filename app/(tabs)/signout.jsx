import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import useAuthStore from "../store/authStore";

export default function SignOutScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setTimeout(() => {
      router.replace("/login");
    }, 100);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0061FF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
