import { Service } from "../types/service";

export const services: Service[] = [
  {
    id: "1",
    name: "House Cleaning",
    category: "Cleaning",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
    price: 150000,
    rating: 4.9,
    duration: "2 Hours",
    description:
      "Professional house cleaning service with experienced staff.",
    isFavorite: false,
  },
  {
    id: "2",
    name: "Deep Cleaning",
    category: "Cleaning",
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600",
    price: 250000,
    rating: 4.8,
    duration: "3 Hours",
    description:
      "Complete deep cleaning for your entire home.",
    isFavorite: false,
  },
  {
    id: "3",
    name: "Office Cleaning",
    category: "Cleaning",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600",
    price: 320000,
    rating: 4.9,
    duration: "4 Hours",
    description:
      "Professional office cleaning service.",
    isFavorite: false,
  },
  {
    id: "4",
    name: "Move-out Cleaning",
    category: "Cleaning",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600",
    price: 450000,
    rating: 4.7,
    duration: "5 Hours",
    description:
      "Cleaning service before moving out.",
    isFavorite: false,
  },
];

export const serviceFeatures = [
  {
    id: "1",
    icon: "shield-checkmark",
    title: "Insured",
    color: "#4F46E5",
  },
  {
    id: "2",
    icon: "star",
    title: "Top Rated",
    color: "#F59E0B",
  },
  {
    id: "3",
    icon: "time",
    title: "On Time",
    color: "#10B981",
  },
];

export const serviceDescription =
  "Our professional home cleaning service provides a spotless and healthy living environment. Experienced cleaners use high-quality equipment and eco-friendly products to ensure every corner of your home is cleaned with care. Choose flexible schedules that fit your lifestyle and enjoy a cleaner, more comfortable home.";

  export const reviews = [
  {
    id: "1",
    user: "Emily",
    rating: 5,
    date: "2 days ago",
    comment:
      "Amazing cleaning service! My apartment has never looked this clean.",
  },
  {
    id: "2",
    user: "Michael",
    rating: 4,
    date: "1 week ago",
    comment:
      "Staff arrived on time and did a fantastic job.",
  },
];