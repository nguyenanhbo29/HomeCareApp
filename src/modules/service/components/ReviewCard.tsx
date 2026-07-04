import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Props {
  review: Review;
}

export default function ReviewCard({
  review,
}: Props) {
  return (
    <View style={styles.card}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <Ionicons
          name="person"
          size={24}
          color="#6C4CF1"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {review.user}
          </Text>

          <Text style={styles.date}>
            {review.date}
          </Text>
        </View>

        <View style={styles.rating}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Ionicons
              key={index}
              name={
                index < review.rating
                  ? "star"
                  : "star-outline"
              }
              size={15}
              color="#FFC107"
            />
          ))}
        </View>

        <Text style={styles.comment}>
          {review.comment}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",

    marginBottom: 20,
  },

  avatar: {
    width: 52,
    height: 52,

    borderRadius: 26,

    backgroundColor: "#F3F4F6",

    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,

    marginLeft: 14,
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  date: {
    color: "#9CA3AF",
    fontSize: 13,
  },

  rating: {
    flexDirection: "row",

    marginTop: 5,
    marginBottom: 8,
  },

  comment: {
    color: "#6B7280",

    lineHeight: 22,
  },
});