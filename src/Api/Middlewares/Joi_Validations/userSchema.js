const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().max(50).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(8).max(255).required(),
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).required(),
    date_of_birth: Joi.date().iso().optional(),
    phone_number: Joi.string().max(15).optional(),
    address: Joi.string().max(500).optional(),
    status: Joi.string().valid('active', 'inactive', 'banned').default('active'),
    role_id: Joi.number().integer().optional().default(2),
    Role: Joi.string().valid('Admin', 'Guest', 'User').optional().default('Guest'),
});

const userUpdateSchema = userSchema.fork(['password'], (schema) => schema.optional());

const roleSchema = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(500).optional(),
    created_by: Joi.string().required(),
    updated_by: Joi.string().required(),
});

const permissionSchema = Joi.object({
    name: Joi.string().max(100).required(),
});

const userLogSchema = Joi.object({
    userId: Joi.number().integer().positive().optional(), 
    sourceIp: Joi.string().ip().required(),
    relatedInfo: Joi.string().max(500).optional(),
    logoffBy: Joi.string().valid('SYSTEM', 'USER').optional(),
    logoffAt: Joi.date().iso().optional(),
    loginAt: Joi.date().iso().optional().default(new Date()), 
    jwtToken: Joi.string().required(),
});

module.exports = {
    userSchema,
    userUpdateSchema,
    roleSchema,
    permissionSchema,
    userLogSchema,
};
