require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const { appLogger, errorLogger } = require('../../../Config/Setting/logger.config');
const app = express();

const server = http.createServer(app);

const DefineLogisticsRoutes = () => {

  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the Logistics Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "Manage delivery operations, including routing and tracking.",
          api_version: "1.0",
          contact_info: {
            email: "support@logistics.com",
            phone: "+1234567891",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "deliveries", href: "/api/logistics/deliveries" },
            { rel: "drivers", href: "/api/logistics/drivers" },
          ],
        },
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("Error in /data endpoint:", error.message);
      res.status(500).json({
        message: "An error occurred while processing your request.",
        error: error.message,
      });
    }
  });

  app.get('/data', async (req, res) => {
    try {
      const response = await axios.get(process.env.L_LOGISTICS_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching logistics data:', error);
      res.status(500).json({ error: 'Failed to fetch logistics data' });
    }
  });
};

const StartLogisticsServer = async () => {
  try {
    DefineLogisticsRoutes();

    const PORT = process.env.LOGISTICS_PORT || 5002;

    server.listen(PORT, () => {
      appLogger.info(`Logistics server running on port ${PORT} on ${moment().format('llll')}.`);
      console.log(`Logistics server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    errorLogger.info(`Logistics server startup error:`, error.message);
    console.error(`Logistics server startup error:`, error);
  }
};

module.exports = { StartLogisticsServer };

