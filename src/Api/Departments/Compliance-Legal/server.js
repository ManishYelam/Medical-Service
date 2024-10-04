require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const { appLogger, errorLogger } = require('../../../config/Setting/logger.config');
const app = express();

const server = http.createServer(app);

const DefineComplianceLegalRoutes = () => {
  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the Compliance and Legal Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "Manage compliance and legal matters.",
          api_version: "1.0",
          contact_info: {
            email: "support@compliance.com",
            phone: "+1234567895",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "regulations", href: "/api/legal/regulations" },
            { rel: "contracts", href: "/api/legal/contracts" },
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
      const response = await axios.get(process.env.L_COMPLIANCE_LEGAL_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching compliance and legal data:', error);
      res.status(500).json({ error: 'Failed to fetch compliance and legal data' });
    }
  });
};

const StartComplianceLegalServer = async () => {
  try {
    DefineComplianceLegalRoutes();

    const PORT = process.env.COMPLIANCE_LEGAL_PORT || 5002;

    server.listen(PORT, () => {
      appLogger.info(`Compliance and Legal server running on port ${PORT} on ${moment().format('llll')}.`);
      console.log(`Compliance and Legal server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    errorLogger.info(`Compliance and Legal server startup error:`, error.message);
    console.error(`Compliance and Legal server startup error:`, error);
  }
};

module.exports = { StartComplianceLegalServer };

