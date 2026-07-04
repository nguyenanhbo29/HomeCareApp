import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface AboutSectionProps {
  description: string;
  onReadMore?: () => void;
}

export default function AboutSection({
  description,
  onReadMore,
}: AboutSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        About this service
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onReadMore}
      >
        <Text style={styles.readMore}>
          Read More
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 30,
  },

  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    color: "#6B7280",
  },

  readMore: {
    marginTop: 12,
    color: "#6C4CF1",
    fontWeight: "700",
    fontSize: 15,
  },
});