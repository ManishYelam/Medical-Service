module.exports = authMiddleware;
// authMiddleware.js (e.g., for JWT-based authentication)
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await User.findByPk(decoded.id, { include: 'role' }); // Find user and include role
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    req.user = user; // Set the user in the request object
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticateUser;
