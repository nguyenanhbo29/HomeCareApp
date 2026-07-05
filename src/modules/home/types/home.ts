import { Ionicons } from "@expo/vector-icons";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Service {
  id: string;

  name: string;
  description: string;

  image: string;

  category: string;

  price: number;

  rating: number;
  reviews: number;

  duration: string;

  icon: keyof typeof Ionicons.glyphMap;
  color: string;

  badge?: string;

  isFavorite?: boolean;
}