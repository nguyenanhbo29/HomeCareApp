import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DateItem {
  id: string;
  day: string;
  date: string;
}

interface Props {
  data: DateItem[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function DateSelector({
  data,
  selected,
  onSelect,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Select Date
      </Text>

      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const active = item.id === selected;

          return (
            <TouchableOpacity
              style={[
                styles.card,
                active && styles.activeCard,
              ]}
              onPress={() => onSelect(item.id)}
            >
              <Text
                style={[
                  styles.day,
                  active && styles.activeText,
                ]}
              >
                {item.day}
              </Text>

              <Text
                style={[
                  styles.date,
                  active && styles.activeText,
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },

  card: {
    width: 70,
    height: 90,

    marginRight: 12,

    borderRadius: 20,

    backgroundColor: "#F5F5F5",

    justifyContent: "center",
    alignItems: "center",
  },

  activeCard: {
    backgroundColor: "#6C4CF1",
  },

  day: {
    fontSize: 14,
    color: "#777",
  },

  date: {
    marginTop: 6,
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  activeText: {
    color: "#fff",
  },
});