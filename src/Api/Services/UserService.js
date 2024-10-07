const { User, Role, Department } = require('../Models/Association');

class UserService {
    async createUser(data) {
        return User.create(data);
    }
    async getAllUsers() {
        return User.findAll({ include: [Role, Department] });
    }

    async getUserById(id) {
        return User.findByPk(id, { include: [Role, Department] });
    }

    async updateUser(id, data) {
        return User.update(data, { where: { id } });
    }

    async deleteUser(id) {
        return User.destroy({ where: { id } });
    }
}

module.exports = new UserService();
