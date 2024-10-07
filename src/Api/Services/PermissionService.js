const { Permission } = require('../Models/Association');

class PermissionService {
    async createPermission(data) {
        return Permission.create(data);
    }
    
    async getAllPermissions() {
        return Permission.findAll();
    }

    async getPermissionById(id) {
        return Permission.findByPk(id);
    }

    async updatePermission(id, data) {
        return Permission.update(data, { where: { id } });
    }

    async deletePermission(id) {
        return Permission.destroy({ where: { id } });
    }
}

module.exports = new PermissionService();
