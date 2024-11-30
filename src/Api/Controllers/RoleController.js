const roleService = require('../Services/RoleServices');

class RoleController {
    async createRoles(req, res) {
        try {
            const health_id = req.session.healthID;
            const newRoles = await roleService.createRoles(health_id, req.body);
            res.status(201).json({ message: 'Roles created successfully', roles: newRoles });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async assignPermissionsToRole(req, res) {
        try {
            const health_id = req.session.healthID;
            const { roleId } = req.params;
            const { permissionIds } = req.body;

            await roleService.assignPermissionsToRole(health_id, roleId, permissionIds);
            res.status(200).json({ message: 'Permissions assigned successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllRoles(req, res) {
        try {
            const health_id = req.session.healthID;
            const roles = await roleService.getAllRoles(health_id);
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getRoleById(req, res) {
        try {
            const health_id = req.session.healthID;
            const role = await roleService.getRoleById(health_id, req.params.id);
            if (!role) return res.status(404).json({ message: 'Role not found' });
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    async updateRole(req, res) {
        try {
            const health_id = req.session.healthID;
            const updatedRole = await roleService.updateRole(health_id, req.params.id, req.body);
            if (updatedRole[0] === 0) return res.status(404).json({ message: 'Role not found' });
            res.status(200).json({ message: 'Role updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteRole(req, res) {
        try {
            const health_id = req.session.healthID;
            const deleted = await roleService.deleteRole(health_id, req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Role not found' });
            res.status(200).json({ message: 'Role deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new RoleController();
