import { Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import avatar from "../../assets/chelsea (1).png";
import mode from "../../assets/mode.png";
import useAuthStore from "../store/authStore";
import { capitalize } from "../../util/capitalize";

export default function TabLayout() {
  const user = useAuthStore((state) => state.user);
  const avatarUrl =
    user?.avatarUrl ||
    `https://avatar.iran.liara.run/username?username=${user?.fullname}`;
  const capitalizedFullName = capitalize(user?.fullname || "");
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
              <Image source={{ uri: avatarUrl }} style={styles.avatar} />
              <View style={styles.profileText}>
                <Text style={styles.name}>{capitalizedFullName}</Text>
                <Text style={styles.accountType}>Personal Account</Text>
              </View>

              {/* <Image source={mode} style={styles.mode} /> */}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="overview"
        options={{
          title: "Financial Overview",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bar-chart" color={color} />
          ),
          headerTitle: () => (
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Financial Overview
            </Text>
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
