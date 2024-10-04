require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const { appLogger, errorLogger } = require('../../../config/Setting/logger.config');
const app = express();

const server = http.createServer(app);

const DefineFinanceAccountingRoutes = () => {
  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the Finance and Accounting Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "Manage financial records and transactions.",
          api_version: "1.0",
          contact_info: {
            email: "support@finance.com",
            phone: "+1234567894",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "reports", href: "/api/finance/reports" },
            { rel: "budgets", href: "/api/finance/budgets" },
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
      const response = await axios.get(process.env.L_FINANCE_ACCOUNTING_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching finance and accounting data:', error);
      res.status(500).json({ error: 'Failed to fetch finance and accounting data' });
    }
  });
};

const StartFinanceAccountingServer = async () => {
  try {
    DefineFinanceAccountingRoutes();

    const PORT = process.env.FINANCE_ACCOUNTING_PORT || 5003;

    server.listen(PORT, () => {
      appLogger.info(`Finance and Accounting server running on port ${PORT} on ${moment().format('llll')}.`);
      console.log(`Finance and Accounting server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    errorLogger.info(`Finance and Accounting server startup error:`, error.message);
    console.error(`Finance and Accounting server startup error:`, error);
  }
};

module.exports = { StartFinanceAccountingServer };

