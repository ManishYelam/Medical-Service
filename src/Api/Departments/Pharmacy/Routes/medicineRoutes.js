const express = require('express');
const medicineController = require('../Controllers/MedicineController');
const uploadMiddleware = require('../../../Middlewares/uploadMiddleware');

const medicineRouter = express.Router();

medicineRouter
  .post('/medicines', medicineController.createMedicine)
  .put('/medicines/:id', medicineController.updateMedicine)
  .get('/medicines', medicineController.queryMedicines)
  .get('/medicines/:id', medicineController.getMedicineById)
  .delete('/medicines/:id', medicineController.deleteMedicine)
  .post('/medicines/bulk', uploadMiddleware, medicineController.bulkCreateMedicines);

module.exports = medicineRouter;
