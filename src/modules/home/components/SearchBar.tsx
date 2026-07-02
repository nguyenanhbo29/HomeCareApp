import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({
  value,
  onChangeText,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={22} color="#9CA3AF" />

      <TextInput
        style={styles.input}
        placeholder="Search services, e.g. cleaning"
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 54,

    backgroundColor: "#F5F6FA",

    borderRadius: 27,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 18,

    marginBottom: 24,
  },

  input: {
    flex: 1,

    marginLeft: 10,

    fontSize: 16,

    color: "#111827",
  },
});