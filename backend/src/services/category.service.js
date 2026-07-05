const Category = require("../models/Category");
const { toApiList } = require("../utils/serialize");

async function getAllCategories() {
  const categories = await Category.find({
    isActive: true,
  }).sort({
    createdAt: 1,
  });

  return toApiList(categories);
}

async function seedCategories() {
  const count = await Category.countDocuments();

  if (count > 0) {
    const categories = await Category.find({
      isActive: true,
    }).sort({
      createdAt: 1,
    });

    return toApiList(categories);
  }

  const defaultCategories = [
    {
      name: "House Cleaning",
      icon: "sparkles",
      color: "#6C4CF1",
      description: "Professional house cleaning",
      isActive: true,
    },
    {
      name: "Laundry",
      icon: "shirt",
      color: "#2196F3",
      description: "Fast and reliable laundry service",
      isActive: true,
    },
    {
      name: "AC Cleaning",
      icon: "snow",
      color: "#00C853",
      description: "Air conditioner care and cleaning",
      isActive: true,
    },
    {
      name: "Pet Care",
      icon: "paw",
      color: "#FF9800",
      description: "Gentle pet services and support",
      isActive: true,
    },
  ];

  await Category.insertMany(defaultCategories);

  const categories = await Category.find({
    isActive: true,
  }).sort({
    createdAt: 1,
  });

  return toApiList(categories);
}

module.exports = {
  getAllCategories,
  seedCategories,
};
