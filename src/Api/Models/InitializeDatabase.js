const { sequelize } = require("../../Config/Database/db.config");
const { User, UserLog, Role, Permission, RolePermissions, Department } = require("./Association");

module.exports = {
  InitializeDatabase: async () => {
    try {
      // console.log(sequelize);
      
      // sequelize.MAIN_DB_NAME.sync({ alter: true });
      // sequelize.COMPLIANCE_LEGAL_DB_NAME.sync({ alter: true });
      // sequelize.CUSTOMER_SUPPORT__DB_NAME.sync({ alter: true });
      // sequelize.FINANCE_ACCOUNTING_DB_NAME.sync({ alter: true });
      // sequelize.HEALTHCARE_DB_NAME.sync({ alter: true });
      // sequelize.HR_DB_NAME.sync({ alter: true });
      // sequelize.INVENTORY_MANAGEMENT_DB_NAME.sync({ alter: true });
      // sequelize.IT_DEVELOPMENT_DB_NAME.sync({ alter: true });
      // sequelize.LOGISTIC_DB_NAME.sync({ alter: true });
      // sequelize.PARTNERSHIP_DB_NAME.sync({ alter: true });
      // sequelize.PHARMACY_DB_NAME.sync({ alter: true });
      // sequelize.SALES_MARKETING_DB_NAME.sync({ alter: true });

      // sequelize.MAIN_DB_NAME.drop();
      // sequelize.COMPLIANCE_LEGAL_DB_NAME.drop();
      // sequelize.CUSTOMER_SUPPORT__DB_NAME.drop();
      // sequelize.FINANCE_ACCOUNTING_DB_NAME.drop();
      // sequelize.HEALTHCARE_DB_NAME.drop();
      // sequelize.HR_DB_NAME.drop();
      // sequelize.INVENTORY_MANAGEMENT_DB_NAME.drop();
      // sequelize.IT_DEVELOPMENT_DB_NAME.drop();
      // sequelize.LOGISTIC_DB_NAME.drop();
      // sequelize.PARTNERSHIP_DB_NAME.drop();
      // sequelize.PHARMACY_DB_NAME.drop();
      // sequelize.SALES_MARKETING_DB_NAME.drop();

      console.log('Database & tables created!');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  },
};
