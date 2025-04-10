import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Greeting from "../../components/greetings.jsx";
import eye from "../../assets/view.png";
import plus from "../../assets/plus.png";
import transfer from "../../assets/transfer.png";
import { transactions } from "../../data/transactions.js";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Greeting />
      {/* account no */}
      <View style={styles.account}>
        <Text style={styles.accountNo}>Account No.</Text>
        <Text style={styles.accountNo}>100899</Text>
      </View>

      {/* balance card */}
      <View style={styles.balanceCard}>
        <View style={styles.balanceRow}>
          <Text style={styles.balance}>Balance</Text>
          <View style={styles.balanceAmountRow}>
            <Text style={styles.amount}>
              {showBalance ? "Rp 10.000.000" : "••••••••"}
            </Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <Image style={styles.eye} source={eye} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/topup")}
          >
            <Image source={plus} style={styles.actionIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/transfer")}
          >
            <Image source={transfer} style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* transactions */}
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionTitle}>Transaction History</Text>
        {transactions.map((item) => (
          <View key={item.id} style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View style={styles.profileCircle} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
            <Text
              style={[
                styles.amountText,
                { color: item.amount > 0 ? "green" : "black" },
              ]}
            >
              {item.amount > 0
                ? `+ ${item.amount}`
                : `- ${Math.abs(item.amount)}`}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f9fb",
  },
  // account styles
  account: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#0061FF",
    borderRadius: 10,
    marginVertical: 20,
  },
  accountNo: {
    fontSize: 16,
    fontWeight: "400",
    color: "#fff",
  },

  // balance card styles
  balanceCard: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 20,
  },
  balanceRow: {
    marginBottom: 20,
  },

  balanceAmountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },

  eye: {
    width: 20,
    height: 20,
  },

  amount: {
    fontSize: 24,
    fontWeight: "bold",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },

  actionButton: {
    backgroundColor: "#0061FF",
    borderRadius: 10,
    padding: 10,
  },

  actionIcon: {
    color: "#fff",
    width: 20,
    height: 20,
  },

  // transaction styles
  transactionContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },

  transactionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },

  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },

  name: {
    fontWeight: "600",
  },

  type: {
    fontSize: 12,
  },

  date: {
    fontSize: 12,
    color: "#888",
  },

  amountText: {
    fontWeight: "600",
  },
});
