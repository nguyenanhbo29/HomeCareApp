import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ServiceHeroProps {
  image?: string;
  isFavorite?: boolean;
  onBack?: () => void;
  onFavorite?: () => void;
}

export default function ServiceHero({
  image,
  isFavorite: initialFav = false,
  onBack,
  onFavorite,
}: ServiceHeroProps) {
  const [isFavorite, setIsFavorite] = React.useState(initialFav);

  React.useEffect(() => {
    setIsFavorite(initialFav);
  }, [initialFav]);

  const toggleFav = () => {
    setIsFavorite(!isFavorite);
    onFavorite?.();
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons
            name="image-outline"
            size={80}
            color="rgba(255,255,255,0.7)"
          />
        </View>
      )}

      {/* Dark Overlay */}
      <View style={styles.overlay} />

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

      {/* Favorite Button */}
      <TouchableOpacity
        style={[
          styles.circleButton,
          styles.favoriteButton,
        ]}
        onPress={toggleFav}
      >
        <Ionicons
          name={
            isFavorite
              ? "heart"
              : "heart-outline"
          }
          size={24}
          color="#FF4D6D"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
    backgroundColor: "#ECECEC",
  },

  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.18)",
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

    zIndex: 100,
  },

  favoriteButton: {
    left: undefined,
    right: 20,
  },
});