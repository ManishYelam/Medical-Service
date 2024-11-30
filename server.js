require('dotenv').config();
const http = require('http');
const moment = require('moment');
const path = require('path');
const sendMail = require('./src/Config/Setting/nodemailer.config.js');
const routes = require('./src/Api/Routes/index.js');
const { TestSequelizeConnection, TestMySQLConnection, } = require('./src/Config/Database/db.config.js');
const Middleware = require('./src/Api/Middlewares/index.middleware.js');
const { InitializeDatabase } = require('./src/Api/Models/InitializeDatabase');
const axios = require('axios');
const { StartDeptServer } = require('./src/DeptServer.js');
const baseUrls = require('./src/Config/Setting/baseurls.config.js');
const cors = require('cors');
require('./src/Api/sockets/index.socket.js');

const app = Middleware();
app.use(cors());
const server = http.createServer(app);

const services = {
  pharmacy: `${process.env.L_PHARMACY_URL}/data`,
  logistics: `${process.env.L_LOGISTICS_URL}/data`,
  customerSupport: `${process.env.L_CUSTOMER_SUPPORT_URL}/data`,
  salesMarketing: `${process.env.L_SALES_MARKETING_URL}/data`,
  financeAccounting: `${process.env.L_FINANCE_ACCOUNTING_URL}/data`,
  complianceLegal: `${process.env.L_COMPLIANCE_LEGAL_URL}/data`,
  healthcare: `${process.env.L_HEALTHCARE_URL}/data`,
  itDevelopment: `${process.env.L_IT_DEVELOPMENT_URL}/data`,
  inventoryManagement: `${process.env.L_INVENTORY_MANAGEMENT_URL}/data`,
  dataAnalytics: `${process.env.L_DATA_ANALYTICS_URL}/data`,
  hr: `${process.env.L_HR_URL}/data`,
  partnerships: `${process.env.L_PARTNERSHIPS_URL}/data`,
};

const DefineRoutes = () => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.get('/aggregate-data', async (req, res) => {
    try {
      const promises = Object.keys(services).map(async (service) => {
        const response = await axios.get(services[service]);
        return { [service]: response.data };
      });

      const results = await Promise.all(promises);
      res.json(results);
    } catch (error) {
      throw new Error('Error fetching data from services');
    }
  });

  app.post('/send-email', async (req, res) => {
    try {
      const { to, subject, text } = req.body;
      await sendMail(to, subject, text);
      res.status(200).send('Email sent successfully.');
    } catch (error) {
      throw new Error('Failed to send email.');
    }
  });

  app.use('/Api', routes);
};

const StartServer = async () => {
  try {
    await Promise.all([
      TestMySQLConnection(),
      TestSequelizeConnection(),
      StartDeptServer(),
    ]);
    InitializeDatabase();
    DefineRoutes();

    const PORT = process.env.MAIN_SERVER_PORT || 5000;
    server.listen(PORT, () => {
      console.log(`All department servers are running successfully at ${new Date().toLocaleString()}.`);
      console.log(`Main server running on port ${PORT} at ${new Date().toLocaleString()}.`);
    });
  } catch (error) {
    throw new Error(`Error during server startup: ${error.message}`);
  }
};

StartServer();
