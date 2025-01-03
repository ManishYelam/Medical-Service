const { loadModels } = require('../Models/ModelOperator/LoadModels');

module.exports = {
  createRoles: async (health_id, data) => {
    const { Role } = await loadModels(health_id);
    return Role.bulkCreate(data);
  },

  assignPermissionsToRole: async (
    health_id,
    roleId,
    permissionIds,
    userID = null
  ) => {
    const { Role, Permission, User, RolePermissions } =
      await loadModels(health_id);

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

    // Case when no userID is provided, only assign permissions to the role
    if (!userID) {
      await role.addPermissions(permissions);
      return {
        message: 'Permissions assigned to role',
        role,
        permissions,
      };
    }

    // Case when userID is provided, update the user's permissions
    const user = await User.findByPk(userID);
    if (!user) {
      // If the user is not found, simply return a response without throwing an error
      return {
        message: 'User not found, but permissions assigned to role',
        role,
        permissions,
        user: null,
      };
    }

    const existingRolePermissions = await RolePermissions.findAll({
      where: { role_id: roleId },
    });
    const existingPermissionIds = existingRolePermissions.map(
      (rp) => rp.permission_id
    );

    // Find valid permissions that exist in the role
    const validPermissionIds = permissionIds.filter((id) =>
      existingPermissionIds.includes(id)
    );

    if (validPermissionIds.length) {
      await user.update({
        permission_ids: validPermissionIds,
      });
    }

    return {
      message: `Permissions assigned to role and ${
        validPermissionIds.length
          ? 'updated for the user'
          : 'no valid permissions for user'
      }`,
      role,
      permissions,
      user: userID ? user : null,
      validPermissionIds,
    };
  },

  getAllRoles: async (health_id) => {
    const { Role, Permission } = await loadModels(health_id);
    return Role.findAll({ include: Permission });
  },

  getRoleById: async (health_id, id) => {
    const { Role, Permission } = await loadModels(health_id);
    const role = await Role.findByPk(id, {
      include: {
        model: Permission,
        through: { attributes: [] }, // This excludes the join table attributes
      },
    });
    return role;
  },

  updateRole: async (health_id, id, data) => {
    const { Role } = await loadModels(health_id);
    return Role.update(data, { where: { id } });
  },

  deleteRole: async (health_id, id) => {
    const { Role } = await loadModels(health_id);
    return Role.destroy({ where: { id } });
  },
};
