const { Op } = require('sequelize');
const { JWT_CONFIG } = require('../../Utils/constants');
const { comparePassword, hashPassword } = require('../Helpers/hashPassword');
const { generateToken, verifyToken } = require('../../Utils/jwtSecret');
const { generateOTPTimestamped } = require('../../Utils/OTP');
const { Role, Permission, UserLog } = require('../Models/Association');
const models = require('../../Config/Database/centralModelLoader');
const { sendResetPasswordCodeEmail, sendPasswordChangeEmail } = require('../Services/email.Service');

const AuthService = {
  login: async (healthId, usernameOrEmail, password, req, res) => {
    const user = await models.MAIN.User.findOne({
      where: {
        health_id: healthId,
        [Op.or]: [
          { email: usernameOrEmail },
          { username: usernameOrEmail }
        ]
      },
      attributes: ['id', 'health_id', 'username', 'email', 'password', 'first_name', 'last_name', 'date_of_birth', 'phone_number', 'address', 'status'],
      include: [{
        model: Role, attributes: ['id', 'name', 'description'],
        include:
          [{
            model: Permission, attributes: ['id', 'name'],
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
    await models.MAIN.UserLog.create({
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
      const user = await models.MAIN.User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = await comparePassword(oldPassword, user.password);
      if (!isMatch) {
        throw new Error('Old password is incorrect');
      }
      const newHashedPassword = await hashPassword(newPassword, 10);
      await models.MAIN.User.update({ password: newHashedPassword }, { where: { id: userId } });
      await sendPasswordChangeEmail(userId, user.email, user.username);
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new Error('Password change failed', error);
    }
  },

  forgetPassword: async (email) => {
    const user = await models.MAIN.User.findOne({ where: { email } });
    if (!user) { throw new Error('User not found'); }
    const { otp, expiryTime } = generateOTPTimestamped();
    user.otp = otp;
    user.expiryTime = expiryTime;
    const generateVerificationUrl = (userId, otp) => {
      const baseUrl = 'http://localhost:5000/verify';
      return `${baseUrl}?userId=${userId}&otp=${otp}`;
    };
    const verificationLink = generateVerificationUrl(user.id, otp);
    const resetVerificationLink = `http://localhost:5000/reset-password?userId=${user.id}&token=${otp}`;
    await sendResetPasswordCodeEmail(user.id, user.username, user.email, verificationLink, resetVerificationLink, otp);
    await user.save();
    return { message: 'OTP sent to your email' };
  },
}

module.exports = AuthService;
































// confirmEmail: async (req, res) => {
//   const { userId } = req.query;

//   try {
//     const user = await User.findByPk(userId);
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     // Log confirmation or update a field as needed
//     console.log(`Email confirmed by user ID: ${userId}`);
//     // Optionally, update the user status
//     // user.emailConfirmed = true; // Assuming you have such a field
//     // await user.save();
//     res.send('Thank you for confirming! Your password change has been noted.');
//   } catch (error) {
//     console.error(`Error confirming email: ${error.message}`);
//     res.status(500).send('Internal server error');
//   }
// },

// refreshToken: async (token) => {
//   try {
//     const decoded = verifyToken(token);
//     const newToken = jwt.sign(
//       { id: decoded.id, role: decoded.role },
//       JWT_CONFIG.SECRET,
//       { expiresIn: '1h' }
//     );

//     return { token: newToken };
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     throw new Error('Token refresh failed');
//   }
// }