const express = require('express');
const roleController = require('../Controllers/RoleController');
const validate = require('../Middlewares/validateMiddleware');
const { roleCreateSchema, rolePermissionsAssignSchema, roleUpdateSchema } = require('../Middlewares/Joi_Validations/roleSchema');
const roleRouter = express.Router();

roleRouter
    .post('/', validate(roleCreateSchema), roleController.createRole)
    .post('/:roleId/permissions', validate(rolePermissionsAssignSchema), roleController.assignPermissionsToRole)
    .get('/', roleController.getAllRoles)
    .get('/:id', roleController.getRoleById)
    .put('/:id', validate(roleUpdateSchema), roleController.updateRole)
    .delete('/:id', roleController.deleteRole)

module.exports = roleRouter;

