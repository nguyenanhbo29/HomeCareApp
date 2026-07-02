import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import CategoryItem from "./CategoryItem";
import { Category } from "../types/home";

interface CategorySectionProps {
  data: Category[];
  onPressCategory?: (category: Category) => void;
}

export default function CategorySection({
  data,
  onPressCategory,
}: CategorySectionProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>

        <TouchableOpacity onPress={() => onPressCategory && onPressCategory(data[0])}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* List Category */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            onPress={() => onPressCategory?.(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
    paddingRight: 10,
  },
});