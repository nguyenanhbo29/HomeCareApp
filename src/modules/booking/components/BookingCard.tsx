import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Booking } from "../types/booking";

interface Props {
  item: Booking;
  onPress?: () => void;
}

export default function BookingCard({
  item,
  onPress,
}: Props) {
  function getStatusColor() {
    switch (item.status) {
      case "Pending":
        return "#F59E0B";

      case "Confirmed":
        return "#3B82F6";

      case "Completed":
        return "#10B981";

      case "Cancelled":
        return "#EF4444";

      default:
        return "#6B7280";
    }
  }

  function formatPrice(price: number) {
    return price.toLocaleString("vi-VN") + "đ";
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      {/* Image */}

      <Image
        source={{
          uri: item.service.image,
        }}
        style={styles.image}
      />

      {/* Content */}

      <View style={styles.content}>
        <Text
          style={styles.service}
          numberOfLines={1}
        >
          {item.service.name}
        </Text>

        <View style={styles.row}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color="#6B7280"
          />

          <Text style={styles.info}>
            {formatDate(item.bookingDate)}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons
            name="time-outline"
            size={16}
            color="#6B7280"
          />

          <Text style={styles.info}>
            {item.bookingTime}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons
            name="location-outline"
            size={16}
            color="#6B7280"
          />

          <Text
            style={styles.info}
            numberOfLines={1}
          >
            {item.address}
          </Text>
        </View>

        <View style={styles.bottom}>
          <View
            style={[
              styles.status,
              {
                backgroundColor:
                  getStatusColor(),
              },
            ]}
          >
            <Text style={styles.statusText}>
              {item.status}
            </Text>
          </View>

          <Text style={styles.price}>
            {formatPrice(
              item.totalPrice
            )}
          </Text>
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={24}
        color="#9CA3AF"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,

    marginBottom: 16,

    padding: 14,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    flexDirection: "row",

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  image: {
    width: 80,

    height: 80,

    borderRadius: 16,

    backgroundColor: "#F3F4F6",
  },

  content: {
    flex: 1,

    marginLeft: 14,
  },

  service: {
    fontSize: 17,

    fontWeight: "700",

    color: "#111827",

    marginBottom: 10,
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 6,
  },

  info: {
    marginLeft: 6,

    flex: 1,

    fontSize: 14,

    color: "#6B7280",
  },

  bottom: {
    marginTop: 10,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  status: {
    paddingHorizontal: 10,

    paddingVertical: 4,

    borderRadius: 12,
  },

  statusText: {
    color: "#FFFFFF",

    fontWeight: "600",

    fontSize: 12,
  },

  price: {
    fontSize: 16,

    fontWeight: "700",

    color: "#6C4CF1",
  },
});