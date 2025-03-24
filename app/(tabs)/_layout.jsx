import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
