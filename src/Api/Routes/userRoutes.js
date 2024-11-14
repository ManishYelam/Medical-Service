const express = require('express');
const routeConfig = require('../Routes/Config/userRouteConfig'); 

const userRouter = express.Router();

routeConfig.forEach(route => {
    const { method, path, middlewares = [], controller } = route;
    if (!userRouter[method]) {
        throw new Error(`Invalid HTTP method: ${method} for path: ${path}`);
    }
    try {
        userRouter[method](path, ...middlewares, controller);
    } catch (error) {
        throw new Error(`Failed to register route for path: ${path} - ${error.message}`); 
    }
});

module.exports = userRouter;

// const express = require('express');
// const userController = require('../Controllers/UserController');
// const validate = require('../Middlewares/validateMiddleware');
// const { userSchema, userUpdateSchema } = require('../Middlewares/Joi_Validations/userSchema');
// const authMiddleware = require('../Middlewares/authorizationMiddleware');
// const validateAsync = require('../Middlewares/validateAsyncMiddleware');
// const userRouter = express.Router();

// userRouter
//     .post('/', validateAsync(userSchema), userController.createUser)
//     .get('/verify', userController.verifyCreateUser)
//     .get('/:userId/permissions/:permissionName', authMiddleware, userController.checkUserPermission)
//     .get('/', authMiddleware, userController.getAllUsers)
//     .get('/:id', authMiddleware, userController.getUserById)
//     .put('/:id', validateAsync(userUpdateSchema), userController.updateUser)
//     .delete('/:id', authMiddleware, userController.deleteUser)
//     .delete('/user_range/:start_id/to/:end_id', authMiddleware, userController.deleteUserRanges)

// module.exports = userRouter;
