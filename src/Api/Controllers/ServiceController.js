const serviceAPI = require('../Services/serviceAPI');

module.exports = {
  // Controller for fetching data from all services
  getAllServicesData: async (req, res) => {
    try {
      const data = await serviceAPI.fetchAllServicesData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Controller for fetching data from specific service
  getServiceData: (service) => async (req, res) => {
    try {
      const data = await serviceAPI.fetchData(service, req.params.endpoint);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
