const { Role, Permission } = require('../Models/Association');

class RoleService {
    async createRole(data) {
        return Role.create(data);
    }

    async assignPermissionsToRole(roleId, permissionIds) {
        const role = await Role.findByPk(roleId);
        if (!role) throw new Error('Role not found');
        const permissions = await Permission.findAll({ where: { id: permissionIds } });
        return role.addPermissions(permissions); // Sequelize magic method
    }
    
    async getAllRoles() {
        return Role.findAll({ include: Permission });
    }

    async getRoleById(id) {
        const role = await Role.findByPk(id, {
            include: {
                model: Permission,
                through: { attributes: [] } // This excludes the join table attributes
            }
        });
        return role;
    }

    async updateRole(id, data) {
        return Role.update(data, { where: { id } });
    }

    async deleteRole(id) {
        return Role.destroy({ where: { id } });
    }
}

module.exports = new RoleService();
