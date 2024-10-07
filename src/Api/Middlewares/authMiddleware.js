const jwt = require('jsonwebtoken');
const { User, Role, Permission } = require('../models');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the format "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify JWT token
        const user = await User.findByPk(decoded.id, {
            include: {
                model: Role,
                as: 'role',
                include: {
                    model: Permission,
                    as: 'permissions'
                }
            }
        });

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
