import React from "react";
import {
  View,
 Text,
  StyleSheet,
} from "react-native";

import ReviewCard from "./ReviewCard";

interface Props {
  reviews: any[];
}

export default function ReviewSection({
  reviews,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Customer Reviews
      </Text>

      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 30,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111827",
  },
});