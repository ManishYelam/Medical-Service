const express = require('express');
const medicineController = require('../Controllers/MedicineController');

const medicineRouter = express.Router();

medicineRouter
    .post('/medicines', medicineController.createMedicine)
    .put('/medicines/:id', medicineController.updateMedicine)
    .get('/medicines', medicineController.queryMedicines)
    .get('/medicines/:id', medicineController.getMedicineById)
    .delete('/medicines/:id', medicineController.deleteMedicine)

module.exports = medicineRouter;
