const UserLog = require('../Models/user_logs');
const { Op } = require('sequelize');

class UserLogService {
    async createUserLog(data) {
        return await UserLog.create(data);
    }

    async getAllUserLogs() {
        return await UserLog.findAll();
    }

    async getUserLogById(id) {
        return await UserLog.findByPk(id);
    }

    async updateUserLog(id, data) {
        const userLog = await UserLog.findByPk(id);
        if (!userLog) throw new Error('User Log not found');
        return await UserLog.update(data, { where: { id } });
    }

    async deleteUserLog(id) {
        const userLog = await UserLog.findByPk(id);
        if (!userLog) throw new Error('User Log not found');
        return await UserLog.destroy({ where: { id } });
    }

    async deleteLogsInRange(startDate, endDate) {
        return UserLog.destroy({
            where: {
                login_at: {
                    [Op.between]: [new Date(startDate), new Date(endDate)],
                },
            },
        });
    }
}

module.exports = new UserLogService();
