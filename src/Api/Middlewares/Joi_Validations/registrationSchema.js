Joi = require('joi');

module.exports = {
  // User Schemas
  userRegistrationSchema: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).max(128).required(),  // Password should be strong
    email: Joi.string().email().required(),
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    role_id: Joi.number().integer().required(),  // Role ID must exist in the Roles table
    department_id: Joi.number().integer().required(),  // Department ID must exist in the Departments table
  }),

  userLoginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required()
  }),

  changePasswordSchema: Joi.object({
    currentPassword: Joi.string().min(8).max(128).required(),
    newPassword: Joi.string().min(8).max(128).required()
  }),

  forgotPasswordSchema: Joi.object({
    email: Joi.string().email().required()
  }),

  resetPasswordSchema: Joi.object({
    otp: Joi.string().length(6).required(),
    newPassword: Joi.string().min(8).max(128).required()
  }),

  // Role Schema
  roleSchema: Joi.object({
    name: Joi.string().min(3).max(30).required(),  // Role name (e.g., Admin, User)
    description: Joi.string().max(255),  // Optional description for the role
    permissions: Joi.array().items(Joi.string()).required()  // List of permissions
  }),

  // Department Schema
  departmentSchema: Joi.object({
    name: Joi.string().min(3).max(30).required(),  // Department name (e.g., HR, IT)
    description: Joi.string().max(255)  // Optional description for the department
  }),

  // Permission Schema
  permissionSchema: Joi.object({
    name: Joi.string().min(3).max(30).required(),  // Permission name (e.g., READ, WRITE)
    description: Joi.string().max(255)  // Optional description for the permission
  }),

  // OTP Verification Schema
  otpVerificationSchema: Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required()  // 6-character OTP
  }),

  // Chat Message Schema
  messageSchema: Joi.object({
    senderId: Joi.number().integer().required(),  // ID of the sender
    receiverId: Joi.number().integer().required(),  // ID of the receiver
    message: Joi.string().min(1).max(1000).required()  // Message content
  }),

}
