const express = require('express');
const departmentController = require('../Controllers/DepartmentController');
const validate = require('../Middlewares/validateMiddleware');
const { departmentCreateSchema, departmentUpdateSchema } = require('../Middlewares/Joi_Validations/deptSchema');
const departmentRouter = express.Router();

departmentRouter
    .post('/', validate(departmentCreateSchema), departmentController.createDepartment)
    .get('/', departmentController.getAllDepartments)
    .get('/:id', departmentController.getDepartmentById)
    .put('/:id', validate(departmentUpdateSchema), departmentController.updateDepartment)
    .delete('/:id', departmentController.deleteDepartment)

module.exports = departmentRouter;
