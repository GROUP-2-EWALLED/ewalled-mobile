import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";

export default function Overview() {
  const [period, setPeriod] = useState("weekly"); // or "monthly", "quarterly"

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hello, Chelsea</Text>
      <Text style={styles.subtext}>This is your financial overview</Text>

      <View style={styles.summaryRow}>
        <View style={[styles.card, { backgroundColor: "#0061FF" }]}>
          <Text style={styles.cardLabel}>Total Income</Text>
          <Text style={styles.cardValue}>Rp12.384.091</Text>
        </View>
        <View style={[styles.card, { backgroundColor: "#f47c2c" }]}>
          <Text style={styles.cardLabel}>Total Outcome</Text>
          <Text style={styles.cardValue}>Rp17.290.002</Text>
        </View>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceValue}>Rp 4.905.911</Text>
      </View>

      <View style={styles.chartPlaceholder}>
        <Text style={{ textAlign: "center", color: "#888" }}>[ Chart ]</Text>
      </View>

      <View style={styles.toggleRow}>
        {["Weekly", "Monthly", "Quarterly"].map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPeriod(p.toLowerCase())}
            style={[
              styles.toggleButton,
              period === p.toLowerCase() && styles.activeToggle,
            ]}
          >
            <Text
              style={{
                color: period === p.toLowerCase() ? "#fff" : "#0061FF",
              }}
            >
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f7f9fb" },
  header: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
  greeting: { fontSize: 20, fontWeight: "bold" },
  subtext: { color: "#666", marginBottom: 16 },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
  },
  cardLabel: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardValue: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  balanceCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  balanceLabel: {
    color: "#666",
    marginBottom: 4,
  },
  balanceValue: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#cc0000",
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  activeToggle: {
    backgroundColor: "#0061FF",
  },
});
