require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const { appLogger, errorLogger } = require('../../../config/Setting/logger.config');
const app = express();

const server = http.createServer(app);

const DefineHrRoutes = () => {
  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the HR Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "Manage employee records and HR processes.",
          api_version: "1.0",
          contact_info: {
            email: "support@hr.com",
            phone: "+1234567800",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "employees", href: "/api/hr/employees" },
            { rel: "policies", href: "/api/hr/policies" },
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
      const response = await axios.get(process.env.L_HR_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching HR data:', error);
      res.status(500).json({ error: 'Failed to fetch HR data' });
    }
  });
};

const StartHrServer = async () => {
  try {
    DefineHrRoutes();

    const PORT = process.env.HR_PORT || 5011;

    server.listen(PORT, () => {
      appLogger.info(`HR server running on port ${PORT} on ${moment().format('llll')}.`);
      console.log(`HR server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    errorLogger.info(`HR server startup error:`, error.message);
    console.error(`HR server startup error:`, error);
  }
};

module.exports = { StartHrServer };



