const { User } = require('../models');
const generateOTP = require('../utils/generateOTP');
const nodemailer = require('nodemailer');

class AuthController {
    async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Generate OTP and save it (in production, OTP should expire after a time)
            const otp = generateOTP();
            user.resetOTP = otp;
            user.otpExpiry = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes
            await user.save();

            // Send OTP to user's email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Password Reset OTP',
                text: `Your password reset OTP is ${otp}`
            };

            await transporter.sendMail(mailOptions);

            res.status(200).json({ message: 'OTP sent to your email' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();






class AuthController {
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

            // OTP is valid
            res.status(200).json({ message: 'OTP verified. You can reset your password.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();






const bcrypt = require('bcrypt');

class AuthController {
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

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password and clear OTP
            user.password = hashedPassword;
            user.resetOTP = null;
            user.otpExpiry = null;
            await user.save();

            res.status(200).json({ message: 'Password has been reset successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();


class AuthController {
    async changePassword(req, res) {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id; // Assuming user is authenticated

        try {
            const user = await User.findByPk(userId);

            // Check if current password is valid
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the password
            user.password = hashedPassword;
            await user.save();

            res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();





const jwt = require('jsonwebtoken');

class AuthController {
    async refreshToken(req, res) {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not provided' });
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            // Generate a new access token
            const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }
    }
}

module.exports = new AuthController();




const emailService = require('../services/emailService');
const generateOTP = require('../utils/generateOTP');

class AuthController {
    async forgotPassword(req, res) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Generate OTP and save it
            const otp = generateOTP();
            user.resetOTP = otp;
            user.otpExpiry = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes
            await user.save();

            // Send OTP via email
            await emailService.sendOTPEmail(user.email, otp);

            res.status(200).json({ message: 'OTP sent to your email' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();



class AuthController {
    async sendPasswordResetLink(req, res) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Generate password reset token (JWT or custom token)
            const resetToken = generateResetToken(user);  // Assume a token generation function

            const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

            // Send password reset email
            await emailService.sendPasswordResetEmail(user.email, resetLink);

            res.status(200).json({ message: 'Password reset link sent to your email' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();


const jwt = require('jsonwebtoken');

const generateResetToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }  // Reset token expires in 1 hour
    );
};

module.exports = generateResetToken;
