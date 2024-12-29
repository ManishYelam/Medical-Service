const Joi = require('joi');

// Validation schema for creating a department
const createDepartmentValidation = Joi.object({
  name: Joi.string().max(100).required(),
  head_of_department: Joi.string().required(),
  branch: Joi.string().required(),
  branch_of_department: Joi.string().required(),
  contact_number: Joi.string().max(15).optional(),
  address: Joi.string().required(),
  email: Joi.string().email().max(100).required(),
  department_code: Joi.string().max(50).required(),
  status: Joi.string().valid('Active', 'Inactive').default('Active'),
  date_founded: Joi.date().optional(),
  num_employees: Joi.number().integer().min(0).default(0).optional(),
  description: Joi.string().optional(),
  created_by: Joi.string().required(),
  updated_by: Joi.string().required(),
});

// Validation schema for updating a department
const updateDepartmentValidation = Joi.object({
  name: Joi.string().max(100).optional(),
  head_of_department: Joi.string().optional(),
  branch: Joi.string().optional(),
  branch_of_department: Joi.string().optional(),
  contact_number: Joi.string().max(15).optional(),
  address: Joi.string().optional(),
  email: Joi.string().email().max(100).optional(),
  department_code: Joi.string().max(50).optional(),
  status: Joi.string().valid('Active', 'Inactive').optional(),
  date_founded: Joi.date().optional(),
  num_employees: Joi.number().integer().min(0).optional(),
  description: Joi.string().optional(),
  updated_by: Joi.string().optional(),
});

// Validation schema for querying departments
const queryDepartmentValidation = Joi.object({
  name: Joi.string().optional(),
  head_of_department: Joi.string().optional(),
  branch: Joi.string().optional(),
  branch_of_department: Joi.string().optional(),
  status: Joi.string().valid('Active', 'Inactive').optional(),
  date_founded_before: Joi.date().optional(),
  date_founded_after: Joi.date().optional(),
  num_employees_min: Joi.number().integer().min(0).optional(),
  num_employees_max: Joi.number().integer().optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
});

module.exports = {
  createDepartmentValidation,
  updateDepartmentValidation,
  queryDepartmentValidation,
};
