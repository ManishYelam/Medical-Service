// routes/roleRoutes.js
const express = require('express');
const roleController = require('../controllers/roleController');
const authMiddleware = require('../middlewares/authMiddleware');

const roleRouter = express.Router();

roleRouter
  .post('/', authMiddleware, roleController.createRole)
  .get('/', authMiddleware, roleController.getRoles)
  .get('/:id', authMiddleware, roleController.getRoleById)
  .put('/:id', authMiddleware, roleController.updateRole)
  .delete('/:id', authMiddleware, roleController.deleteRole);

module.exports = roleRouter;
