const { sequelize } = require("../../../../Config/Database/db.config");
const { User, Role, Permission, RolePermissions, } = require("./Association");

module.exports = {
  InitializeDatabase: async () => {
    try {
      sequelize.PHARMACY_DB_NAME.sync();
      // sequelize.PHARMACY_DB_NAME.drop();
      console.log('Database & tables created!');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  },
};
