require('dotenv').config();
const http = require('http');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const pharmaRoutes = require('../Pharmacy/Routes/index.pharma');
const { InitializeDatabase } = require('./Models/InitializeDatabase');
const app = express();

const server = http.createServer(app);

const DefinePharmacyRoutes = () => {

  app.get('/', async (req, res) => {
    try {
      const response = {
        message: "Welcome to the Pharmacy Department",
        status: "success",
        timestamp: new Date().toISOString(),
        data: {
          description: "This is the gateway to manage pharmacy operations, including inventory management, order processing, and customer interactions.",
          api_version: "1.0",
          contact_info: {
            email: "manish@pharmacy.com",
            phone: "+9373200525",
          },
          links: [
            { rel: "self", href: req.originalUrl },
            { rel: "inventory", href: "/api/pharmacy/inventory" },
            { rel: "orders", href: "/api/pharmacy/orders" },
            { rel: "customers", href: "/api/pharmacy/customers" },
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
      const response = await axios.get(process.env.L_PHARMACY_URL);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching pharmacy data:', error);
      res.status(500).json({ error: 'Failed to fetch pharmacy data' });
    }
  });

  app.use('/Api/pharma', pharmaRoutes);
};

const StartPharmacyServer = async () => {
  try {

    InitializeDatabase();

    DefinePharmacyRoutes();

    const PORT = process.env.PHARMACY_PORT || 5001;

    server.listen(PORT, () => {
      console.log(`Pharmacy server running on port ${PORT} on ${moment().format('llll')}.`);
    });
  } catch (error) {
    console.error(`Pharmacy server startup error:`, error);
  }
};

module.exports = { StartPharmacyServer };
