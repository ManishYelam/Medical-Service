const AuthService = require('../Services/AuthServices');

const AuthController = {
  login: async (req, res) => {
    try {
      const { token, user } = await AuthService.login(req.body.usernameOrEmail, req.body.password);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  logout: async (req, res) => {
    const userId = req.user.id;
    const token = req.token;
    const ip = req.headers['x-forwarded-for'] || req.ip;
    try {
      const response = await AuthService.logout(userId, token, ip);
      req.token = null;
      console.log(response);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  forgetPassword: async (req, res) => {
    const { email } = req.body;
    try {
      const result = await AuthService.forgetPassword(email);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(404).json({ error: error.message });
    }
  },

  changePassword: async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
      await AuthService.changePassword(req.user.id, oldPassword, newPassword);
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      await AuthService.resetPassword(req.user.id, req.body.newPassword);
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const newToken = await AuthService.refreshToken(req.body.token);
      res.status(200).json({ token: newToken });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = AuthController;
