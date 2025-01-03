const { loadModels } = require('../Models/ModelOperator/LoadModels');

module.exports = {
  createPermission: async (health_id, data) => {
    const { Permission } = await loadModels(health_id);
    return Permission.bulkCreate(data);
  },

  buildPermissionTree: (permissions) => {
    const permissionMap = {};
    const rootPermissions = [];

    permissions.forEach((permission) => {
      const { id, name, level, parent_permission_id, permission_group_id } =
        permission;

      // Initialize or update the permission map
      if (!permissionMap[id]) {
        permissionMap[id] = {
          id,
          name,
          level,
          parent_permission_id,
          permission_group_id,

          children: [],
        };
      } else {
        permissionMap[id] = {
          ...permissionMap[id],
          name,
          level,
          permission_group_id,
        };
      }

      // Handle parent-child relationships
      if (parent_permission_id) {
        if (!permissionMap[parent_permission_id]) {
          permissionMap[parent_permission_id] = { children: [] };
        }
        permissionMap[parent_permission_id].children.push(permissionMap[id]);
      } else {
        // If no parent, it's a root node
        rootPermissions.push(permissionMap[id]);
      }
    });

    return rootPermissions;
  },

  getAllPermissions: async (health_id) => {
    const { Permission } = await loadModels(health_id);
    let permissions = await Permission.findAll();
    permissions = permissions.map((permission) => permission.toJSON());
    const result = module.exports.buildPermissionTree(permissions);
    return result;
  },

  getPermissionById: async (health_id, id) => {
    const { Permission } = await loadModels(health_id);
    return Permission.findByPk(id);
  },

  updatePermission: async (health_id, id, data) => {
    const { Permission } = await loadModels(health_id);
    return Permission.update(data, { where: { id } });
  },

  deletePermission: async (health_id, id) => {
    const { Permission } = await loadModels(health_id);
    return Permission.destroy({ where: { id } });
  },

  getUserPermissionTree: async (health_id) => {
    try {
      const { User, Role, Permission } = await loadModels(health_id);

      const user = await User.findAll(health_id, {
        include: {
          model: Role,
          include: {
            model: Permission,
            through: { attributes: [] },
          },
        },
      });

      if (!user) {
        throw new Error('User not found');
      }
      const permissionTree = module.exports.buildPermissionTree(
        user.Role.Permissions
      );
      return permissionTree;
    } catch (error) {
      throw new Error('Error fetching user permissions: ' + error.message);
    }
  },
};
