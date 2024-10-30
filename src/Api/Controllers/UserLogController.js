const userLogService = require('../Services/UserLogService');

module.exports = {
    createUserLog: async (req, res) => {
        try {
            const newUserLog = await userLogService.createUserLog(req.body);
            res.status(201).json(newUserLog);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getAllUserLogs: async (req, res) => {
        try {
            const userLogs = await userLogService.getAllUserLogs();
            res.status(200).json(userLogs);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getUserLogById: async (req, res) => {
        try {
            const userLog = await userLogService.getUserLogById(req.params.id);
            if (!userLog) return res.status(404).json({ error: 'User Log not found' });
            res.status(200).json(userLog);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateUserLog: async (req, res) => {
        try {
            const updatedUserLog = await userLogService.updateUserLog(req.params.id, req.body);
            res.status(200).json(updatedUserLog);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteUserLog: async (req, res) => {
        try {
            await userLogService.deleteUserLog(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteLogsInRange(req, res) {
        const { start_date, end_date } = req.params;
        if (!start_date || !end_date) {
            return res.status(400).json({ error: 'startDate and endDate are required.' });
        }
        try {
            const result = await userLogService.deleteLogsInRange(start_date, end_date);
            if (result === 0) {
                return res.status(404).json({ message: 'No records found in the specified range.' });
            }
            return res.status(200).json({ message: `${result} records deleted successfully.` });
        } catch (error) {
            console.error('Error deleting logs:', error);
            return res.status(500).json({ error: 'An error occurred while deleting logs.' });
        }
    }
};
