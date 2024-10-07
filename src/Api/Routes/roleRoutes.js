const express = require('express');
const roleController = require('../Controllers/RoleController');
const roleRouter = express.Router();

roleRouter
    .get('/', roleController.getAllRoles)
    .get('/:id', roleController.getRoleById)
    .post('/', roleController.createRole)
    .put('/:id', roleController.updateRole)
    .delete('/:id', roleController.deleteRole)

module.exports = roleRouter;
