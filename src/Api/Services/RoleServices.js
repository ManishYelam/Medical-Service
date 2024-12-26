const { loadModels } = require('../Models/ModelOperator/LoadModels');

class RoleService {
  async createRoles(health_id, data) {
    const { Role } = await loadModels(health_id);
    return Role.bulkCreate(data);
  }

  async assignPermissionsToRole(health_id, roleId, permissionIds) {
    const { Role, Permission } = await loadModels(health_id);
    const role = await Role.findByPk(roleId);
    if (!role) throw new Error('Role not found');
    const permissions = await Permission.findAll({
      where: { id: permissionIds },
    });
    return role.addPermissions(permissions); // Sequelize magic method
  }

  async getAllRoles(health_id) {
    const { Role, Permission } = await loadModels(health_id);
    return Role.findAll({ include: Permission });
  }

  async getRoleById(health_id, id) {
    const { Role, Permission } = await loadModels(health_id);
    const role = await Role.findByPk(id, {
      include: {
        model: Permission,
        through: { attributes: [] }, // This excludes the join table attributes
      },
    });
    return role;
  }

  async updateRole(health_id, id, data) {
    const { Role } = await loadModels(health_id);
    return Role.update(data, { where: { id } });
  }

  async deleteRole(health_id, id) {
    const { Role } = await loadModels(health_id);
    return Role.destroy({ where: { id } });
  }
}

module.exports = new RoleService();
