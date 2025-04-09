import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import successImg from "../../assets/success.png";

export default function SuccessScreen() {
  const router = useRouter();
  const { type, amount, recipient } = useLocalSearchParams();

  const isTransfer = type === "transfer";

  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />
      <Text style={styles.title}>
        Yay! {isTransfer ? "Transfer" : "Top Up"} Successful!
      </Text>
      <Text style={styles.description}>
        {isTransfer ? (
          <>
            Your payment of <Text style={styles.bold}>IDR {amount}</Text> to{" "}
            <Text style={styles.bold}>{recipient}</Text> is complete.
          </>
        ) : (
          <>
            Your top up of <Text style={styles.bold}>IDR {amount}</Text> is
            complete.
          </>
        )}
      </Text>
      <Text style={styles.footer}>Thanks for trusting us!</Text>
      <Pressable style={styles.button} onPress={() => router.replace("/")}>
        <Text style={styles.buttonText}>Back to Home</Text>
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
    marginBottom: 12,
  },
  bold: {
    fontWeight: "bold",
  },
  footer: {
    fontSize: 14,
    color: "#555",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0061ff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
