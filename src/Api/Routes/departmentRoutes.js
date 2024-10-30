const express = require('express');
const departmentController = require('../Controllers/DepartmentController');
const departmentRouter = express.Router();

departmentRouter
    .post('/', departmentController.createDepartment)
    .get('/', departmentController.getAllDepartments)
    .get('/:id', departmentController.getDepartmentById)
    .put('/:id', departmentController.updateDepartment)
    .delete('/:id', departmentController.deleteDepartment)

module.exports = departmentRouter;
