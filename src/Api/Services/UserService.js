const { User, Role, Department } = require('../Models/InitializeDatabase');

class UserService {
    async getAllUsers() {
        return User.findAll({ include: [Role, Department] });
    }

    async getUserById(id) {
        return User.findByPk(id, { include: [Role, Department] });
    }

    async createUser(data) {
        return User.create(data);
    }

    async updateUser(id, data) {
        return User.update(data, { where: { id } });
    }

    async deleteUser(id) {
        return User.destroy({ where: { id } });
    }
}

module.exports = new UserService();
