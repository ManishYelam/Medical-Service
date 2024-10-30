const { verifyToken } = require('../../Utils/jwtSecret');
const { User, Role, Permission } = require('../Models/Association');
const UserLogService = require('../Services/UserLogService');

const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = verifyToken(token);
        const user = await User.findByPk(decoded.id, {
            include: [
                {
                    model: Role,
                    include: {
                        model: Permission,
                        through: { attributes: [] }
                    }
                }
            ]
        });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        const role = user.Role;
        const permissions = role.Permissions ? role.Permissions.map(permission => ({
            id: permission.id,
            name: permission.name
        })) : [];
        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: role.name,
            permissions: permissions
        };
        req.user = decoded; 
        req.token = token; 
        req.ip = ip;

        // Logging user activity
        const logData = {
            userId: user.id,
            sourceIp: ip,
            jwtToken: token,
            loginAt: new Date(),
            createdAt: new Date(),
        };
        const existingLog = await UserLogService.getUserLogById(user.id);
        if (!existingLog) {
            await UserLogService.createUserLog(logData);
        } else {
            await UserLogService.updateUserLog(existingLog.id, {
                sourceIp: ip,
                loginAt: new Date(),
                jwtToken: token,
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
    }
};

module.exports = authMiddleware;
