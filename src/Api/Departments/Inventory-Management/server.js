require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const { appLogger, errorLogger } = require('../../../Config/Setting/logger.config');
const app = express();

const server = http.createServer(app);

const DefineInventoryManagementRoutes = () => {
  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the Inventory Management Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "Manage inventory levels and stock management.",
          api_version: "1.0",
          contact_info: {
            email: "support@inventory.com",
            phone: "+1234567898",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "items", href: "/api/inventory/items" },
            { rel: "suppliers", href: "/api/inventory/suppliers" },
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
      const response = await axios.get(process.env.L_INVENTORY_MANAGEMENT_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching inventory management data:', error);
      res.status(500).json({ error: 'Failed to fetch inventory management data' });
    }
  });
};

const StartInventoryManagementServer = async () => {
  try {
    DefineInventoryManagementRoutes();

    const PORT = process.env.INVENTORY_MANAGEMENT_PORT || 5009;

    server.listen(PORT, () => {
      appLogger.info(`Inventory Management server running on port ${PORT} on ${moment().format('llll')}.`);
      console.log(`Inventory Management server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    errorLogger.info(`Inventory Management server startup error:`, error.message);
    console.error(`Inventory Management server startup error:`, error);
  }
};

module.exports = { StartInventoryManagementServer };

