const { Op } = require('sequelize');
const { JWT_CONFIG } = require('../../Utils/constants');
const { comparePassword, hashPassword } = require('../Helpers/hashPassword');
const { generateToken, verifyToken } = require('../../Utils/jwtSecret');
const { generateOTPTimestamped } = require('../../Utils/OTP');
const { sendResetPasswordCodeEmail, sendPasswordChangeEmail } = require('../Services/email.Service');
const { DatabaseOperator } = require('../../Config/Database/DatabaseOperator');
const { Role, Permission, UserLog, Organization } = require('../Models/Association');
const models = require('../../Config/Database/centralModelLoader');

const User = models.MAIN.User;
// const Role = models.MAIN.Role;
// const Permission = models.MAIN.Permission;
// const UserLog = models.MAIN.UserLog;

const AuthService = {
  login: async (healthId, usernameOrEmail, password, req, res) => {
    const user = await User.findOne({
      where: {
        health_id: healthId,
        [Op.or]: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
      attributes: [
        'id',
        'health_id',
        'username',
        'email',
        'password',
        'first_name',
        'last_name',
        'date_of_birth',
        'phone_number',
        'address',
        'status',
      ],
      include: [
        {
          model: Role,
          attributes: ['id', 'name', 'description'],
          include: [
            {
              model: Permission,
            },
          ],
        },
      ],
    });
    if (!user) throw new Error('Invalid credentials');

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) throw new Error('Invalid credentials');

    const role = user.Role;
    if (!role || !role.Permissions) {
      throw new Error('User role or permissions not found');
    }
    const permissionsArray = role.Permissions.map((permission) => ({
      id: permission.id,
      name: permission.name,
    }));
    const token = generateToken(user, req, res);
    const data = await DatabaseOperator(healthId);

    return { token, data, healthId, user, permissions: permissionsArray };
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
      const user = await models.MAIN.User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      const isMatch = await comparePassword(oldPassword, user.password);
      if (!isMatch) {
        throw new Error('Old password is incorrect');
      }
      const newHashedPassword = await hashPassword(newPassword, 10);
      await models.MAIN.User.update(
        { password: newHashedPassword },
        { where: { id: userId } }
      );
      await sendPasswordChangeEmail(userId, user.email, user.username);
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new Error('Password change failed', error);
    }
  },

  forgetPassword: async (email) => {
    const user = await models.MAIN.User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const { otp, expiryTime } = generateOTPTimestamped();
    user.otp = otp;
    user.expiryTime = expiryTime;
    const generateVerificationUrl = (userId, otp) => {
      const baseUrl = 'http://localhost:5000/verify';
      return `${baseUrl}?userId=${userId}&otp=${otp}`;
    };
    const verificationLink = generateVerificationUrl(user.id, otp);
    const resetVerificationLink = `http://localhost:5000/reset-password?userId=${user.id}&token=${otp}`;
    await sendResetPasswordCodeEmail(
      user.id,
      user.username,
      user.email,
      verificationLink,
      resetVerificationLink,
      otp
    );
    await user.save();
    return { message: 'OTP sent to your email' };
  },

  upsertOrganization: async (data) => {
    try {
      const existingOrg = await Organization.findOne();
      if (data.emailPassword) {
        data.emailPassword = await hashPassword(data.emailPassword);
      }
      if (existingOrg) {
        await existingOrg.update(data);
        return { ...existingOrg.toJSON(), isNewRecord: false };
      } else {
        const newOrg = await Organization.create(data);
        return { ...newOrg.toJSON(), isNewRecord: true };
      }
    } catch (error) {
      console.error('Error in upsertOrganization:', error);
      throw new Error('Failed to upsert organization');
    }
  },

  getOrganization: async () => {
    try {
      const organization = await Organization.findOne();
      return organization ? organization.toJSON() : null;
    } catch (error) {
      console.error('Error in getOrganization:', error);
      throw new Error('Failed to fetch organization details');
    }
  },

};

module.exports = AuthService;
