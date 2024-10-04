require('dotenv').config();

const BASE_URLS = {
  development: 'http://localhost:3000',
  production: 'https://your-production-url.com',
  staging: 'https://your-staging-url.com',

  API: process.env.API_BASE_URL || 'http://localhost:5000/api',
  AUTH: process.env.AUTH_BASE_URL || 'http://localhost:5000/api/auth',
  USERS: process.env.USERS_BASE_URL || 'http://localhost:5000/api/users',
  PROJECTS: process.env.PROJECTS_BASE_URL || 'http://localhost:5000/api/projects',
  ADMIN: process.env.ADMIN_BASE_URL || 'http://localhost:5000/api/admin',
  MESSAGES: process.env.MESSAGES_BASE_URL || 'http://localhost:5000/api/messages',
};

module.exports = BASE_URLS;
