import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HomeHeaderProps {
  userName: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ userName }) => {
  return (
    <View style={styles.container}>
      {/* Text */}
      <View>
        <Text style={styles.welcome}>WELCOME</Text>

        <Text style={styles.name}>
          Hello, {userName} 👋
        </Text>
      </View>

      {/* Notification */}
      <TouchableOpacity style={styles.notificationButton}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#4F46E5"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },

  welcome: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },

  name: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  notificationButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#F5F5F5",

    justifyContent: "center",
    alignItems: "center",
  },
});