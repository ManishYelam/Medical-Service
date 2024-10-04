require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const { appLogger, errorLogger } = require('../../../config/Setting/logger.config');
const app = express();

const server = http.createServer(app);

const DefineItDevelopmentRoutes = () => {
  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the IT Development Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "Manage IT projects and development tasks.",
          api_version: "1.0",
          contact_info: {
            email: "support@itdevelopment.com",
            phone: "+1234567897",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "projects", href: "/api/it/projects" },
            { rel: "teams", href: "/api/it/teams" },
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
      const response = await axios.get(process.env.L_IT_DEVELOPMENT_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching IT development data:', error);
      res.status(500).json({ error: 'Failed to fetch IT development data' });
    }
  });
};

const StartItDevelopmentServer = async () => {
  try {
    DefineItDevelopmentRoutes();

    const PORT = process.env.IT_DEVELOPMENT_PORT || 5008;

    server.listen(PORT, () => {
      appLogger.info(`IT Development server running on port ${PORT} on ${moment().format('llll')}.`);
      console.log(`IT Development server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    errorLogger.info(`IT Development server startup error:`, error.message);
    console.error(`IT Development server startup error:`, error);
  }
};

module.exports = { StartItDevelopmentServer };

