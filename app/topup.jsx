import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import dropdownImg from "../assets/dropdown.png";
import { useRouter } from "expo-router";
import axios from "axios";
import useAuthStore from "./store/authStore";

export default function Topup() {
  const { wallet, fetchWalletByUserId } = useAuthStore();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("BYOND Pay");
  const [modalVisible, setModalVisible] = useState(false);
  const paymentMethods = ["BYOND Pay", "Credit Card", "Bank Transfer"];
  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!amount.trim()) {
      newErrors.amount = "Amount is required.";
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
    }

    if (!selectedMethod.trim()) {
      newErrors.method = "Payment method is required.";
    }

    if (note.length > 100) {
      newErrors.note = "Note too long (max 100 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTopUp = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const payload = {
        walletId: wallet.id,
        transactionType: "TOP_UP",
        amount: parseFloat(amount),
        recipientWalletId: null,
        transactionDate: new Date().toISOString(),
        description: note,
      };

      await axios.post(
        "https://ewalled-api-production.up.railway.app/api/transactions",
        payload
      );
      await fetchWalletByUserId(wallet.userId);
      router.push({
        pathname: "/status/success",
        params: { type: "topup", amount },
      });
    } catch (error) {
      console.error("Top up failed:", error);
      router.push({ pathname: "/status/fail", params: { type: "topup" } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={router.back} style={{ marginBottom: 20 }}>
        <Text style={{ color: "#0061ff", fontWeight: "bold" }}>← Back</Text>
      </Pressable>
      {/* Amount */}
      <View style={styles.section}>
        <Text style={styles.amountLabel}>Amount</Text>
        <View style={styles.amountRow}>
          <Text style={styles.currency}>IDR</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />
        </View>
        {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}
      </View>

      {/* Payment Method Dropdown */}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.dropdownBox}
      >
        <Text style={styles.dropdownText}>{selectedMethod}</Text>
        <Image source={dropdownImg} style={styles.dropdownArrow} />
      </Pressable>
      {errors.method && <Text style={styles.error}>{errors.method}</Text>}

      <Modal visible={modalVisible} transparent animationType="slide">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <FlatList
              data={paymentMethods}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedMethod(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>

      {/* Notes */}
      <View style={styles.section}>
        <Text style={styles.notesLabel}>Notes</Text>
        <TextInput
          style={styles.notesInput}
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        {errors.note && <Text style={styles.error}>{errors.note}</Text>}
      </View>

      {/* Top Up Button */}
      <Pressable
        style={styles.topupButton}
        onPress={handleTopUp}
        disabled={loading}
      >
        <Text style={styles.topupButtonText}>
          {loading ? "Processing..." : "Top Up"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fb",
    padding: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amountLabel: {
    color: "#888",
    marginBottom: 6,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  currency: {
    fontSize: 32,
    fontWeight: "bold",
    marginRight: 10,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: "bold",
    flex: 1,
    width: "100%",
  },
  dropdownBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownArrow: {
    width: 16,
  },
  notesLabel: {
    color: "#999",
    marginBottom: 8,
  },
  notesInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 4,
    fontSize: 16,
  },
  topupButton: {
    marginTop: "auto",
    backgroundColor: "#0061ff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  topupButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalItem: {
    padding: 16,
  },
  modalItemText: {
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
  },
});
