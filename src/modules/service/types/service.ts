import { Ionicons } from "@expo/vector-icons";

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Service {
  id: string;

  name: string;

  category: Category;

  image: string;

  price: number;

  rating: number;

  duration: string;

  description?: string;

  isFavorite?: boolean;
}

export interface ServiceFeature {
  id: string;

  icon: keyof typeof Ionicons.glyphMap;

  title: string;

  color: string;
}