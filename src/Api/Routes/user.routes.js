const express = require('express');
const userController = require('../controllers/Role/Guest copy/user.controller');
const userRouter = express.Router();

userRouter
  .post('/', userController.createUser)

  .post('/login', userController.loginUser)

  .put('/:user_id', userController.updateUser)

  .get('/:user_id', userController.getUserById)

  .delete('/:user_id', userController.deleteUser)

  .post('/logout', userController.logoutUser);

module.exports = userRouter;
