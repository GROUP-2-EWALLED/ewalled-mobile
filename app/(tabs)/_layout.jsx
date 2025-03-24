import { Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import avatar from "../../assets/chelsea (1).png";
import mode from "../../assets/mode.png";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          headerTitle: () => (
            <View style={styles.profileHeader}>
              <Image source={avatar} style={styles.avatar} />
              <View style={styles.profileText}>
                <Text style={styles.name}>Chelsea Immanuela</Text>
                <Text style={styles.accountType}>Personal Account</Text>
              </View>

              <Image source={mode} style={styles.mode} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="transfer"
        options={{
          title: "Transfer",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="money" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="topup"
        options={{
          title: "Top Up",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="plus-square" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="signout"
        options={{
          title: "Sign Out",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="sign-out" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    border: "3px solid #178F8D",
  },
  profileText: {
    flex: 3,
    marginLeft: 12,
  },
  mode: {
    width: 24,
    height: 24,
    marginRight: "-90vw",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  accountType: {
    fontSize: 12,
    color: "#000",
  },
});
