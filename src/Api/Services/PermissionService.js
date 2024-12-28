const { loadModels } = require('../Models/ModelOperator/LoadModels');

class PermissionService {
  async createPermission(health_id, data) {
    const { Permission } = await loadModels(health_id);
    return Permission.bulkCreate(data);
  }

  async getAllPermissions(health_id) {
    const { Permission } = await loadModels(health_id);
    return Permission.findAll();
  }

  async getPermissionById(health_id, id) {
    const { Permission } = await loadModels(health_id);
    return Permission.findByPk(id);
  }

  async updatePermission(health_id, id, data) {
    const { Permission } = await loadModels(health_id);
    return Permission.update(data, { where: { id } });
  }

  async deletePermission(health_id, id) {
    const { Permission } = await loadModels(health_id);
    return Permission.destroy({ where: { id } });
  }

  buildPermissionTree(permissions) {
    const permissionMap = {};
    permissions.forEach((permission) => {
      const { id, name, level, parent_id } = permission;
      if (!permissionMap[id]) {
        permissionMap[id] = {
          id,
          name,
          level,
          parent_id,
          children: [],
        };
      } else {
        permissionMap[id].name = name;
        permissionMap[id].level = level;
      }

      if (parent_id) {
        if (!permissionMap[parent_id]) {
          permissionMap[parent_id] = { children: [] };
        }
        permissionMap[parent_id].children.push(permissionMap[id]);
      }
    });

    return Object.values(permissionMap).filter(
      (permission) => !permission.parent_id
    );
  }

  async getAllPermissionsTree(health_id) {
    try {
      const { Permission } = await loadModels(health_id);

      const permissions = await Permission.findAll();

      const permissionTree = this.buildPermissionTree(permissions);
      return permissionTree;
    } catch (error) {
      throw new Error('Error fetching all permissions tree: ' + error.message);
    }
  }

  async getUserPermissionTree(health_id) {
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
      const permissionTree = this.buildPermissionTree(user.Role.Permissions);
      return permissionTree;
    } catch (error) {
      throw new Error('Error fetching user permissions: ' + error.message);
    }
  }
}

module.exports = new PermissionService();
