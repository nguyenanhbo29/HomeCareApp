const {
  getPopularServices,
  getRecommendedServices,
  getAllServices,
  getServiceById,
  seedServices,
} = require("../services/service.service");

async function listPopularServices(req, res) {
  try {
    await seedServices();
    const services = await getPopularServices();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function listRecommendedServices(req, res) {
  try {
    await seedServices();
    const services = await getRecommendedServices();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function listServices(req, res) {
  try {
    await seedServices();
    const services = await getAllServices();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getService(req, res) {
  try {
    await seedServices();
    const service = await getServiceById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  listPopularServices,
  listRecommendedServices,
  listServices,
  getService,
};
