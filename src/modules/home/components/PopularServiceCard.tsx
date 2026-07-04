import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Service } from "../types/home";
import ServiceCard from "./ServiceCard";

interface Props {
  title: string;
  data: Service[];
  onPressItem?: (service: Service) => void;
}

export default function PopularServiceSection({
  title,
  data,
  onPressItem,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ServiceCard
            item={item}
            onPress={() => onPressItem?.(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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
    color: "#6C4CF1",
    fontWeight: "600",
  },

  list: {
    paddingRight: 20,
  },
});