const Joi = require('joi');
const { SUPPORTED_LANGUAGES } = require('./constants');
const { sendValidationErrorResponse } = require('./responseHelper');

/**
 * Joi schema for user registration validation.
 */
const userRegistrationSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),

  password: Joi.string()
    .min(8)
    .pattern(/\d/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one numeric character',
      'any.required': 'Password is required',
    }),

  name: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.min': 'Name must be at least 3 characters long',
      'any.required': 'Name is required',
    }),

  language: Joi.string()
    .valid(...SUPPORTED_LANGUAGES)
    .optional()
    .messages({
      'any.only': `Language must be one of the following: ${SUPPORTED_LANGUAGES.join(', ')}`,
    }),
});

/**
 * Joi schema for user login validation.
 */
const userLoginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required',
    }),
});

/**
 * Joi schema for password reset validation.
 */
const passwordResetSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),

  newPassword: Joi.string()
    .min(8)
    .pattern(/\d/)
    .required()
    .messages({
      'string.min': 'New password must be at least 8 characters long',
      'string.pattern.base': 'New password must contain at least one numeric character',
      'any.required': 'New password is required',
    }),
});

/**
 * Joi schema for validating custom fields.
 */
const customFieldSchema = Joi.object({
  customField: Joi.string()
    .required()
    .messages({
      'any.required': 'Custom field cannot be empty',
    }),
});

/**
 * Validate data against a Joi schema.
 * @param {Object} schema - Joi schema object.
 * @returns {Function} Express middleware to handle validation.
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const validationErrors = error.details.map(err => ({
        field: err.context.key,
        message: err.message,
      }));
      return sendValidationErrorResponse(res, validationErrors);
    }
    next();
  };
};

module.exports = {
  userRegistrationSchema,
  userLoginSchema,
  passwordResetSchema,
  customFieldSchema,
  validate,
};
