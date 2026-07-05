const categoryService = require("../services/category.service");

async function getCategories(req, res) {
  try {
    const categories = await categoryService.getAllCategories();

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function seedCategories(req, res) {
  try {
    const categories = await categoryService.seedCategories();

    return res.status(201).json({
      success: true,
      message: "Categories seeded successfully",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getCategories,
  seedCategories,
};
