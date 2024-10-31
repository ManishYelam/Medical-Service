const express = require('express');
const authRouter = require('./authRoutes');
const roleRouter = require('./roleRoutes');
const permissionRouter = require('./permissionRoutes');
const userRouter = require('./userRoutes');
const userLogRouter = require('./userLogRoutes');
const departmentRouter = require('./departmentRoutes');
const totpRouter = require('./TotpRoutes');
const authMiddleware = require('../Middlewares/authorizationMiddleware');
const uploadMiddleware = require('../Middlewares/uploadMiddleware');
const { uploadMedia } = require('../Controllers/mediaController');

const router = express.Router();

router
  .use('/', authRouter)
  .use('/roles', authMiddleware,roleRouter)
  .use('/permissions', authMiddleware, permissionRouter)
  .use('/users', userRouter)
  .use('/user_logs', authMiddleware, userLogRouter)
  .use('/departments', authMiddleware, departmentRouter)
  .use('/totp', authMiddleware, totpRouter)
  .post('/upload/:category/:isMultiple', authMiddleware, uploadMiddleware, uploadMedia);

module.exports = router;
