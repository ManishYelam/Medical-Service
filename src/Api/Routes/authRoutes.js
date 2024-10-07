const express = require('express');
const authController = require('../Controllers/AuthController ');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Forgot Password
router.post('/forgot-password', authController.forgotPassword);

// Verify OTP
router.post('/verify-otp', authController.verifyOTP);

// Reset Password
router.post('/reset-password', authController.resetPassword);

// Change Password (requires authentication)
router.put('/change-password', authMiddleware, authController.changePassword);

// Refresh Token
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
