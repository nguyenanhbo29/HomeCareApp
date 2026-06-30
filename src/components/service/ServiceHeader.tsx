import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ServiceHeaderProps {
  title: string;
}

export default function ServiceHeader({
  title,
}: ServiceHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name="arrow-back"
          size={22}
          color="#222"
        />
      </TouchableOpacity>

      <Text style={styles.title}>
        {title}
      </Text>

      {/* Placeholder để title luôn nằm giữa */}
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F5F5F5",

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  placeholder: {
    width: 42,
  },
});