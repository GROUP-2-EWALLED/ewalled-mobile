import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  wallet: null,
  transactions: [],

  // Load auth from AsyncStorage (call this on app start)
  loadStoredAuth: async () => {
    try {
      const storedData = await AsyncStorage.getItem("auth");
      if (storedData) {
        const parsed = JSON.parse(storedData);
        set({ user: parsed.user, wallet: parsed.wallet });
      }
    } catch (err) {
      console.error("Failed to load auth:", err);
    }
  },

  // Save user and wallet to store and AsyncStorage
  setData: async ({ user, wallet }) => {
    const data = { user, wallet };
    await AsyncStorage.setItem("auth", JSON.stringify(data));
    set(data);
  },

  updateWalletBalance: async (newBalance) => {
    set((state) => {
      const updatedWallet = { ...state.wallet, balance: newBalance };
      const updatedData = { user: state.user, wallet: updatedWallet };
      AsyncStorage.setItem("auth", JSON.stringify(updatedData)); // no await needed here
      return { wallet: updatedWallet };
    });
  },

  fetchWalletByUserId: async (userId) => {
    try {
      const { data } = await axios.get(
        `https://ewalled-api-production.up.railway.app/api/wallets/${userId}`
      );

      set((state) => {
        const updatedWallet = { ...state.wallet, ...data };
        const updatedData = { user: state.user, wallet: updatedWallet };
        AsyncStorage.setItem("auth", JSON.stringify(updatedData));
        return { wallet: updatedWallet };
      });
    } catch (err) {
      console.error("Failed to fetch wallet:", err);
    }
  },

  setTransactions: (transactions) => set({ transactions }),

  fetchTransactionsByWalletId: async (walletId) => {
    try {
      const { data } = await axios.get(
        `https://ewalled-api-production.up.railway.app/api/transactions?walletId=${walletId}`
      );
      set({ transactions: data });
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("auth");
    set({ user: null, wallet: null, transactions: [] });
  },
}));

export default useAuthStore;
