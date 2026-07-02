import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PromotionBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Home Service{"\n"}at your Doorstep
        </Text>

        <Text style={styles.description}>
          Book trusted professionals in just a few taps.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>🏠</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6C4CF1",
    borderRadius: 24,
    padding: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 30,
  },

  content: {
    flex: 1,
    paddingRight: 12,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },

  description: {
    color: "#E8E4FF",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },

  buttonText: {
    color: "#6C4CF1",
    fontWeight: "600",
    fontSize: 14,
  },

  imagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#7C5DFA",

    justifyContent: "center",
    alignItems: "center",
  },

  imageText: {
    fontSize: 40,
  },
});