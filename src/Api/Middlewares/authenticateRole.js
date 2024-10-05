const { verifyToken } = require('../../utils/jwtSecret');

module.exports = {
  authenticateRole: (roles) => {
    return (req, res, next) => {
      const token = req.headers['authorization']?.split(' ')[1]; // Expecting the token in the format "Bearer <token>"
      if (!token) {
        return res
          .status(401)
          .json({ message: 'Access Denied: No token provided' });
      }
      try {
        const decoded = verifyToken(token);
        req.user = decoded;
        if (!roles.includes(req.user.role)) {
          return res
            .status(403)
            .json({
              message:
                'Access Denied: You do not have the necessary permissions',
            });
        }
        next();
      } catch (error) {
        return res.status(400).json({ message: 'Invalid Token' });
      }
    };
  },
};
