import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ServiceHeroProps {
  isFavorite?: boolean;
  onBack?: () => void;
  onFavorite?: () => void;
}

export default function ServiceHero({
  isFavorite = false,
  onBack,
  onFavorite,
}: ServiceHeroProps) {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.circleButton}
        onPress={onBack}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#111827"
        />
      </TouchableOpacity>

      {/* Favorite */}
      <TouchableOpacity
        style={[
          styles.circleButton,
          styles.favoriteButton,
        ]}
        onPress={onFavorite}
      >
        <Ionicons
          name={
            isFavorite
              ? "heart"
              : "heart-outline"
          }
          size={24}
          color="#111827"
        />
      </TouchableOpacity>

      {/* Placeholder Image */}
      <View style={styles.iconContainer}>
        <Ionicons
          name="sparkles-outline"
          size={140}
          color="rgba(255,255,255,0.35)"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,

    backgroundColor: "#6C4CF1",

    justifyContent: "center",
    alignItems: "center",
  },

  circleButton: {
    position: "absolute",

    top: 50,
    left: 20,

    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    zIndex: 10,
  },

  favoriteButton: {
    left: undefined,
    right: 20,
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});