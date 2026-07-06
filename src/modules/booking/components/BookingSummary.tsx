import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  service: string;
  duration: string;
  rate: number;
}

export default function BookingSummary({
  service,
  duration,
  rate,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Booking Summary
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>Service</Text>

        <Text style={styles.value}>
          {service}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Duration</Text>

        <Text style={styles.value}>
          {duration}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Rate</Text>

        <Text style={styles.value}>
          ${rate}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>
          Total
        </Text>

        <Text style={styles.totalPrice}>
          ${rate}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,

    marginHorizontal: 20,

    padding: 20,

    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",

    marginBottom: 18,
  },

  row: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 12,
  },

  label: {
    fontSize: 16,

    color: "#6B7280",
  },

  value: {
    fontSize: 16,

    fontWeight: "600",
  },

  divider: {
    height: 1,

    backgroundColor: "#E5E7EB",

    marginVertical: 15,
  },

  totalLabel: {
    fontSize: 18,

    fontWeight: "700",
  },

  totalPrice: {
    fontSize: 22,

    fontWeight: "700",

    color: "#6C4CF1",
  },
});