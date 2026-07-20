import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  onClear,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={22} color="#9CA3AF" />

      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm dịch vụ (ví dụ: vệ sinh...)"
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />

      {Boolean(value) && (
        <TouchableOpacity onPress={onClear || (() => onChangeText?.(""))}>
          <Ionicons name="close-circle" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      )}
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