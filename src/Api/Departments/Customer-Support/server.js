require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const { appLogger, errorLogger } = require('../../../Config/Setting/logger.config');
const app = express();

const server = http.createServer(app);

const DefineCustomerSupportRoutes = () => {
  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the Customer Support Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "Assist customers with inquiries and support tickets.",
          api_version: "1.0",
          contact_info: {
            email: "support@customersupport.com",
            phone: "+1234567892",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "tickets", href: "/api/support/tickets" },
            { rel: "faq", href: "/api/support/faq" },
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
      const response = await axios.get(process.env.L_CUSTOMER_SUPPORT_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching customer support data:', error);
      res.status(500).json({ error: 'Failed to fetch customer support data' });
    }
  });
};

const StartCustomerSupportServer = async () => {
  try {
    DefineCustomerSupportRoutes();

    const PORT = process.env.CUSTOMER_SUPPORT_PORT || 5003;

    server.listen(PORT, () => {
      appLogger.info(`Customer Support server running on port ${PORT} on ${moment().format('llll')}.`);
      console.log(`Customer Support server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    errorLogger.info(`Customer Support server startup error:`, error.message);
    console.error(`Customer Support server startup error:`, error);
  }
};

module.exports = { StartCustomerSupportServer };
