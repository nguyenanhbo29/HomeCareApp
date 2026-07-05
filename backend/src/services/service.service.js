const Service = require("../models/Service");
const Category = require("../models/Category");
const { toApiItem, toApiList } = require("../utils/serialize");

/**
 * Lấy tất cả dịch vụ
 */
async function getAllServices() {
  const services = await Service.find({
    isActive: true,
  })
    .populate("category")
    .sort({ createdAt: 1 });

  return toApiList(services);
}

/**
 * Lấy dịch vụ phổ biến
 */
async function getPopularServices() {
  const services = await Service.find({
    isPopular: true,
    isActive: true,
  })
    .populate("category")
    .sort({ createdAt: 1 });

  return toApiList(services);
}

/**
 * Lấy dịch vụ đề xuất
 */
async function getRecommendedServices() {
  const services = await Service.find({
    isRecommended: true,
    isActive: true,
  })
    .populate("category")
    .sort({ createdAt: 1 });

  return toApiList(services);
}

/**
 * Lấy chi tiết dịch vụ
 */
async function getServiceById(id) {
  const service = await Service.findById(id).populate("category");

  if (!service) {
    throw new Error("Service not found");
  }

  return toApiItem(service);
}

/**
 * Seed dữ liệu mẫu
 */
async function seedServices() {
  const count = await Service.countDocuments();

  if (count > 0) {
    const services = await Service.find().populate("category");

    return toApiList(services);
  }

  // lấy category đã seed
  const categories = await Category.find();

  const cleaning = categories.find((c) => c.name === "House Cleaning");

  const laundry = categories.find((c) => c.name === "Laundry");

  const ac = categories.find((c) => c.name === "AC Cleaning");

  const pet = categories.find((c) => c.name === "Pet Care");

  const defaultServices = [
    {
      name: "House Cleaning Premium",
      description: "Professional house cleaning",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",
      category: cleaning._id,
      price: 150000,
      rating: 4.9,
      reviews: 521,
      duration: "2 hours",
      icon: "sparkles",
      color: "#6C4CF1",
      badge: "Best Seller",
      isPopular: true,
      isRecommended: true,
      isFavorite: true,
    },

    {
      name: "Laundry Service",
      description: "Wash, dry and fold",
      image:
        "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800",
      category: laundry._id,
      price: 80000,
      rating: 4.8,
      reviews: 321,
      duration: "24 hours",
      icon: "shirt",
      color: "#2196F3",
      isPopular: true,
    },

    {
      name: "AC Cleaning",
      description: "Deep cleaning for air conditioner",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
      category: ac._id,
      price: 250000,
      rating: 4.9,
      reviews: 182,
      duration: "1.5 hours",
      icon: "snow",
      color: "#00C853",
      isRecommended: true,
    },

    {
      name: "Pet Care",
      description: "Pet grooming and care",
      image:
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800",
      category: pet._id,
      price: 180000,
      rating: 5,
      reviews: 97,
      duration: "1 hour",
      icon: "paw",
      color: "#FF9800",
      isRecommended: true,
    },
  ];
  await Service.insertMany(defaultServices);

  const services = await Service.find().populate("category");

  return toApiList(services);
}

module.exports = {
  getAllServices,
  getPopularServices,
  getRecommendedServices,
  getServiceById,
  seedServices,
};
