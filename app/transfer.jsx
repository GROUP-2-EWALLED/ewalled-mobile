import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import searchIcon from "../assets/search.png";
import accountNotFound from "../assets/account-not-found.png";

export default function Transfer() {
  const router = useRouter();
  const [toAccount, setToAccount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [isAccountValid, setIsAccountValid] = useState(true);

  const handleAccountCheck = () => {
    if (toAccount === "9864290108") {
      setAccountInfo({
        accountNumber: "9864290108",
        name: "Group 2",
      });
      setIsAccountValid(true);
      setModalVisible(true);
    } else {
      setAccountInfo({
        accountNumber: toAccount,
      });
      setIsAccountValid(false);
      setModalVisible(true);
    }

    console.log("pressed");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={router.back} style={{ marginBottom: 20 }}>
        <Text style={{ color: "#0061ff", fontWeight: "bold" }}>← Back</Text>
      </Pressable>
      {/* To input */}
      <View style={styles.toInputWrapper}>
        <View style={styles.toRow}>
          <Text style={styles.toLabel}>To :</Text>
          <TextInput
            style={styles.toInput}
            placeholder="Enter Account Number"
            placeholderTextColor="#ddd"
            value={toAccount}
            onChangeText={setToAccount}
            keyboardType="numeric"
          />
          <Pressable onPress={handleAccountCheck} style={styles.searchButton}>
            <Image source={searchIcon} style={styles.searchIcon} />
          </Pressable>
        </View>
      </View>

      {/* Amount */}
      <View style={styles.section}>
        <Text style={styles.amountLabel}>Amount</Text>
        <View style={styles.amountRow}>
          <Text style={styles.currency}>IDR</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType="numeric"
            defaultValue="0"
          />
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
      <Pressable
        style={styles.transferButton}
        onPress={() =>
          router.push({
            pathname: "/status/success",
            params: {
              type: "transfer",
              amount: "100.000",
              recipient: "9864290108 (Group 2)",
            },
          })
        }
      >
        <Text style={styles.transferButtonText}>Transfer</Text>
      </Pressable>

      {/* Modal for Account Info */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={() => {}}>
            {isAccountValid ? (
              <>
                <Text style={styles.modalTitle}>Account Info</Text>
                <Text style={styles.modalLabel}>Account Number</Text>
                <Text style={styles.modalLabelValue}>
                  {accountInfo?.accountNumber}
                </Text>
                <Text style={[styles.modalLabel, { marginTop: 12 }]}>Name</Text>
                <Text style={styles.modalLabelValue}>{accountInfo?.name}</Text>
                <Pressable
                  style={styles.confirmButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.confirmText}>Confirm</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Image source={accountNotFound} style={styles.errorImage} />
                <Text style={styles.modalTitle}>
                  Account Number{"\n"}Not Found!
                </Text>
                <Text style={styles.errorDescription}>
                  We couldn't find the account number you entered.{"\n"}Please
                  double-check and try again.
                </Text>
                <Pressable
                  style={styles.confirmButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.confirmText}>Ok</Text>
                </Pressable>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
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
  toInputWrapper: {
    marginBottom: 24,
  },
  toRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0061ff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  toLabel: {
    color: "white",
    fontWeight: "bold",
    marginRight: 6,
  },

  toInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },

  searchButton: {
    marginLeft: 8,
    backgroundColor: "#ff8c00",
    borderRadius: 6,
    padding: 6,
  },

  searchIcon: {
    width: 20,
    height: 20,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    elevation: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },

  modalLabel: {
    fontWeight: "bold",
    alignSelf: "flex-start",
  },

  modalLabelValue: {
    alignSelf: "flex-start",
  },

  confirmButton: {
    backgroundColor: "#0061ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 24,
  },

  confirmText: {
    color: "white",
    fontWeight: "bold",
  },

  errorImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 12,
  },

  errorDescription: {
    textAlign: "center",
    color: "#444",
    marginBottom: 20,
  },
});
