const express = require('express');
const userRouter = require('./userRoutes');
const router = express.Router();

// const adminRoutes = require('./admin.routes');
// const userRoutes = require('./user.routes');
// const projectRoutes = require('./project.routes');
// const emailRoutes = require('./email.Routes');
// const RoleRouter = require('./role.Routes');

router
  .use('/user', userRouter)
  // .use('/role', RoleRouter)
  // .use('/admin', adminRoutes)
  // .use('/user', userRoutes)
  // .use('/project', projectRoutes)
  // .use('/emails', emailRoutes)

module.exports = router;
