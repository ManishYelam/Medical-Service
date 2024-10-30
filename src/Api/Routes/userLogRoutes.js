const express = require('express');
const userLogController = require('../Controllers/UserLogController');
const validate = require('../Middlewares/validateMiddleware');
const { userLogCreateSchema, userLogUpdateSchema } = require('../Middlewares/Joi_Validations/userLogSchema');
const userLogRouter = express.Router();

userLogRouter
    .post('/', validate(userLogCreateSchema), userLogController.createUserLog)
    .get('/', userLogController.getAllUserLogs)
    .get('/:id', userLogController.getUserLogById)
    .put('/:id', validate(userLogUpdateSchema), userLogController.updateUserLog)
    .delete('/:id', userLogController.deleteUserLog)
    .delete('/logs_range/:start_date/to/:end_date', userLogController.deleteLogsInRange)

module.exports = userLogRouter;
