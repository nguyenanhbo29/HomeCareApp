export interface Service {
  id: string;
  name: string;
  category: string;
  image: string;

  price: number;
  rating: number;
  duration: string;

  description?: string;

  isFavorite?: boolean;
}

import { Ionicons } from "@expo/vector-icons";

export interface ServiceFeature {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color: string;
}