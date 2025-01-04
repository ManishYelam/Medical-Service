const AuthService = require('../Services/AuthServices');

module.exports = {
  login: async (req, res) => {
    try {
      const { health_id, usernameOrEmail, password } = req.body;
      const { token, data, user, permissions } = await AuthService.login(
        health_id,
        usernameOrEmail,
        password
      );
      // Store Health ID in session after successful login
      req.session.healthID = user.health_id;
      res.status(200).json({ token, user, permissions, data });
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
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: 'Logout failed: Session error' });
        }
        req.token = null;
        res.clearCookie('connect.sid');
        return res.status(200).json(response);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  forgetPassword: async (req, res) => {
    const { email } = req.params;
    try {
      const result = await AuthService.forgetPassword(email);
      res.status(200).json(result);
    } catch (error) {
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

  upsertOrganization: async (req, res) => {
    try {
      const data = req.body;

      const organization = await AuthService.upsertOrganization(data);

      res.status(organization.isNewRecord ? 201 : 200).json({
        message: organization.isNewRecord
          ? 'Organization created successfully'
          : 'Organization updated successfully',
        data: organization,
      });
    } catch (error) {
      console.error('Error managing organization record:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getOrganization: async (req, res) => {
    try {
        const organization = await AuthService.getOrganization();

        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        res.status(200).json({ data: organization });
    } catch (error) {
        console.error('Error fetching organization:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
},

};
