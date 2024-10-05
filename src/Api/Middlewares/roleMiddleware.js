const Role = require('../models/Roles/Role');

const roleMiddleware = (requiredPermissions) => {
  return async (req, res, next) => {
    const userRole = await Role.findOne({ where: { id: req.user.roleId } });

    if (!userRole) {
      return res.status(403).send('Access denied.');
    }

    const hasPermission = requiredPermissions.every(permission => userRole.permissions[permission]);

    if (hasPermission) {
      next();
    } else {
      res.status(403).send('Access denied.');
    }
  };
};

module.exports = roleMiddleware;
