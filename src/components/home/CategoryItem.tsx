import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Category } from "../../types/home";

interface Props {
    item: Category;
    onPress?: () => void;
}

export default function CategoryItem({ item, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: item.color },
        ]}
      >
        <Ionicons
          name={item.icon as any}
          color="#fff"
          size={28}
        />
      </View>

      <Text style={styles.title}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    alignItems: "center",
  },

  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  title: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
  },
});