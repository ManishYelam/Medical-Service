const { User, Role, Permission, } = require('../Models/Association');
const { hashPassword } = require('../Helpers/hashPassword');
const { Op } = require('sequelize');

class UserService {
    async createUser(data) {
        try {
            if (data.password) {
                data.password = await hashPassword(data.password);
            }
            return await User.create(data);
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async getAllUsers() {
        return User.findAll({ include: [Role] });
    }

    async getUserById(id) {
        const user = await User.findByPk(id, {
            include: {
                model: Role,
                include: {
                    model: Permission,
                    through: { attributes: [] } // Exclude join table attributes
                }
            }
        });
        return user;
    }

    async updateUser(id, data) {
        try {
            if (data.password) {
                data.password = await hashPassword(data.password);
            }
            return User.update(data, { where: { id } });
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async deleteUser(id) {
        return User.destroy({ where: { id } });
    }

    async deleteUserRanges(startId, endId) {
        const deletedCount = await User.destroy({
            where: {
                id: {
                    [Op.between]: [startId, endId]
                }
            }
        });
        return deletedCount;
    }

    async checkUserPermission(userId, permissionName) {
        const user = await User.findByPk(userId, {
            include: {
                model: Role,
                include: Permission
            }
        });
        if (!user) throw new Error('User not found');
        const roles = user.Roles || [];
        const hasPermission = roles.flatMap(role => role.Permissions || []).some(
            perm => perm.name === permissionName
        );
        return hasPermission;
    };
}

module.exports = new UserService();
