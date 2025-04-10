import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link, router } from "expo-router";
import logo from "../assets/logo.png";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/");
        }}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Don’t have account?{" "}
        <Link href="/register" style={styles.linkText}>
          Register here
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#f9fbfd",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0061FF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
  },
  linkText: {
    color: "#0061FF",
  },
});
