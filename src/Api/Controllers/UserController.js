const userService = require('../Services/UserService');

class UserController {
    async createUser(req, res) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
            res.status(200).json({ message: 'Fetch all users successfully', user: users });
        } catch (error) {
            if (!res.headersSent) {
                return res.status(500).json({ message: error || 'Internal Server Error' });
            }
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ message: 'User found successfully', user: user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const updatedUser = await userService.updateUser(req.params.id, req.body);
            if (updatedUser[0] === 0) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ message: 'User updated successfully', user: req.body });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async deleteUser(req, res) {
        try {
            const deleted = await userService.deleteUser(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ message: 'User deleted successfully', user: req.params.id });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async deleteUserRanges(req, res) {
        try {
            const { start_id, end_id } = req.params;
            const start = parseInt(start_id, 10);
            const end = parseInt(end_id, 10);
            if (isNaN(start) || isNaN(end) || start > end) {
                return res.status(400).json({ error: 'Invalid ID range' });
            }
            const deletedCount = await UserService.deleteUserRanges(start, end);
            return res.status(200).json({ message: `${deletedCount} users deleted successfully.` });
        } catch (error) {
            console.error('Error deleting users:', error);
            return res.status(500).json({ error: 'An error occurred while deleting users' });
        }
    }

    async checkUserPermission(req, res) {
        try {
            const { userId, permissionName } = req.params;
            const hasPermission = await userService.checkUserPermission(userId, permissionName);
            res.status(200).json({ hasPermission });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
