const { loadModels } = require('../Models/ModelOperator/LoadModels');

class RoleService {
  async createRoles(health_id, data) {
    const { Role } = await loadModels(health_id);
    return Role.bulkCreate(data);
  }

  async assignPermissionsToRole(
    health_id,
    roleId,
    permissionIds,
    userID = null
  ) {
    const { Role, Permission, User } = await loadModels(health_id);

    const role = await Role.findByPk(roleId);
    if (!role) {
      throw new Error('Role not found');
    }

    const permissions = await Permission.findAll({
      where: { id: permissionIds },
    });
    if (!permissions.length) {
      throw new Error('Permissions not found');
    }

    await role.addPermissions(permissions); // Sequelize magic method

    if (userID) {
      const user = await User.findByPk(userID);
      if (!user) {
        throw new Error('User not found');
      }

      const permissionIdsArray = permissions.map((perm) => perm.id);
      await user.update({
        permission_ids: permissionIdsArray,
      });

      return {
        message: 'Permissions assigned to role and updated for the user',
        role,
        permissions,
        user,
      };
    }
    return {
      message: 'Permissions assigned to role',
      role,
      permissions,
    };
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
