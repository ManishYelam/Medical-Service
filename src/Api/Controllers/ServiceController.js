const serviceAPI = require('../Services/serviceAPI');

// Controller for fetching data from all services
const getAllServicesData = async (req, res) => {
  try {
    const data = await serviceAPI.fetchAllServicesData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for fetching data from specific service
const getServiceData = (service) => async (req, res) => {
  try {
    const data = await serviceAPI.fetchData(service, req.params.endpoint);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllServicesData,
  getServiceData,
};
