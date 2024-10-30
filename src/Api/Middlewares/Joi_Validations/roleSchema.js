const Joi = require('joi');

const roleCreateSchema = Joi.object({
    name: Joi.string().max(100).required()
        .messages({
            'string.base': 'Role name must be a string',
            'string.empty': 'Role name is required',
            'string.max': 'Role name must be at most 100 characters long',
        }),
    description: Joi.string().max(500).optional()
        .messages({
            'string.base': 'Description must be a string',
            'string.max': 'Description must be at most 500 characters long',
        }),
    created_by: Joi.string().required()
        .messages({
            'string.base': 'Created By must be a string',
            'string.empty': 'Created By is required',
        }),
    updated_by: Joi.string().required()
        .messages({
            'string.base': 'Updated By must be a string',
            'string.empty': 'Updated By is required',
        }),
});

const roleUpdateSchema = Joi.object({
    name: Joi.string().max(100).optional()
        .messages({
            'string.base': 'Role name must be a string',
            'string.max': 'Role name must be at most 100 characters long',
        }),
    description: Joi.string().max(500).optional()
        .messages({
            'string.base': 'Description must be a string',
            'string.max': 'Description must be at most 500 characters long',
        }),
    updated_by: Joi.string().required()
        .messages({
            'string.base': 'Updated By must be a string',
            'string.empty': 'Updated By is required',
        }),
});

const roleQuerySchema = Joi.object({
    id: Joi.number().integer().positive().optional()
        .messages({
            'number.base': 'ID must be a number',
            'number.integer': 'ID must be an integer',
            'number.positive': 'ID must be a positive integer',
        }),
    name: Joi.string().max(100).optional()
        .messages({
            'string.base': 'Role name must be a string',
            'string.max': 'Role name must be at most 100 characters long',
        }),
});

const permissionCreateSchema = Joi.object({
    name: Joi.string().max(100).required()
        .messages({
            'string.base': 'Permission name must be a string',
            'string.empty': 'Permission name is required',
            'string.max': 'Permission name must be at most 100 characters long',
        }),
});

const permissionUpdateSchema = Joi.object({
    name: Joi.string().max(100).optional()
        .messages({
            'string.base': 'Permission name must be a string',
            'string.max': 'Permission name must be at most 100 characters long',
        }),
});

const rolePermissionsAssignSchema = Joi.object({
    role_id: Joi.number().integer().positive().required()
        .messages({
            'number.base': 'Role ID must be a number',
            'number.integer': 'Role ID must be an integer',
            'number.positive': 'Role ID must be a positive integer',
            'any.required': 'Role ID is required',
        }),
    permission_ids: Joi.array().items(Joi.number().integer().positive()).min(1).required()
        .messages({
            'array.base': 'Permission IDs must be an array',
            'array.min': 'At least one Permission ID is required',
            'number.base': 'Each Permission ID must be a number',
            'number.integer': 'Each Permission ID must be an integer',
            'number.positive': 'Each Permission ID must be a positive integer',
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
