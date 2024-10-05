const express = require('express');
const RoleRouter = express.Router();
const { authenticateRole } = require('../middlewares/authenticateRole');
const { register, login, logout, forgot, resetPassword, refreshToken } = require('../controllers/Role/Role.controller');
const validate = require('../middlewares/validateMiddleware');
const { registerSchema, loginSchema, resetPasswordSchema, refreshTokenSchema } = require('../validation/userValidation');

RoleRouter
    .post('/register', validate(registerSchema), register)

    .post('/login', validate(loginSchema), login)

    .post('/forgot-password', forgot) // Consider adding validation if needed

    .post('/reset-password', validate(resetPasswordSchema), resetPassword)

    .post('/logout', authenticateRole(['SuperAdmin', 'Admin', 'Moderator', 'User']), logout)

    .post('/refresh-token', validate(refreshTokenSchema), authenticateRole(['SuperAdmin', 'Admin', 'Moderator', 'User', 'Guest']), refreshToken)

    .get('/superadmin-only', authenticateRole(['SuperAdmin']), (req, res) => {
      res.status(200).json({ message: 'Welcome SuperAdmin!' });
    })

    .get('/admin-only', authenticateRole(['SuperAdmin', 'Admin']), (req, res) => {
      res.status(200).json({ message: 'Welcome Admin!' });
    })

    .get('/moderator-only', authenticateRole(['SuperAdmin', 'Admin', 'Moderator']), (req, res) => {
      res.status(200).json({ message: 'Welcome Moderator!' });
    })

    .get('/user-only', authenticateRole(['SuperAdmin', 'Admin', 'User']), (req, res) => {
      res.status(200).json({ message: 'Welcome User!' });
    })
    
    .get('/guest-only', authenticateRole(['Guest']), (req, res) => {
      res.status(200).json({ message: 'Welcome Guest!' });
    });

module.exports = RoleRouter;
