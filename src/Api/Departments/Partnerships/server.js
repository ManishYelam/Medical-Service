require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const { appLogger, errorLogger } = require('../../../Config/Setting/logger.config');
const app = express();

const server = http.createServer(app);

const DefinePartnershipsRoutes = () => {
  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the Partnerships Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "Manage partnerships and collaborations.",
          api_version: "1.0",
          contact_info: {
            email: "support@partnerships.com",
            phone: "+1234567801",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "partners", href: "/api/partnerships/partners" },
            { rel: "agreements", href: "/api/partnerships/agreements" },
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
      const response = await axios.get(process.env.L_PARTNERSHIPS_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching partnerships data:', error);
      res.status(500).json({ error: 'Failed to fetch partnerships data' });
    }
  });
};

const StartPartnershipsServer = async () => {
  try {
    DefinePartnershipsRoutes();

    const PORT = process.env.PARTNERSHIPS_PORT || 5012;

    server.listen(PORT, () => {
      appLogger.info(`Partnerships server running on port ${PORT} on ${moment().format('llll')}.`);
      console.log(`Partnerships server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    errorLogger.info(`Partnerships server startup error:`, error.message);
    console.error(`Partnerships server startup error:`, error);
  }
};

module.exports = { StartPartnershipsServer };
