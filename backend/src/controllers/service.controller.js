const serviceService = require("../services/service.service");
const Service = require("../models/Service");

async function listServices(req, res) {
  try {
    const services = await serviceService.getAllServices();

    res.json({
      success: true,
      message: "Services fetched successfully",
      data: services,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function listPopularServices(req, res) {
  try {
    const services = await serviceService.getPopularServices();

    res.json({
      success: true,
      message: "Popular services fetched successfully",
      data: services,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function listRecommendedServices(req, res) {
  try {
    const services = await serviceService.getRecommendedServices();

    res.json({
      success: true,
      message: "Recommended services fetched successfully",
      data: services,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getService(req, res) {
  try {
    const service = await serviceService.getServiceById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service fetched successfully",
      data: service,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function seedServices(req, res) {
  try {
    const services = await serviceService.seedServices();

    res.json({
      success: true,
      message: "Services seeded successfully",
      data: services,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function createService(req, res) {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateService(req, res) {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    res.json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteService(req, res) {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  listServices,
  listPopularServices,
  listRecommendedServices,
  getService,
  seedServices,
  createService,
  updateService,
  deleteService,
};
