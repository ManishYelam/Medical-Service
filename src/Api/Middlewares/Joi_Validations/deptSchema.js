const Joi = require('joi');

// Base schema for Department (shared between create, update, and query operations)
const baseDepartmentSchema = Joi.object({
  id: Joi.number().integer().positive().optional().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive integer',
  }),
  name: Joi.string().max(100).optional().messages({
    'string.base': 'Name must be a string',
    'string.max': 'Name must be at most 100 characters long',
  }),
  head_of_department: Joi.string().optional().messages({
    'string.base': 'Head of Department must be a string',
  }),
  contact_number: Joi.string().max(15).optional().messages({
    'string.base': 'Contact Number must be a string',
    'string.max': 'Contact Number must be at most 15 characters long',
  }),
  email: Joi.string().email().max(100).optional().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'string.max': 'Email must be at most 100 characters long',
  }),
  created_by: Joi.string().optional().messages({
    'string.base': 'Created By must be a string',
  }),
  updated_by: Joi.string().optional().messages({
    'string.base': 'Updated By must be a string',
  }),
  createdAt: Joi.date().optional().messages({
    'date.base': 'Created At must be a valid date',
  }),
  updatedAt: Joi.date().optional().messages({
    'date.base': 'Updated At must be a valid date',
  }),
});

// Schema for "create" operation
const departmentCreateSchema = baseDepartmentSchema.keys({
  name: Joi.string().required(),
  head_of_department: Joi.string().required(),
  branch: Joi.string().required(),
  branch_of_department: Joi.string().required(),
  contact_number: Joi.string().optional(),
  address: Joi.string().required(),
  email: Joi.string().email().required(),
  department_code: Joi.string().required(),
  status: Joi.string().valid('Active', 'Inactive').default('Active'),
  date_founded: Joi.date().optional(),
  num_employees: Joi.number().integer().default(0),
  description: Joi.string().optional(),
  created_by: Joi.string().required(),
  updated_by: Joi.string().required(),
});

// Schema for "update" operation (allows partial updates)
const departmentUpdateSchema = baseDepartmentSchema.keys({
  id: Joi.number().integer().positive().required().messages({
    'any.required': 'ID is required for updating',
  }),
});

// Schema for "query" operation (all fields optional, can include `id`)
const departmentQuerySchema = baseDepartmentSchema.keys({
  id: Joi.number().integer().positive().optional().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive integer',
  }),
});

module.exports = {
  departmentCreateSchema,
  departmentUpdateSchema,
  departmentQuerySchema,
};
