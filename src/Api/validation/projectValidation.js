const Joi = require('joi');

const projectSchema = Joi.object({
  project_name: Joi.string().required(),
  description: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().optional().allow(null),
  project_status: Joi.string()
    .valid('Not Started', 'In Progress', 'Completed')
    .required(),
});

module.exports = {
  projectSchema,
};
