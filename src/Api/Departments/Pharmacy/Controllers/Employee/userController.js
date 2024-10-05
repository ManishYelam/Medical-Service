// controllers/userController.js
const userService = require('../services/userService');
const { generateToken } = require('../helpers/auth');

const userController = {
    createUser: async (req, res) => {
        try {
            const user = await userService.createUser(req.body);
            const token = generateToken(user.id);
            res.status(201).json({ user, token }); // Return token on registration
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await userService.findUserByEmail(req.body.email);
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = generateToken(user.id);
            res.status(200).json({ user, token }); // Return token on login
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const response = await userService.deleteUser(req.params.id);
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = userController;
