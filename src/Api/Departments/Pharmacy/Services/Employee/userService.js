// services/userService.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const userService = {
    createUser: async (data) => {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await User.create({ ...data, password: hashedPassword });
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getUsers: async () => {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getUserById: async (id) => {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error("User not found");
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    updateUser: async (id, data) => {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error("User not found");
            if (data.password) {
                data.password = await bcrypt.hash(data.password, 10);
            }
            await user.update(data);
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deleteUser: async (id) => {
        try {
            const user = await User.findByPk(id);
            if (!user) throw new Error("User not found");
            await user.destroy();
            return { message: "User deleted successfully" };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    findUserByEmail: async (email) => {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) throw new Error("User not found");
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

module.exports = userService;
