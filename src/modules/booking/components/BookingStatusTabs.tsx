import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import {
  BookingStatus,
} from "../types/booking";

export type BookingFilter =
  | "All"
  | BookingStatus;

interface Props {
  selected: BookingFilter;

  onChange: (
    status: BookingFilter
  ) => void;
}

const tabs: BookingFilter[] = [
  "All",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

export default function BookingStatusTabs({
  selected,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((item) => (
        <TouchableOpacity
          key={item}
          activeOpacity={0.85}
          style={[
            styles.tab,
            selected === item &&
              styles.activeTab,
          ]}
          onPress={() =>
            onChange(item)
          }
        >
          <Text
            style={[
              styles.text,
              selected === item &&
                styles.activeText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    marginHorizontal: 20,

    marginBottom: 20,

    flexWrap: "wrap",
  },

  tab: {
    paddingHorizontal: 18,

    paddingVertical: 10,

    marginRight: 10,

    marginBottom: 10,

    borderRadius: 20,

    backgroundColor: "#F3F4F6",
  },

  activeTab: {
    backgroundColor: "#6C4CF1",
  },

  text: {
    fontSize: 14,

    fontWeight: "600",

    color: "#6B7280",
  },

  activeText: {
    color: "#FFFFFF",
  },
});