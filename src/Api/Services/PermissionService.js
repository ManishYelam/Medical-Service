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
}

module.exports = new PermissionService();
