import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import useAuthStore from "../store/authStore";
import { capitalize } from "../../util/capitalize";
import {
  VictoryChart,
  VictoryLegend,
  VictoryAxis,
  VictoryGroup,
  VictoryBar,
} from "victory-native";
import { useEffect } from "react";
import axios from "axios";
import Feather from "react-native-vector-icons/Feather";

export default function Overview() {
  const [period, setPeriod] = useState("weekly"); // "weekly", "monthly", "quarterly"
  const [summaryData, setSummaryData] = useState(null);
  const { user, wallet } = useAuthStore();

  const fullname = capitalize(user?.fullname) || "User";

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          `https://ewalled-api-production.up.railway.app/api/summary/${wallet.id}`
        );
        setSummaryData(response.data);
      } catch (err) {
        console.error("Failed to fetch summary data:", err);
      }
    };

    if (wallet?.id) {
      fetchSummary();
    }
  }, [wallet?.id]);

  if (!wallet?.id || !summaryData) {
    return <Text style={{ padding: 20 }}>Loading summary...</Text>;
  }

  const selectedData = summaryData[period];
  const chartFormatted = [...selectedData.data].reverse().map((item) => ({
    x: item.period,
    income: item.income,
    outcome: item.outcome,
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hello, {fullname}</Text>
      <Text style={styles.subtext}>This is your financial overview</Text>

      <View style={styles.summaryRow}>
        <View style={[styles.card, { backgroundColor: "#0061FF" }]}>
          <Text style={styles.cardLabel}>Total Income</Text>
          <Text style={styles.cardValue}>
            Rp {selectedData.totalIncome.toLocaleString("id-ID")}
          </Text>
        </View>
        <View style={[styles.card, { backgroundColor: "#f47c2c" }]}>
          <Text style={styles.cardLabel}>Total Outcome</Text>
          <Text style={styles.cardValue}>
            Rp {selectedData.totalOutcome.toLocaleString("id-ID")}
          </Text>
        </View>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Net Balance</Text>
        {selectedData.netBalance < 0 ? (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Feather name="trending-down" size={24} color="#cc0000" />
            <Text style={styles.negativeBalanceValue}>
              Rp {selectedData.netBalance.toLocaleString("id-ID")}
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Feather name="trending-up" size={24} color="green" />
            <Text style={styles.positiveBalanceValue}>
              Rp {selectedData.netBalance.toLocaleString("id-ID")}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.chartWrapper}>
        <VictoryChart
          domainPadding={{ x: 30 }}
          padding={{ top: 60, bottom: 50, left: 60, right: 20 }}
        >
          <VictoryGroup offset={20} colorScale={["#0061FF", "#f47c2c"]}>
            <VictoryBar data={chartFormatted} x="x" y="income" />
            <VictoryBar data={chartFormatted} x="x" y="outcome" />
          </VictoryGroup>

          <VictoryAxis
            style={{
              tickLabels: { angle: -15, fontSize: 8, padding: 10 },
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `Rp ${x / 1_000_000} jt`}
            style={{
              tickLabels: { fontSize: 8, padding: 5 },
            }}
          />

          <VictoryLegend
            x={120}
            y={10}
            orientation="horizontal"
            gutter={20}
            standalone={false}
            data={[
              { name: "Income", symbol: { fill: "#0061FF" } },
              { name: "Outcome", symbol: { fill: "#f47c2c" } },
            ]}
          />
        </VictoryChart>
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
  negativeBalanceValue: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#cc0000",
  },
  positiveBalanceValue: {
    fontWeight: "bold",
    fontSize: 18,
    color: "green",
  },
  chartWrapper: {
    height: 300,
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
