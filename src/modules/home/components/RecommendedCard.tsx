import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RecommendedCardProps {
  title: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress?: () => void;
}

export default function RecommendedCard({
  title,
  description,
  price,
  rating,
  reviews,
  duration,
  icon,
  color,
  onPress,
}: RecommendedCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {/* Icon */}
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: color },
        ]}
      >
        <Ionicons
          name={icon}
          size={30}
          color="#FFFFFF"
        />
      </View>

      {/* Info */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>
          {description}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons
            name="star"
            size={14}
            color="#FFC107"
          />

          <Text style={styles.rating}>
            {rating} ({reviews})
          </Text>

          <Text style={styles.dot}>•</Text>

          <Text style={styles.duration}>
            {duration}
          </Text>
        </View>
      </View>

      {/* Price */}
      <Text style={styles.price}>${price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 16,

    marginBottom: 16,

    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  iconContainer: {
    width: 62,
    height: 62,

    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    marginLeft: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  rating: {
    marginLeft: 4,
    color: "#6B7280",
    fontSize: 13,
  },

  dot: {
    marginHorizontal: 6,
    color: "#9CA3AF",
  },

  duration: {
    color: "#6B7280",
    fontSize: 13,
  },

  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5B4CF0",
  },
});