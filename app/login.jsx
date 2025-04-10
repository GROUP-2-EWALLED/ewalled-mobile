import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link, router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const mockUsers = [
  { email: "test@gmail.com", password: "Password123!" },
  { email: "chelsea@gmail.com", password: "Chelsea123!" },
];

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
    }
  }, [isFocused]);

  const handleLogin = () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");

    if (!email || !password) {
      if (!email) setEmailError("Please enter your email.");
      if (!password) setPasswordError("Password is required.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Invalid email format.");
      return;
    }

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      // Generic error for incorrect email or password
      setEmailError("Incorrect email or password.");
      setPasswordError("Incorrect email or password.");
      return;
    }

    // Success
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <TextInput
        style={[styles.input, emailError && styles.inputError]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError("");
        }}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={[styles.input, passwordError && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError("");
        }}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#f9fbfd",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 13,
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
