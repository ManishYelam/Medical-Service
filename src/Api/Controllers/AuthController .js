const { User } = require('../models');
const generateOTP = require('../utils/generateOTP');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailService = require('../services/EmailService');
const generateResetToken = require('../utils/generateResetToken');

class AuthController {
    async register(req, res) {
        const { username, email, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, email, password: hashedPassword });
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async logout(req, res) {
        const { token } = req.body;

        if (!token) return res.sendStatus(401); // Unauthorized

        // Remove the refresh token from Redis
        await client.del(`refresh_token_${token}`);
        res.sendStatus(204); // No Content
    }

    async logout(req, res) {
        res.status(200).json({ message: 'Logged out successfully' });
    }

    async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) return res.status(404).json({ message: 'User not found' });

            const otp = generateOTP();
            user.resetOTP = otp;
            user.otpExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
            await user.save();

            await emailService.sendOTPEmail(user.email, otp);
            res.status(200).json({ message: 'OTP sent to your email' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async verifyOTP(req, res) {
        const { email, otp } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user || user.resetOTP !== otp) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            if (user.otpExpiry < Date.now()) {
                return res.status(400).json({ message: 'OTP has expired' });
            }

            res.status(200).json({ message: 'OTP verified. You can reset your password.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async resetPassword(req, res) {
        const { email, otp, newPassword } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user || user.resetOTP !== otp) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            if (user.otpExpiry < Date.now()) {
                return res.status(400).json({ message: 'OTP has expired' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.resetOTP = null;
            user.otpExpiry = null;
            await user.save();

            res.status(200).json({ message: 'Password has been reset successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async changePassword(req, res) {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        try {
            const user = await User.findByPk(userId);
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async refreshToken(req, res) {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not provided' });
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }
    }

    async sendPasswordResetLink(req, res) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const resetToken = generateResetToken(user);
            const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

            await emailService.sendPasswordResetEmail(user.email, resetLink);
            res.status(200).json({ message: 'Password reset link sent to your email' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();
