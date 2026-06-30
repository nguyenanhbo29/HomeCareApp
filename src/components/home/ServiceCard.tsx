import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Service } from "../../types/home";

interface Props {
  item: Service;
  onPress?: () => void;
}

export default function ServiceCard({
  item,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {/* Image */}
<View style={styles.image}>
  <Ionicons
    name="image-outline"
    size={42}
    color="#BDBDBD"
  />

  {/* Favorite */}
  <TouchableOpacity style={styles.favoriteButton}>
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
      <Text style={styles.name}>
        {item.name}
      </Text>

      <Text style={styles.category}>
        {item.category}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          {item.price.toLocaleString()} đ
        </Text>

        <View style={styles.rating}>
          <Ionicons
            name="star"
            size={14}
            color="#FFC107"
          />
          <Text>{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    borderRadius: 24,
    backgroundColor:"#fff",

    padding:15,

    marginRight:16,

    shadowColor:"#000",
    shadowOpacity:0.08,
    shadowRadius:10,
    shadowOffset:{
        width:0,
        height:5
    },

    elevation:5,
},

 image:{
    height:150,
    borderRadius:20,
    backgroundColor:"#ECECEC",

    justifyContent:"center",
    alignItems:"center",

    marginBottom:15
},

  name: {
    fontWeight: "700",
    fontSize: 16,
  },

  category: {
    color: "#888",
    marginTop: 4,
  },

  footer: {
    marginTop: 12,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  price: {
    color: "#6C4CF1",
    fontWeight: "700",
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
});