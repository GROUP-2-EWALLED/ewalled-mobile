import { Link } from "expo-router";
import { ScrollView, Text, StyleSheet, View, Image } from "react-native";
import Greeting from "../../components/greetings.jsx";
import eye from "../../assets/view.png";
import plus from "../../assets/plus.png";
import transfer from "../../assets/transfer.png";

export default function HomeScreen() {
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
            <Text style={styles.amount}>Rp 10.000.000</Text>
            <Image style={styles.eye} source={eye} />
          </View>
        </View>

        <View style={styles.actionRow}>
          <View style={styles.actionButton}>
            <Image source={plus} style={styles.actionIcon} />
          </View>
          <View style={styles.actionButton}>
            <Image source={transfer} style={styles.actionIcon} />
          </View>
        </View>
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
});
