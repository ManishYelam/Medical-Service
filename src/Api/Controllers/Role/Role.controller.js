const {
  login,
  logout,
  forgotPassword,
  resetPassword,
  refreshToken,
  register,
} = require('../../services/role.service');

module.exports = {
  register: async (req, res) => {
    const { user_name, role, user_email, user_password, user_contact } =
      req.body;
    try {
      await register(user_name, role, user_email, user_password, user_contact);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const { token, role } = await login(username, password);
      res.status(200).json({ token, role });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    const { token } = req.body; // You can retrieve token from headers as well
    await logout(token);
    res.status(200).json({ message: 'Logged out successfully' });
  },

  forgot: async (req, res) => {
    const { username } = req.body;
    try {
      const resetToken = await forgotPassword(username);
      // Send resetToken via email
      res.status(200).json({ message: 'Reset token sent', resetToken });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  resetPassword: async (req, res) => {
    const { resetToken, newPassword } = req.body;
    try {
      await resetPassword(resetToken, newPassword);
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  refreshToken: async (req, res) => {
    const { token } = req.body;
    try {
      const newToken = await refreshToken(token);
      res.status(200).json({ token: newToken });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
