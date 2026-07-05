import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Service } from "../types/home";

interface Props {
  item: Service;
  onPress?: () => void;
  onPressFavorite?: (service: Service) => void;
}

export default function ServiceCard({
  item,
  onPress,
  onPressFavorite,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={onPress}
    >
      {/* Image */}
      <View style={styles.image}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.imageView}
            resizeMode="cover"
          />
        ) : (
          <Ionicons
            name="image-outline"
            size={42}
            color="#BDBDBD"
          />
        )}

        {/* Favorite */}
        <TouchableOpacity
          style={styles.favoriteButton}
          activeOpacity={0.8}
          onPress={() => onPressFavorite?.(item)}
        >
          <Ionicons
            name={
              item.isFavorite
                ? "heart"
                : "heart-outline"
            }
            size={22}
            color="#FF4D6D"
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Text
    style={styles.name}
    numberOfLines={2}
>
    {item.name}
</Text>

      <Text style={styles.category}
      numberOfLines={1}>
        
        {typeof item.category === "string"
          ? item.category
          : item.category?.name}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          ${item.price}
        </Text>

        <View style={styles.rating}>
          <Ionicons
            name="star"
            size={14}
            color="#FFC107"
          />

          <Text style={styles.ratingText}>
            {item.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width:220,
    height:320,
    marginRight: 16,
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  image: {
    height: 150,
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: "#ECECEC",
    overflow: "hidden",

    justifyContent: "center",
    alignItems: "center",
  },

  imageView: {
    width: "100%",
    height: "100%",
  },

  favoriteButton: {
    position: "absolute",

    top: 10,
    right: 10,

    width: 36,
    height: 36,

    borderRadius: 18,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  name: {
  fontSize: 18,
  fontWeight: "700",
  color: "#111827",

  height: 48,
  lineHeight: 24,
},

category: {
  marginTop: 4,
  fontSize: 14,
  color: "#6B7280",

  height: 20,
},

footer: {
  marginTop: "auto",

  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5B4CF0",
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
  },

  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#374151",
  },
});