import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";

export default function BookingHeader() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#111827"
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        Book Service
      </Text>

      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: 20,
  },

  backButton: {
    width: 40,

    height: 40,

    borderRadius: 20,

    justifyContent: "center",

    alignItems: "center",
  },

  title: {
    fontSize: 22,

    fontWeight: "700",

    color: "#111827",
  },
});