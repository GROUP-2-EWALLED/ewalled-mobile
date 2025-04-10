import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import CheckBox from "expo-checkbox";
import { Link } from "expo-router";
import logo from "../assets/logo.png";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const [agree, setAgree] = useState(false);
  const [isTncVisible, setTncVisible] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <TextInput style={styles.input} placeholder="Fullname" />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TextInput style={styles.input} placeholder="Avatar Url" />

      <View style={styles.checkboxContainer}>
        <CheckBox value={agree} onValueChange={setAgree} />
        <Text style={styles.checkboxText}>
          I have read and agree to the{" "}
          <Text style={styles.linkText} onPress={() => setTncVisible(true)}>
            Terms and Conditions
          </Text>
          <Text style={{ color: "red" }}> *</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, !agree && { backgroundColor: "#ccc" }]}
        onPress={() => {
          if (agree) {
            router.replace("/login");
          }
        }}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Have an account?{" "}
        <Link href="/login" style={styles.linkText}>
          Login here
        </Link>
      </Text>

      {/* Terms & Conditions Modal */}
      <Modal visible={isTncVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Terms and Conditions</Text>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </ScrollView>
          <Pressable
            onPress={() => setTncVisible(false)}
            style={styles.modalClose}
          >
            <Text style={styles.closeText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#f9fbfd",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
    flexWrap: "wrap",
  },
  linkText: {
    color: "#0061FF",
  },
  button: {
    backgroundColor: "#0061FF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalContent: {
    flex: 1,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 22,
  },
  modalClose: {
    backgroundColor: "#0061FF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
