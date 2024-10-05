// prescriptionsRoutes.js
const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  checkPermission,
  checkDataScope,
} = require('../middleware');
const {
  getPrescriptions,
  createPrescription,
  updatePrescription,
  deletePrescription,
} = require('../controllers/prescriptionController');

// Apply authentication to all routes in this file
router.use(authenticateUser);

// View prescriptions, restricted by department or region
router.get(
  '/prescriptions',
  checkPermission('can_view_prescriptions'),
  checkDataScope('department', ['Pharmacy', 'Cardiology']),
  getPrescriptions
);

// Create a prescription (requires 'can_create_prescriptions' permission)
router.post(
  '/prescriptions',
  checkPermission('can_create_prescriptions'),
  createPrescription
);

// Update a prescription by ID (requires 'can_edit_prescriptions' permission)
router.put(
  '/prescriptions/:id',
  checkPermission('can_edit_prescriptions'),
  updatePrescription
);

// Delete a prescription by ID (requires 'can_delete_prescriptions' permission)
router.delete(
  '/prescriptions/:id',
  checkPermission('can_delete_prescriptions'),
  deletePrescription
);

module.exports = router;
