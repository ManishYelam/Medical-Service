const express = require('express');
const userController = require('../Controllers/UserController');
const userRouter = express.Router();

userRouter
.get('/', userController.getAllUsers)
.get('/:id', userController.getUserById)
.post('/', userController.createUser)
.put('/:id', userController.updateUser)
.delete('/:id', userController.deleteUser)

module.exports = userRouter;
