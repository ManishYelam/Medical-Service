const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const securityConfig = require('../../Config/Setting/security.config.js');

const app = express();

module.exports = () => {
  app
  .use(express.json())
  .use(cors()) 
  .use(helmet())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(
    session({
      secret: process.env.SESSION_SECRET || 'yourSecretKey',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
    })
  )
  .use(securityConfig)
  
  return app;
};
