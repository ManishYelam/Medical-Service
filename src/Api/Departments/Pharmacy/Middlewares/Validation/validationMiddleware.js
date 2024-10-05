const Joi = require('joi');

const regulationSchema = Joi.object({
  project_name: Joi.string().required(),
  description: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().optional(),
  project_status: Joi.string().valid('active', 'inactive').required(),
});

const roleSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateRegulation = (req, res, next) => {
  const { error } = regulationSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const validateRole = (req, res, next) => {
  const { error } = roleSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = {
  validateRegulation,
  validateRole,
  validateUser,
};
