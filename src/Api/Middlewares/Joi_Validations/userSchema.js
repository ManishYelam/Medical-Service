const Joi = require('joi');
const { checkExistsEmail, checkExistsUsername, } = require('../../Services/UserService');
const { prefixes } = require('../../../Config/Database/Data');

const checkEmailDuplicate = async (value, helpers) => {
  const user = await checkExistsEmail(value);
  if (user) {
    return helpers.message(
      `Duplicate email found. Please provide a unique email address. Email - ${value}`
    );
  }
  return value;
};

const checkUsernameDuplicate = async (value, helpers) => {
  const user = await checkExistsUsername(value);
  if (user) {
    return helpers.message(
      `Duplicate username found. Please provide a unique username. Username - ${value}`
    );
  }
  return value;
};

const userSchema = Joi.object({
  department: Joi.string().max(50).forbidden().optional(),
  health_id: Joi.string().max(50).optional().forbidden().optional(),
  username: Joi.string().max(50).required().external(checkUsernameDuplicate),
  email: Joi.string().email().max(100).required().external(checkEmailDuplicate),
  password: Joi.string().min(8).max(255).required(),
  first_name: Joi.string().max(50).required(),
  last_name: Joi.string().max(50).required(),
  date_of_birth: Joi.date().iso().optional(),
  phone_number: Joi.string().max(15).optional(),
  address: Joi.string().max(500).optional(),
  status: Joi.string().valid('active', 'inactive', 'banned').default('active'),
  role_id: Joi.number().integer().optional().default(2),
  dept_id: Joi.number().integer().optional(),
});

const userUpdateSchema = Joi.object({
  department: Joi.string()
    .valid(...Object.keys(prefixes))
    .max(50)
    .optional(),
  health_id: Joi.string().max(50).optional().default(null),
  username: Joi.string().max(50).optional(),
  email: Joi.string().email().max(100).optional(),
  password: Joi.string().min(8).max(255).forbidden(),
  first_name: Joi.string().max(50).optional(),
  last_name: Joi.string().max(50).optional(),
  date_of_birth: Joi.date().iso().optional(),
  phone_number: Joi.string().max(15).optional(),
  address: Joi.string().max(500).optional(),
  status: Joi.string().valid('active', 'inactive', 'banned').optional(),
  role_id: Joi.number().integer().optional(),
  dept_id: Joi.number().integer().optional(),
});

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
