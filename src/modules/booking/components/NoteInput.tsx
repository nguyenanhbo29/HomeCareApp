import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export default function NoteInput({
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Note
      </Text>

      <TextInput
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        value={value}
        onChangeText={onChangeText}
        placeholder="Additional information..."
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
    minHeight: 120,

    borderRadius: 18,

    borderWidth: 1,

    borderColor: "#E5E7EB",

    backgroundColor: "#fff",

    padding: 15,
  },
});