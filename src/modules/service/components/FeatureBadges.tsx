import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Feature {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color: string;
}

interface Props {
  data: Feature[];
}

export default function FeatureBadges({
  data,
}: Props) {
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <View
          key={item.id}
          style={styles.card}
        >
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: `${item.color}20`,
              },
            ]}
          >
            <Ionicons
              name={item.icon}
              size={26}
              color={item.color}
            />
          </View>

          <Text style={styles.title}>
            {item.title}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: 28,
    marginBottom: 30,
  },

  card: {
    flex: 1,

    alignItems: "center",

    marginHorizontal: 5,
  },

  iconContainer: {
    width: 70,
    height: 70,

    borderRadius: 35,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",

    color: "#111827",

    textAlign: "center",
  },
});