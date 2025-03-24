import { View, Text, Image, StyleSheet } from "react-native";
import sun from "../assets/sun.svg";

export default function Greeting() {
  return (
    <View style={styles.greetings}>
      <View style={styles.text}>
        <Text style={styles.title}>Good Morning, Chelsea!</Text>
        <Text style={styles.subtitle}>
          Check all your incoming and outgoing transactions here
        </Text>
      </View>
      <View style={styles.profile}>
        <Image source={sun} style={styles.avatar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  greetings: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  profile: {
    marginLeft: 10,
  },
  avatar: {
    width: 60,
    height: 60,
  },
});
