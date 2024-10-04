require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const { appLogger, errorLogger } = require('../../../config/Setting/logger.config');
const app = express();

const server = http.createServer(app);

const DefineSalesMarketingRoutes = () => {
  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the Sales and Marketing Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "Manage sales processes and marketing campaigns.",
          api_version: "1.0",
          contact_info: {
            email: "support@salesmarketing.com",
            phone: "+1234567893",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "leads", href: "/api/sales/leads" },
            { rel: "campaigns", href: "/api/sales/campaigns" },
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
      const response = await axios.get(process.env.L_SALES_MARKETING_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching sales and marketing data:', error);
      res.status(500).json({ error: 'Failed to fetch sales and marketing data' });
    }
  });
};

const StartSalesMarketingServer = async () => {
  try {
    DefineSalesMarketingRoutes();

    const PORT = process.env.SALES_MARKETING_PORT || 5004;

    server.listen(PORT, () => {
      appLogger.info(`Sales and Marketing server running on port ${PORT} on ${moment().format('llll')}.`);
      console.log(`Sales and Marketing server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    errorLogger.info(`Sales and Marketing server startup error:`, error.message);
    console.error(`Sales and Marketing server startup error:`, error);
  }
};

module.exports = { StartSalesMarketingServer, };
