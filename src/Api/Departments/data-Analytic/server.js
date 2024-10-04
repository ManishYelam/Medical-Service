require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const { appLogger, errorLogger } = require('../../../config/Setting/logger.config');
const app = express();

const server = http.createServer(app);

const DefineDataAnalyticRoutes = () => {
  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the Data Analytics Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "Analyze data and generate insights.",
          api_version: "1.0",
          contact_info: {
            email: "support@dataanalytics.com",
            phone: "+1234567899",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "reports", href: "/api/data/reports" },
            { rel: "dashboards", href: "/api/data/dashboards" },
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
      const response = await axios.get(process.env.L_DATA_ANALYTICS_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching data analytics data:', error);
      res.status(500).json({ error: 'Failed to fetch data analytics data' });
    }
  });
};

const StartDataAnalyticServer = async () => {
  try {
    DefineDataAnalyticRoutes();

    const PORT = process.env.DATA_ANALYTICS_PORT || 5010;

    server.listen(PORT, () => {
      appLogger.info(`Data Analytics server running on port ${PORT} on ${moment().format('llll')}.`);
      console.log(`Data Analytics server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    errorLogger.info(`Data Analytics server startup error:`, error.message);
    console.error(`Data Analytics server startup error:`, error);
  }
};

module.exports = { StartDataAnalyticServer };

