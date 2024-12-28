const Joi = require('joi');

const roleCreateSchema = Joi.array()
  .items(
    Joi.object({
      name: Joi.string().max(100).required().messages({
        'string.base': 'Role name must be a string',
        'string.empty': 'Role name is required',
        'string.max': 'Role name must be at most 100 characters long',
      }),
      description: Joi.string().max(500).optional().messages({
        'string.base': 'Description must be a string',
        'string.max': 'Description must be at most 500 characters long',
      }),
      created_by: Joi.string().required().messages({
        'string.base': 'Created By must be a string',
        'string.empty': 'Created By is required',
      }),
      updated_by: Joi.string().required().messages({
        'string.base': 'Updated By must be a string',
        'string.empty': 'Updated By is required',
      }),
    })
  )
  .min(1)
  .messages({
    'array.base': 'Request body must be an array of roles',
    'array.min': 'At least one role is required',
  });

const roleUpdateSchema = Joi.object({
  name: Joi.string().max(100).optional().messages({
    'string.base': 'Role name must be a string',
    'string.max': 'Role name must be at most 100 characters long',
  }),
  description: Joi.string().max(500).optional().messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description must be at most 500 characters long',
  }),
  updated_by: Joi.string().required().messages({
    'string.base': 'Updated By must be a string',
    'string.empty': 'Updated By is required',
  }),
});

const roleQuerySchema = Joi.object({
  id: Joi.number().integer().positive().optional().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive integer',
  }),
  name: Joi.string().max(100).optional().messages({
    'string.base': 'Role name must be a string',
    'string.max': 'Role name must be at most 100 characters long',
  }),
});

const permissionCreateSchema = Joi.array()
  .items(
    Joi.object({
      name: Joi.string().max(100).required().messages({
        'string.base': 'Permission name must be a string',
        'string.empty': 'Permission name is required',
        'string.max': 'Permission name must be at most 100 characters long',
      }),
    })
  )
  .min(1)
  .messages({
    'array.base': 'Request body must be an array of permissions',
    'array.min': 'At least one permission is required',
  });

const permissionUpdateSchema = Joi.object({
  name: Joi.string().max(100).optional().messages({
    'string.base': 'Permission name must be a string',
    'string.max': 'Permission name must be at most 100 characters long',
  }),
});

const rolePermissionsAssignSchema = Joi.object({
  permissionIds: Joi.array()
    .items(
      Joi.number().integer().positive().messages({
        'number.base': 'Each Permission ID must be a number',
        'number.integer': 'Each Permission ID must be an integer',
        'number.positive': 'Each Permission ID must be a positive integer',
      })
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Permission IDs must be an array',
      'array.min': 'Permission IDs array must contain at least one item',
      'any.required': 'Permission IDs are required',
    }),
});

module.exports = {
  roleCreateSchema,
  roleUpdateSchema,
  roleQuerySchema,
  permissionCreateSchema,
  permissionUpdateSchema,
  rolePermissionsAssignSchema,
};
