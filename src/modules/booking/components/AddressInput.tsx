import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function AddressInput({
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Address
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Enter your address"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  input: {
    height: 55,

    borderRadius: 18,

    borderWidth: 1,

    borderColor: "#E5E7EB",

    paddingHorizontal: 18,

    backgroundColor: "#fff",
  },
});