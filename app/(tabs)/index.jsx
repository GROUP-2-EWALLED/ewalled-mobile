import { Link } from "expo-router";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import Greeting from "../../components/greetings.jsx";

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
        <Text style={styles.balance}>Balance</Text>
        <Text style={styles.amount}>$ 1,000.00</Text>
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

  balanceCard: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 20,
  },
});
