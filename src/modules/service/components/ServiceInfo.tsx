import React from "react";
import {
  View,
 Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ServiceInfoProps {
  name: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  badge?: string;
}

export default function ServiceInfo({
  name,
  price,
  rating,
  reviews,
  duration,
  badge = "Popular",
}: ServiceInfoProps) {
  return (
    <View style={styles.container}>
      {/* Badge */}
      <View style={styles.badge}>
        <Ionicons
          name="sparkles"
          size={12}
          color="#6C4CF1"
        />

        <Text style={styles.badgeText}>
          {badge}
        </Text>
      </View>

      {/* Title + Price */}
      <View style={styles.titleRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>
            {name}
          </Text>

          <View style={styles.infoRow}>
            <Ionicons
              name="star"
              size={15}
              color="#FFC107"
            />

            <Text style={styles.infoText}>
              {rating} ({reviews})
            </Text>

            <Ionicons
              name="time-outline"
              size={15}
              color="#6B7280"
              style={{ marginLeft: 12 }}
            />

            <Text style={styles.infoText}>
              {duration}
            </Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            ${price}
          </Text>

          <Text style={styles.session}>
            per session
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",

    marginTop: -20,

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    padding: 20,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",

    alignSelf: "flex-start",

    backgroundColor: "#F3F4F6",

    borderRadius: 20,

    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  badgeText: {
    marginLeft: 5,

    color: "#111827",

    fontWeight: "600",
    fontSize: 12,
  },

  titleRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 16,
  },

  name: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 10,
  },

  infoText: {
    marginLeft: 4,

    color: "#6B7280",
    fontSize: 14,
  },

  priceContainer: {
    alignItems: "flex-end",
  },

  price: {
    fontSize: 34,
    fontWeight: "700",
    color: "#5B4CF0",
  },

  session: {
    color: "#6B7280",
    fontSize: 13,
  },
});