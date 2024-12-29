const Joi = require('joi');

const createMedicineValidation = Joi.object({
  pharmacy_id: Joi.number().integer().required(),
  medicine_name: Joi.string().required(),
  generic_name: Joi.string().required(),
  description: Joi.string().required(),
  manufacturer: Joi.string().required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().min(0).required(),
  expiry_date: Joi.date().iso().required(),
  side_effects: Joi.string().required(),
  contraindications: Joi.string().required(),
  dosage: Joi.string().required(),
  instructions: Joi.string().required(),
  health_issues: Joi.array().items(Joi.string()).required(),
  diseases_treated: Joi.array().items(Joi.string()).required(),
  barcode: Joi.string().required(),
  import_source: Joi.string().valid('Local', 'Imported').required(),
  regulatory_approvals: Joi.string().required(),
  storage_conditions: Joi.string().required(),
  available_in_stock: Joi.boolean().optional(),
});

const updateMedicineValidation = Joi.object({
  pharmacy_id: Joi.number().integer().optional(),
  medicine_name: Joi.string().optional(),
  generic_name: Joi.string().optional(),
  description: Joi.string().optional(),
  manufacturer: Joi.string().optional(),
  price: Joi.number().positive().optional(),
  quantity: Joi.number().integer().min(0).optional(),
  expiry_date: Joi.date().iso().optional(),
  side_effects: Joi.string().optional(),
  contraindications: Joi.string().optional(),
  dosage: Joi.string().optional(),
  instructions: Joi.string().optional(),
  health_issues: Joi.array().items(Joi.string()).optional(),
  diseases_treated: Joi.array().items(Joi.string()).optional(),
  barcode: Joi.string().optional(),
  import_source: Joi.string().valid('Local', 'Imported').optional(),
  regulatory_approvals: Joi.string().optional(),
  storage_conditions: Joi.string().optional(),
  available_in_stock: Joi.boolean().optional(),
});

const queryMedicineValidation = Joi.object({
  pharmacy_id: Joi.number().integer().optional(),
  medicine_name: Joi.string().optional(),
  generic_name: Joi.string().optional(),
  manufacturer: Joi.string().optional(),
  price_min: Joi.number().positive().optional(),
  price_max: Joi.number().positive().optional(),
  available_in_stock: Joi.boolean().optional(),
  expiry_date_before: Joi.date().iso().optional(),
  expiry_date_after: Joi.date().iso().optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
});

module.exports = {
  createMedicineValidation,
  updateMedicineValidation,
  queryMedicineValidation,
};
