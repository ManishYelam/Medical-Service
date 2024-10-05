const express = require('express');
const AdminController = require('../../api/controllers/Role/Admin/admin.controller');
const AdminRouter = express.Router();

AdminRouter
  .post('/', AdminController.createAdmin)

  .post('/login', AdminController.loginAdmin)

  .put('/:admin_id', AdminController.updateAdmin)

  .get('/:input_admin_id', AdminController.getAdminById)

  .delete('/:input_admin_id', AdminController.deleteAdmin)

  .post('/logout', AdminController.deleteAdmin);

module.exports = AdminRouter;
