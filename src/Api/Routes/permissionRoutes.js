const express = require('express');
const permissionController = require('../Controllers/PermissionController');
const permissionRouter = express.Router();

permissionRouter.get('/', permissionController.getAllPermissions)
    .get('/:id', permissionController.getPermissionById)
    .post('/', permissionController.createPermission)
    .put('/:id', permissionController.updatePermission)
    .delete('/:id', permissionController.deletePermission)

module.exports = permissionRouter;
