require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const { appLogger, errorLogger } = require('../../../config/Setting/logger.config');
const app = express();

const server = http.createServer(app);

const DefineHealthCareRoutes = () => {
  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the Healthcare Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "Manage healthcare services and patient information.",
          api_version: "1.0",
          contact_info: {
            email: "support@healthcare.com",
            phone: "+1234567896",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "patients", href: "/api/healthcare/patients" },
            { rel: "appointments", href: "/api/healthcare/appointments" },
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
      const response = await axios.get(process.env.L_HEALTHCARE_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching healthcare data:', error);
      res.status(500).json({ error: 'Failed to fetch healthcare data' });
    }
  });
};

const StartHealthCareServer = async () => {
  try {
    DefineHealthCareRoutes();

    const PORT = process.env.HEALTHCARE_PORT || 5001;

    server.listen(PORT, () => {
      appLogger.info(`Healthcare server running on port ${PORT} on ${moment().format('llll')}.`);
      console.log(`Healthcare server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    errorLogger.info(`Healthcare server startup error:`, error.message);
    console.error(`Healthcare server startup error:`, error);
  }
};

module.exports = { StartHealthCareServer };

