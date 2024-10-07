const { Role } = require('../Models/Association');

class RoleService {
    async createRole(data) {
        return Role.create(data);
    }

    async getAllRoles() {
        return Role.findAll();
    }

    async getRoleById(id) {
        return Role.findByPk(id);
    }

    async updateRole(id, data) {
        return Role.update(data, { where: { id } });
    }

    async deleteRole(id) {
        return Role.destroy({ where: { id } });
    }
}

module.exports = new RoleService();
