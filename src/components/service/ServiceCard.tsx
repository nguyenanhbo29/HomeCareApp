import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface ServiceCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  duration: string;
  image: string;

  onPress?: () => void;
}

export default function ServiceCard({
  name,
  category,
  price,
  rating,
  duration,
  image,
  onPress,
}: ServiceCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image
        source={{ uri: image }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.name}>
          {name}
        </Text>

        <Text style={styles.category}>
          {category}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons
              name="star"
              size={15}
              color="#FFC107"
            />
            <Text style={styles.infoText}>
              {rating}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons
              name="time-outline"
              size={15}
              color="#666"
            />
            <Text style={styles.infoText}>
              {duration}
            </Text>
          </View>
        </View>

        <Text style={styles.price}>
          {price.toLocaleString()} đ
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#999"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",

    borderRadius: 18,

    padding: 14,

    marginBottom: 16,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 14,
    backgroundColor: "#ECECEC",
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },

  category: {
    marginTop: 4,
    color: "#777",
    fontSize: 14,
  },

  infoRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },

  infoText: {
    marginLeft: 4,
    color: "#666",
    fontSize: 13,
  },

  price: {
    marginTop: 10,
    color: "#5B4CFF",
    fontWeight: "700",
    fontSize: 17,
  },
});