const Service = require("../models/Service");
const { toApiList, toApiItem } = require("../utils/serialize");

async function getPopularServices() {
  const services = await Service.find({ badge: "Popular" }).sort({
    createdAt: 1,
  });
  return toApiList(services);
}

async function getRecommendedServices() {
  const services = await Service.find({ badge: "Recommended" }).sort({
    createdAt: 1,
  });
  return toApiList(services);
}

async function getAllServices() {
  const services = await Service.find().sort({ createdAt: 1 });
  return toApiList(services);
}

async function getServiceById(serviceId) {
  const service = await Service.findById(serviceId);
  return toApiItem(service);
}

async function seedServices() {
  const count = await Service.countDocuments();

  if (count > 0) {
    return;
  }

  const defaultServices = [
    {
      name: "House Cleaning",
      description: "Professional house cleaning service",
      image: "",
      category: "Cleaning",
      price: 150000,
      rating: 4.9,
      reviews: 1280,
      duration: "2 hours",
      icon: "sparkles",
      color: "#6C4CF1",
      badge: "Popular",
      isFavorite: true,
    },
    {
      name: "Laundry",
      description: "Wash, dry & fold",
      image: "",
      category: "Laundry",
      price: 80000,
      rating: 4.8,
      reviews: 940,
      duration: "24 hours",
      icon: "shirt",
      color: "#2196F3",
      badge: "Popular",
      isFavorite: false,
    },
    {
      name: "Laundry",
      description: "Wash, dry & fold",
      image: "",
      category: "Laundry",
      price: 12,
      rating: 4.8,
      reviews: 940,
      duration: "24 hours",
      icon: "shirt-outline",
      color: "#12A8E8",
      badge: "Recommended",
      isFavorite: false,
    },
    {
      name: "AC Cleaning",
      description: "Cool, fresh air",
      image: "",
      category: "AC Cleaning",
      price: 25,
      rating: 4.9,
      reviews: 612,
      duration: "1.5 hours",
      icon: "leaf-outline",
      color: "#11C08A",
      badge: "Recommended",
      isFavorite: false,
    },
    {
      name: "Pet Care",
      description: "Loving pet sitters",
      image: "",
      category: "Pet Care",
      price: 15,
      rating: 5,
      reviews: 421,
      duration: "1 hour",
      icon: "paw-outline",
      color: "#FF8B00",
      badge: "Recommended",
      isFavorite: false,
    },
  ];

  await Service.insertMany(defaultServices);
}

module.exports = {
  getPopularServices,
  getRecommendedServices,
  getAllServices,
  getServiceById,
  seedServices,
};
