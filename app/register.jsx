import { useState, useEffect } from "react";
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
import { useIsFocused } from "@react-navigation/native";

const existingUsers = [
  { email: "test@gmail.com", username: "test", password: "Password123!" },
  { email: "chelsea@gmail.com", password: "Password123!" },
];

export default function RegisterScreen() {
  const [agree, setAgree] = useState(false);
  const [isTncVisible, setTncVisible] = useState(false);
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setFullname("");
      setUsername("");
      setEmail("");
      setPassword("");
      setAvatar("");
      setAgree(false);
      setErrors({});
    }
  }, [isFocused]);

  const validate = () => {
    const newErrors = {};
    const nameRegex =
      /^[\p{L}\p{Mn}\p{Pd}'\u2019]+(?: [\p{L}\p{Mn}\p{Pd}'\u2019]+)*$/u;
    const usernameRegex = /^[A-Za-z0-9_]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

    if (!fullname.trim()) {
      newErrors.fullname = "Fullname is required.";
    } else if (!nameRegex.test(fullname)) {
      newErrors.fullname =
        "Name can only include letters, spaces, hyphens, and apostrophes.";
    }

    if (!username.trim()) {
      newErrors.username = "Username is required.";
    } else if (!usernameRegex.test(username)) {
      newErrors.username = "Only letters, numbers, and _ allowed.";
    } else if (existingUsers.some((u) => u.username === username)) {
      newErrors.username = "Username already taken.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    } else if (existingUsers.some((u) => u.email === email)) {
      newErrors.email = "Email already registered.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Min 8 chars, must include number & special character.";
    }

    if (phone.trim()) {
      if (!/^\d+$/.test(phone)) {
        newErrors.phone = "Phone must be digits only.";
      } else if (phone.length < 5) {
        newErrors.phone = "Phone number too short.";
      }
    }

    if (avatar.trim()) {
      const urlPattern =
        /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,200})([\/\w\-\.]*)*\/?$/;
      if (!urlPattern.test(avatar)) {
        newErrors.avatar = "Invalid URL format.";
      }
    }
    //localhost:8080/api/transactions/export/pdf?walletId=1

    http: if (!agree) {
      newErrors.agree = "You must agree to the Terms and Conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validate()) {
      router.replace("/login");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <TextInput
        style={[styles.input, errors.fullname && styles.inputError]}
        placeholder="Fullname"
        value={fullname}
        onChangeText={(text) => {
          setFullname(text);
          setErrors((e) => ({ ...e, fullname: "" }));
        }}
      />
      {errors.fullname && (
        <Text style={styles.errorText}>{errors.fullname}</Text>
      )}

      <TextInput
        style={[styles.input, errors.username && styles.inputError]}
        placeholder="Username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setErrors((e) => ({ ...e, username: "" }));
        }}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors((e) => ({ ...e, email: "" }));
        }}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors((e) => ({ ...e, password: "" }));
        }}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <TextInput
        style={[styles.input, errors.phone && styles.inputError]}
        keyboardType="numeric"
        placeholder="Phone Number (optional)"
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          setErrors((e) => ({ ...e, phone: "" }));
        }}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <TextInput
        style={[styles.input, errors.avatar && styles.inputError]}
        placeholder="Avatar Url (optional)"
        value={avatar}
        onChangeText={(text) => {
          setAvatar(text);
          setErrors((e) => ({ ...e, avatar: "" }));
        }}
      />
      {errors.avatar && <Text style={styles.errorText}>{errors.avatar}</Text>}

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
      {errors.agree && <Text style={styles.errorText}>{errors.agree}</Text>}

      <TouchableOpacity
        style={[styles.button, !agree && { backgroundColor: "#ccc" }]}
        onPress={handleRegister}
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
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#f9fbfd",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
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
