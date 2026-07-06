import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface TimeItem {
  id: string;
  time: string;
}

interface Props {
  data: TimeItem[];
  selected: string;
  onSelect: (time: string) => void;
}

export default function TimeSelector({
  data,
  selected,
  onSelect,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Select Time
      </Text>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const active =
            item.time === selected;

          return (
            <TouchableOpacity
              style={[
                styles.item,
                active &&
                  styles.activeItem,
              ]}
              activeOpacity={0.85}
              onPress={() =>
                onSelect(item.time)
              }
            >
              <Text
                style={[
                  styles.text,
                  active &&
                    styles.activeText,
                ]}
              >
                {item.time}
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

  item: {
    paddingHorizontal: 22,

    height: 50,

    borderRadius: 25,

    backgroundColor: "#F3F4F6",

    marginRight: 12,

    justifyContent: "center",

    alignItems: "center",
  },

  activeItem: {
    backgroundColor: "#6C4CF1",
  },

  text: {
    fontSize: 16,

    fontWeight: "600",

    color: "#374151",
  },

  activeText: {
    color: "#FFFFFF",
  },
});