const permissionService = require('../Services/PermissionService');

class PermissionController {
    async createPermission(req, res) {
        try {
            const newPermission = await permissionService.createPermission(req.body);
            res.status(201).json(newPermission);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async getAllPermissions(req, res) {
        try {
            const permissions = await permissionService.getAllPermissions();
            res.status(200).json(permissions);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getPermissionById(req, res) {
        try {
            const permission = await permissionService.getPermissionById(req.params.id);
            if (!permission) return res.status(404).json({ message: 'Permission not found' });
            res.status(200).json(permission);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updatePermission(req, res) {
        try {
            const updatedPermission = await permissionService.updatePermission(req.params.id, req.body);
            if (updatedPermission[0] === 0) return res.status(404).json({ message: 'Permission not found' });
            res.status(200).json({ message: 'Permission updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deletePermission(req, res) {
        try {
            const deleted = await permissionService.deletePermission(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Permission not found' });
            res.status(200).json({ message: 'Permission deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PermissionController();
