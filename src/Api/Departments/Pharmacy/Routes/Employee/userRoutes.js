// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter
    .post('/', userController.createUser)
    .post('/login', userController.loginUser)
    .get('/', userController.getUsers)
    .get('/:id', userController.getUserById)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser);

module.exports = userRouter;
