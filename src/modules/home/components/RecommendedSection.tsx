import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import RecommendedCard from "./RecommendedCard";
import { Service } from "../types/home";

interface RecommendedSectionProps {
  title: string;
  data: Service[];
  onPressItem?: (service: Service) => void;
}

export default function RecommendedSection({
  title,
  data,
  onPressItem,
}: RecommendedSectionProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity>
          <Text style={styles.seeAll}>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      {data.map((item) => (
        <RecommendedCard
          key={item.id}
          title={item.name}
          description={item.description}
          price={item.price}
          rating={item.rating}
          reviews={item.reviews}
          duration={item.duration}
          icon={item.icon}
          color={item.color}
          onPress={() => onPressItem?.(item)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    marginBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  seeAll: {
    color: "#5B4CF0",
    fontWeight: "600",
  },
});