import { Category, Service } from "../types/home";

export const categories: Category[] = [
  {
    id: "1",
    title: "House Cleaning",
    icon: "sparkles",
    color: "#6C4CF1",
  },
  {
    id: "2",
    title: "Laundry",
    icon: "shirt",
    color: "#2196F3",
  },
  {
    id: "3",
    title: "AC Cleaning",
    icon: "snow",
    color: "#00C853",
  },
  {
    id: "4",
    title: "Pet Care",
    icon: "paw",
    color: "#FF9800",
  },
];

export const popularServices: Service[] = [
  {
    id: "1",
    name: "House Cleaning",
    image: "",
    category: "Cleaning",
    price: 150000,
    rating: 4.9,
    isFavorite: true,
  },
  {
    id: "2",
    name: "Laundry",
    image: "",
    category: "Laundry",
    price: 80000,
    rating: 4.8,
    isFavorite: false,
  },
];

export const recommendedServices: Service[] = [
  {
    id: "5",
    name: "Pet Care",
    image: "",
    price: 120000,
    rating: 4.9,
    category: "Pet",
    isFavorite: false,
  },
  {
    id: "6",
    name: "AC Cleaning",
    image: "",
    price: 180000,
    rating: 4.8,
    category: "Cleaning",
    isFavorite: false,
  },
  {
    id: "7",
    name: "Cooking",
    image: "",
    price: 250000,
    rating: 4.7,
    category: "Cooking",
    isFavorite: false,
  },
];