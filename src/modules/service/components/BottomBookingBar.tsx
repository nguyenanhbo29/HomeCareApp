import React from "react";
import {
  View,
 Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface BottomBookingBarProps {
  price: number;
  onBookNow?: () => void;
}

export default function BottomBookingBar({
  price,
  onBookNow,
}: BottomBookingBarProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>
          Starting from
        </Text>

        <Text style={styles.price}>
          ${price}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={onBookNow}
      >
        <Text style={styles.buttonText}>
          Book Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 24,
    paddingVertical: 18,

    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,
    borderTopColor: "#ECECEC",
  },

  label: {
    color: "#9CA3AF",
    fontSize: 13,
  },

  price: {
    marginTop: 2,

    fontSize: 28,
    fontWeight: "700",

    color: "#5B4CF0",
  },

  button: {
    backgroundColor: "#5B4CF0",

    paddingHorizontal: 34,
    paddingVertical: 15,

    borderRadius: 16,
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 16,
    fontWeight: "700",
  },
});