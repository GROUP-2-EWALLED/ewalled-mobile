import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import failImg from "../../assets/fail.png"; // Replace with your actual fail image path

export default function FailScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams();
  const isTransfer = type === "transfer";

  return (
    <View style={styles.container}>
      <Image source={failImg} style={styles.image} />
      <Text style={styles.title}>
        Oops! {isTransfer ? "Transfer" : "Top Up"} Failed!
      </Text>
      <Text style={styles.description}>
        Your transaction could not be completed due to insufficient balance.
        Please top up and try again.
      </Text>
      <Pressable style={styles.button} onPress={router.back}>
        <Text style={styles.buttonText}>← Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 40,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
