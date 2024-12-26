// const express = require('express');
// const routeConfig = require('../Routes/Config/departmentRouteConfig');

// const departmentRouter = express.Router();

// routeConfig.forEach(route => {
//     const { method, path, middlewares = [], controller } = route;
//     if (!departmentRouter[method]) {
//         throw new Error(`Invalid HTTP method: ${method} for path: ${path}`);
//     }
//     try {
//         departmentRouter[method](path, ...middlewares, controller);
//     } catch (error) {
//         throw new Error(`Failed to register route for path: ${path} - ${error.message}`); 
//     }
// });

// module.exports = departmentRouter;

const express = require('express');
const departmentController = require('../Controllers/DepartmentController');
const validate = require('../Middlewares/validateMiddleware');
const { departmentCreateSchema, departmentUpdateSchema } = require('../Middlewares/Joi_Validations/deptSchema');
const uploadMiddleware = require('../Middlewares/uploadMiddleware');
const departmentRouter = express.Router();

departmentRouter
    .post('/', validate(departmentCreateSchema), departmentController.createDepartment)
    .post('/bulk', uploadMiddleware, departmentController.bulkCreateDepartments)
    .get('/', departmentController.getAllDepartments)
    .get('/:id', departmentController.getDepartmentById)
    .put('/:id', validate(departmentUpdateSchema), departmentController.updateDepartment)
    .delete('/:id', departmentController.deleteDepartment)

module.exports = departmentRouter;


