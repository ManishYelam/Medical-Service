const { hashPassword } = require('../Helpers/hashPassword');
const { Op } = require('sequelize');
const { generateOTPTimestamped, verifyOTPTimestamped } = require('../../Utils/OTP');
const { sendLaunchCodeEmail, sendVerificationEmail } = require('./email.Service');
const { generateUniqueIDForHealth } = require('../../Utils/generateUniqueID');
const models = require('../../Config/Database/centralModelLoader');

const User = models.MAIN.User;
const Role = models.MAIN.Role;
const Permission = models.MAIN.Permission;

module.exports = {
  createUser: async (data) => {
    try {
      if (data.password) {
        data.password = await hashPassword(data.password);
      }
      const { otp, expiryTime } = generateOTPTimestamped();
      data.otp = otp;
      data.expiryTime = expiryTime;
      const newUser = await User.create(data);
      const generateVerificationUrl = (userId, otp) => {
        const baseUrl = 'http://localhost:5000/verify';
        return `${baseUrl}?userId=${userId}&otp=${otp}`;
      };
      const verificationUrl = generateVerificationUrl(newUser.id, otp);
      await sendLaunchCodeEmail(
        newUser.id,
        newUser.username,
        newUser.email,
        verificationUrl,
        otp
      );
      console.log(otp);

      return newUser;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  },

  verifyCreateUser: async (data) => {
    try {
      const user = await User.findByPk(data);
      if (!user) throw new Error('User not found');
      const { launchCode: savedCode, launchCodeExpiry } = user;
      const { isValid, message } = verifyOTPTimestamped(
        data.launchCode,
        savedCode,
        launchCodeExpiry
      );
      if (!isValid) throw new Error(message);
      user.isVerified = true;
      user.launchCode = null;
      user.launchCodeExpiry = null;
      await user.save();
      await sendVerificationEmail(user.username, user.email);
      return user;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  },

  getAllUsers: async () => {
    return User.findAll({ include: [Role] });
  },

  getUserById: async (id) => {
    const user = await User.findByPk(id, {
      include: {
        model: Role,
        include: {
          model: Permission,
          through: { attributes: [] },
        },
      },
    });
    return user;
  },

  checkExistsEmail: async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
  },

  checkExistsUsername: async (username) => {
    const user = await User.findOne({ where: { username } });
    return user;
  },

  updateUser: async (id, data) => {
    try {
      const user = await User.findOne({ where: { id } });
      if (!data.health_id && !user.health_id) {
        data.health_id = generateUniqueIDForHealth(data.department);
      }
      // if (data.password) {
      //     data.password = await hashPassword(data.password);
      // }
      return User.update(data, { where: { id } });
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  },

  deleteUser: (id) => {
    return User.destroy({ where: { id } });
  },

  deleteUserRanges: async (startId, endId) => {
    const deletedCount = await User.destroy({
      where: {
        id: {
          [Op.between]: [startId, endId],
        },
      },
    });
    return deletedCount;
  },

  checkUserPermission: async (userId, permissionName) => {
    const user = await User.findByPk(userId, {
      include: {
        model: Role,
        include: Permission,
      },
    });
    if (!user) throw new Error('User not found');
    const roles = user.Roles || [];
    const hasPermission = roles
      .flatMap((role) => role.Permissions || [])
      .some((perm) => perm.name === permissionName);
    return hasPermission;
  },
};
