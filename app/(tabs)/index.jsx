import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Greeting from "../../components/greetings.jsx";
import eye from "../../assets/view.png";
import plus from "../../assets/plus.png";
import transfer from "../../assets/transfer.png";
// import { transactions } from "../../data/transactions.js";
import { FAB } from "react-native-paper";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { Searchbar } from "react-native-paper";
import useAuthStore from "../store/authStore";
import { useFocusEffect } from "@react-navigation/native";
import { capitalize } from "../../util/capitalize.js";

export default function HomeScreen() {
  const router = useRouter();
  const {
    user,
    wallet,
    transactions,
    fetchWalletByUserId,
    fetchTransactionsByWalletId,
  } = useAuthStore();
  const [showBalance, setShowBalance] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Date");
  const [sortOrder, setSortOrder] = useState("Descending");
  const [showSortByDropdown, setShowSortByDropdown] = useState(false);
  const [showSortOrderDropdown, setShowSortOrderDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useFocusEffect(
    useCallback(() => {
      const refreshData = async () => {
        if (wallet?.userId) {
          await fetchWalletByUserId(wallet.userId);
          const updatedWallet = useAuthStore.getState().wallet;
          if (updatedWallet?.id) {
            await fetchTransactionsByWalletId(updatedWallet.id);
          }
        }
      };
      refreshData();
    }, [wallet?.userId])
  );

  const Dropdown = ({
    label,
    options,
    value,
    onSelect,
    visible,
    setVisible,
  }) => (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        onPress={() => setVisible(!visible)}
        style={styles.dropdownToggle}
      >
        <Text style={styles.dropdownText}>
          {label} {value}
        </Text>
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdownMenu}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                onSelect(option);
                setVisible(false);
              }}
              style={styles.dropdownItem}
            >
              <Text style={styles.dropdownItemText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const filteredTransactions = transactions.filter(
    (item) =>
      item.fromTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transactionDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transactionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.amount.toString().includes(searchQuery)
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const getSignedAmount = (tx) => {
      const isIncomingTransfer =
        tx.transactionType === "TRANSFER" && tx.recipientWalletId === wallet.id;
      const isTopUp = tx.transactionType === "TOP_UP";

      const isPositive = isTopUp || isIncomingTransfer;
      return isPositive ? tx.amount : -tx.amount;
    };

    const valueA =
      sortBy === "Amount" ? getSignedAmount(a) : new Date(a.transactionDate);
    const valueB =
      sortBy === "Amount" ? getSignedAmount(b) : new Date(b.transactionDate);

    return sortOrder === "Ascending" ? valueA - valueB : valueB - valueA;
  });
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedTransactions = sortedTransactions.slice(startIdx, endIdx);

  return (
    <>
      <FlatList
        data={paginatedTransactions}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <Greeting />
            {/* account no */}
            <View style={styles.account}>
              <Text style={styles.accountNo}>Account No.</Text>
              <Text style={styles.accountNo}>{wallet?.accountNumber}</Text>
            </View>

            {/* balance card */}
            <View style={styles.balanceCard}>
              <View style={styles.balanceRow}>
                <Text style={styles.balance}>Balance</Text>
                <View style={styles.balanceAmountRow}>
                  <Text style={styles.amount}>
                    {showBalance
                      ? `Rp ${Number(wallet?.balance || 0).toLocaleString(
                          "id-ID",
                          {
                            minimumFractionDigits: 2,
                          }
                        )}`
                      : "Rp ••••••••"}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowBalance(!showBalance)}
                  >
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

            {/* control bar */}
            <View style={styles.controlBar}>
              {/* Search Bar */}
              <Searchbar
                placeholder="Search transactions"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchBar}
              />
              <View style={styles.sortWrapper}>
                <Text style={{ marginRight: 4, alignSelf: "center" }}>
                  Sort By
                </Text>
                <Dropdown
                  label=""
                  options={["Date", "Amount"]}
                  value={sortBy}
                  onSelect={setSortBy}
                  visible={showSortByDropdown}
                  setVisible={setShowSortByDropdown}
                />

                <Dropdown
                  label=""
                  options={["Ascending", "Descending"]}
                  value={sortOrder}
                  onSelect={setSortOrder}
                  visible={showSortOrderDropdown}
                  setVisible={setShowSortOrderDropdown}
                />
              </View>
            </View>

            <Text style={styles.transactionTitle}>Transaction History</Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.transactionContainer}>
            <View style={styles.transactionItem}>
              <View style={styles.transactionLeft}>
                {/* <View style={styles.profileCircle} /> */}
                <View>
                  <Text style={styles.name}>
                    {item.fromTo === "-"
                      ? capitalize(user.fullname)
                      : capitalize(item.fromTo)}
                  </Text>
                  <Text style={styles.type}>
                    {item.transactionType === "TOP_UP"
                      ? "Top Up"
                      : item.transactionType === "TRANSFER"
                      ? "Transfer"
                      : item.transactionType}
                  </Text>
                  <Text style={styles.date}>
                    {new Date(item.transactionDate).toLocaleString("id-ID")}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.amountText,
                  {
                    color:
                      item.transactionType === "TOP_UP" ||
                      (item.transactionType === "TRANSFER" &&
                        item.recipientWalletId === wallet.id)
                        ? "green"
                        : "red",
                  },
                ]}
              >
                {item.transactionType === "TOP_UP" ||
                (item.transactionType === "TRANSFER" &&
                  item.recipientWalletId === wallet.id)
                  ? `+ ${Number(item.amount).toLocaleString("id-ID")}`
                  : `- ${Number(item.amount).toLocaleString("id-ID")}`}
              </Text>
            </View>
            <View style={styles.divider} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No transactions available</Text>
          </View>
        }
        contentContainerStyle={styles.container}
        ListFooterComponent={
          <View style={styles.paginationContainer}>
            <TouchableOpacity
              onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={[
                styles.paginationButton,
                currentPage === 1 && styles.disabledButton,
              ]}
            >
              <Text style={styles.paginationText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                setCurrentPage((prev) =>
                  endIdx < sortedTransactions.length ? prev + 1 : prev
                )
              }
              disabled={endIdx >= sortedTransactions.length}
              style={[
                styles.paginationButton,
                endIdx >= sortedTransactions.length && styles.disabledButton,
              ]}
            >
              <Text style={styles.paginationText}>Next</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <FAB
        icon="download"
        style={styles.downloadButton}
        color="#fff"
        onPress={() =>
          Linking.openURL(
            `https://ewalled-api-production.up.railway.app/api/transactions/export/pdf?walletId=${wallet?.id}`
          )
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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

  emptyState: {
    alignItems: "center",
    paddingVertical: 20,
  },

  emptyText: {
    color: "#888",
    fontSize: 14,
  },

  // control bar styles
  controlBar: {
    flex: "flex",
    alignItems: "center",
    marginBottom: 30,
    gap: 8,
    flexWrap: "wrap", // allows wrapping on small screens
  },

  searchBar: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#fff",
    marginBottom: 12,
  },

  // dropdown styles

  sortWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dropdownContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 999,
  },

  dropdownToggle: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdownText: {
    fontSize: 14,
    color: "#000",
  },

  dropdownMenu: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    zIndex: 100,
  },

  dropdownItem: {
    padding: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },

  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },

  // pagination styles
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // aligns everything to the right
    alignItems: "center",
    gap: 16,
    marginTop: 16,
    paddingBottom: 20, // optional: adds bottom spacing
  },

  paginationButton: {
    backgroundColor: "#0061FF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  paginationText: {
    color: "#fff",
    fontWeight: "bold",
  },

  disabledButton: {
    backgroundColor: "#ccc",
  },

  // download button styles
  downloadButton: {
    position: "absolute",
    bottom: 90, // keep it above pagination
    right: 20,
    backgroundColor: "#0061FF",
  },
});
