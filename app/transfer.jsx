import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Transfer() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable onPress={router.back} style={{ marginBottom: 20 }}>
        <Text style={{ color: "#0061ff", fontWeight: "bold" }}>← Back</Text>
      </Pressable>
      {/* To dropdown */}
      <Pressable style={styles.toRow}>
        <Text style={styles.toText}>To:</Text>
        <Text style={styles.toAccount}>9000008940208</Text>
      </Pressable>

      {/* Amount */}
      <View style={styles.section}>
        <Text style={styles.amountLabel}>Amount</Text>
        <View style={styles.amountRow}>
          <Text style={styles.currency}>IDR</Text>
          <TextInput style={styles.amountInput} defaultValue="100.000" />
        </View>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceValue}>IDR 10.000.000</Text>
        </View>
      </View>

      {/* Notes */}
      <View style={styles.section}>
        <Text style={styles.notesLabel}>Notes</Text>
        <TextInput style={styles.notesInput} placeholder="" />
      </View>

      {/* Transfer Button */}
      <Pressable style={styles.transferButton}>
        <Text style={styles.transferButtonText}>Transfer</Text>
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
    marginBottom: 12,
  },
  toRow: {
    backgroundColor: "#0061ff",
    padding: 12,
    borderRadius: 6,
    flexDirection: "row",
    marginBottom: 24,
  },
  toText: {
    color: "white",
    marginRight: 10,
    fontWeight: "bold",
  },
  toAccount: {
    color: "white",
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
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  balanceLabel: {
    color: "#999",
  },
  balanceValue: {
    color: "#0061ff",
    fontWeight: "bold",
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
  transferButton: {
    backgroundColor: "#0061ff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  transferButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
