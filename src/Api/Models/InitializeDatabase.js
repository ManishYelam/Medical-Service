const { sequelize } = require("../../Config/Database/db.config");
const { User, Role, Department, Permission } = require("./Association");

module.exports = {
  InitializeDatabase: async () => {
    try {
      await Department.sync();
      await Permission.sync();
      await Role.sync();
      await User.sync();
      console.log('Database & tables created!');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  },
};


