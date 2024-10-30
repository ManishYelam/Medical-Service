const { JWT_CONFIG } = require('../../Utils/constants');
const { comparePassword, hashPassword } = require('../Helpers/hashPassword');
const { generateToken } = require('../../Utils/jwtSecret');
const { generateOTP } = require('../../Utils/OTP');
const { User, Role, Permission, UserLog } = require('../Models/Association');
const { Op } = require('sequelize');
const EmailService = require('../Services/email.Service');

const AuthService = {
  verifyUserOTP: async (userId, inputOtp) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      const { otp, otpExpiryTime } = user;
      const verification = verifyOTPTimestamped(inputOtp, otp, otpExpiryTime);
      if (verification.isValid) {
        // OTP is valid, mark user as verified
        user.isVerified = true;  // Optional: a field in the User model
        user.otp = null;         // Clear the OTP after verification
        user.otpExpiryTime = null;
        await user.save();
      }
      return verification;
    } catch (error) {
      throw new Error('Error verifying OTP: ' + error.message);
    }
  },

  login: async (usernameOrEmail, password, req, res) => {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: usernameOrEmail },
          { username: usernameOrEmail }
        ]
      },
      attributes: ['id', 'username', 'email', 'password', 'first_name', 'last_name', 'date_of_birth', 'phone_number', 'address', 'status'],
      include: [{
        model: Role, attributes: ['id', 'name', 'description'],
        include:
          [{
            model: Permission,
            attributes: ['id', 'name'],
          }]
      }]
    });
    if (!user) throw new Error('Invalid credentials');

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) throw new Error('Invalid credentials');

    const role = user.Role;
    if (!role || !role.Permissions) {
      throw new Error('User role or permissions not found');
    }
    const permissionsArray = role.Permissions.map(permission => ({
      id: permission.id,
      name: permission.name,
    }));
    const token = generateToken(user, req, res);
    return { token, user, permissions: permissionsArray };
  },

  logout: async (userId, token, ip) => {
    if (!token) {
      throw new Error('No token provided for logout');
    }
    // Optionally, blacklist the JWT if using a blacklist mechanism
    // await blacklistToken(token);
    // Log the logout event in the UserLog table
    await UserLog.create({
      userId,
      sourceIp: ip,
      logoffBy: 'USER',
      logoffAt: new Date(),
      jwtToken: token,
    });
    return { message: 'Successfully logged out' };
  },

  changePassword: async (userId, oldPassword, newPassword) => {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = await comparePassword(oldPassword, user.password);
      if (!isMatch) {
        throw new Error('Old password is incorrect');
      }
      const newHashedPassword = await hashPassword(newPassword, 10);
      await User.update({ password: newHashedPassword }, { where: { id: userId } });

      await EmailService.sendPasswordChangeEmail(userId, user.email, user.username);
      return { message: 'Password changed successfully' };
    } catch (error) {
      console.error('Error changing password:', error);
      throw new Error('Password change failed');
    }
  },

  forgetPassword: async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const otp = generateOTP(); // Generate OTP
    user.otp = otp; // Save OTP to user record (make sure to have this field in your User model)
    await user.save();

    await EmailService.sendForgetPasswordEmail(user.id, otp); // Send email with OTP
    return { message: 'OTP sent to your email' };
  },

  ResetPassword: async (email) => {
    const { token } = req.query;
    const { oldPassword, newPassword } = req.body;
    EmailService.sendResetPasswordEmail
  },

  confirmEmail: async (req, res) => {
    const { userId } = req.query;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
      // Log confirmation or update a field as needed
      console.log(`Email confirmed by user ID: ${userId}`);
      // Optionally, update the user status
      // user.emailConfirmed = true; // Assuming you have such a field
      // await user.save();
      res.send('Thank you for confirming! Your password change has been noted.');
    } catch (error) {
      console.error(`Error confirming email: ${error.message}`);
      res.status(500).send('Internal server error');
    }
  },

  refreshToken: async (token) => {
    try {
      const decoded = jwt.verify(token, JWT_CONFIG.SECRET, { ignoreExpiration: true });

      // Generate a new token with the same user info (id and role)
      const newToken = jwt.sign(
        { id: decoded.id, role: decoded.role },
        JWT_CONFIG.SECRET,
        { expiresIn: '1h' }
      );

      return { token: newToken };
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw new Error('Token refresh failed');
    }
  }
}

module.exports = AuthService;
