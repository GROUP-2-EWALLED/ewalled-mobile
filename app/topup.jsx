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
import dropdownImg from "../assets/dropdown.svg";
import { useRouter } from "expo-router";

export default function Topup() {
  const [selectedMethod, setSelectedMethod] = useState("BYOND Pay");
  const [modalVisible, setModalVisible] = useState(false);
  const paymentMethods = ["BYOND Pay", "Credit Card", "Bank Transfer"];
  const router = useRouter();

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
          <TextInput style={styles.amountInput} defaultValue="100.000" />
        </View>
      </View>

      {/* Payment Method Dropdown */}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.dropdownBox}
      >
        <Text style={styles.dropdownText}>{selectedMethod}</Text>
        <Image source={dropdownImg} style={styles.dropdownArrow} />
      </Pressable>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
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
          </View>
        </View>
      </Modal>

      {/* Notes */}
      <View style={styles.section}>
        <Text style={styles.notesLabel}>Notes</Text>
        <TextInput style={styles.notesInput} placeholder="" />
      </View>

      {/* Top Up Button */}
      <Pressable style={styles.topupButton}>
        <Text style={styles.topupButtonText}>Top Up</Text>
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
    backgroundColor: "#fafbfd",
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
});
