require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const { appLogger, errorLogger } = require('../../../config/Setting/logger.config');
const app = express();

const server = http.createServer(app);

const DefinePharmacyRoutes = () => {
  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the Pharmacy Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "This is the gateway to manage pharmacy operations, including inventory management, order processing, and customer interactions.",
          api_version: "1.0",
          contact_info: {
            email: "support@pharmacy.com",
            phone: "+1234567890",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "inventory", href: "/api/pharmacy/inventory" },
            { rel: "orders", href: "/api/pharmacy/orders" },
            { rel: "customers", href: "/api/pharmacy/customers" },
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
      const response = await axios.get(process.env.L_PHARMACY_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching pharmacy data:', error);
      res.status(500).json({ error: 'Failed to fetch pharmacy data' });
    }
  });
};

const StartPharmacyServer = async () => {
  try {
    DefinePharmacyRoutes();

    const PORT = process.env.PHARMACY_PORT || 5007;

    server.listen(PORT, () => {
      appLogger.info(`Pharmacy server running on port ${PORT} on ${moment().format('llll')}.`);
      console.log(`Pharmacy server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    errorLogger.info(`Pharmacy server startup error:`, error.message);
    console.error(`Pharmacy server startup error:`, error);
  }
};

module.exports = { StartPharmacyServer };
