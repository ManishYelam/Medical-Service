const express = require('express');
const userRouter = require('./userRoutes');
const serviceRoutes = require('./serviceRoutes');
const roleRouter = require('./roleRoutes');
const departmentRouter = require('./departmentRoutes');
const permissionRouter = require('./permissionRoutes');

const router = express.Router();

// const adminRoutes = require('./admin.routes');
// const userRoutes = require('./user.routes');
// const projectRoutes = require('./project.routes');
// const emailRoutes = require('./email.Routes');
// const RoleRouter = require('./role.Routes');

router
  .use('/api', serviceRoutes)
  .use('/users', userRouter)
  .use('/roles', roleRouter)
  .use('/departments', departmentRouter)
  .use('/permissions', permissionRouter)
// .use('/role', RoleRouter)
// .use('/admin', adminRoutes)
// .use('/user', userRoutes)
// .use('/project', projectRoutes)
// .use('/emails', emailRoutes)

module.exports = router;
