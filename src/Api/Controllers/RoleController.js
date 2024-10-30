const roleService = require('../Services/RoleServices');

class RoleController {
    async createRole(req, res) {
        try {
            const newRole = await roleService.createRole(req.body);
            res.status(201).json(newRole);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async assignPermissionsToRole(req, res) {
        try {
            const { roleId } = req.params;
            const { permissionIds } = req.body;
            await roleService.assignPermissionsToRole(roleId, permissionIds);
            res.status(200).json({ message: 'Permissions assigned successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAllRoles(req, res) {
        try {
            const roles = await roleService.getAllRoles();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getRoleById(req, res) {
        try {
            const role = await roleService.getRoleById(req.params.id);
            if (!role) return res.status(404).json({ message: 'Role not found' });
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    async updateRole(req, res) {
        try {
            const updatedRole = await roleService.updateRole(req.params.id, req.body);
            if (updatedRole[0] === 0) return res.status(404).json({ message: 'Role not found' });
            res.status(200).json({ message: 'Role updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteRole(req, res) {
        try {
            const deleted = await roleService.deleteRole(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Role not found' });
            res.status(200).json({ message: 'Role deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new RoleController();
