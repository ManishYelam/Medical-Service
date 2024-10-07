const authorizationMiddleware = (requiredRoles = [], requiredPermissions = []) => {
    return (req, res, next) => {
        const user = req.user; // The user is added to the request by the `authMiddleware`

        if (!user) {
            return res.status(403).json({ message: 'Access forbidden. No user found.' });
        }

        const userRoles = user.role ? [user.role.name] : [];
        const userPermissions = user.role ? user.role.permissions.map(p => p.name) : [];

        const hasRequiredRole = requiredRoles.length === 0 || requiredRoles.some(role => userRoles.includes(role));
        const hasRequiredPermission = requiredPermissions.length === 0 || requiredPermissions.some(permission => userPermissions.includes(permission));

        if (!hasRequiredRole || !hasRequiredPermission) {
            return res.status(403).json({ message: 'Access forbidden. You do not have the required role or permission.' });
        }

        next(); // User has required roles/permissions, proceed to the next middleware or route handler
    };
};

module.exports = authorizationMiddleware;
