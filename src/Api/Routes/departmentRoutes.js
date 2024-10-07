const express = require('express');
const departmentController = require('../Controllers/DepartmentController');
const departmentRouter = express.Router();

departmentRouter
    .get('/', departmentController.getAllDepartments)
    .get('/:id', departmentController.getDepartmentById)
    .post('/', departmentController.createDepartment)
    .put('/:id', departmentController.updateDepartment)
    .delete('/:id', departmentController.deleteDepartment);

module.exports = departmentRouter;
