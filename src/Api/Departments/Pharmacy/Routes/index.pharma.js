const express = require('express');
const medicineRouter = require('./medicineRoutes');

const router = express.Router();

router
  .use('/', medicineRouter)
  

module.exports = router;
