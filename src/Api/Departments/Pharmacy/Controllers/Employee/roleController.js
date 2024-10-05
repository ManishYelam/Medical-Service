// controllers/roleController.js
const roleService = require('../services/roleService');

const roleController = {
  createRole: async (req, res) => {
    try {
      const role = await roleService.createRole(req.body);
      res.status(201).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getRoles: async (req, res) => {
    try {
      const roles = await roleService.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getRoleById: async (req, res) => {
    try {
      const role = await roleService.getRoleById(req.params.id);
      res.status(200).json(role);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  updateRole: async (req, res) => {
    try {
      const role = await roleService.updateRole(req.params.id, req.body);
      res.status(200).json(role);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  deleteRole: async (req, res) => {
    try {
      const response = await roleService.deleteRole(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

module.exports = roleController;
