const { sequelize } = require("../../Config/Database/db.config");
const { User, UserLog, Role, Permission, RolePermissions, Department } = require("./Association");

module.exports = {
  InitializeDatabase: async () => {
    try {
      sequelize.MAIN_DB_NAME.sync();
      // sequelize.MAIN_DB_NAME.drop();
      console.log('Database & tables created!');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  },
};


