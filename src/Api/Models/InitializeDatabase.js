const { sequelize } = require("../../Config/Database/db.config");
const { User, UserLog, Role, Permission, RolePermissions, Department } = require("./Association");

module.exports = {
  InitializeDatabase: async () => {
    try {
      sequelize.MAIN_DB_NAME.sync();
      // sequelize.COMPLIANCE_LEGAL_DB_NAME.sync();
      // sequelize.CUSTOMER_SUPPORT__DB_NAME.sync();
      // sequelize.FINANCE_ACCOUNTING_DB_NAME.sync();
      // sequelize.HEALTHCARE_DB_NAME.sync();
      // sequelize.HR_DB_NAME.sync();
      // sequelize.INVENTORY_MANAGEMENT_DB_NAME.sync();
      // sequelize.IT_DEVELOPMENT_DB_NAME.sync();
      // sequelize.LOGISTIC_DB_NAME.sync();
      // sequelize.PARTNERSHIP_DB_NAME.sync();
      // sequelize.PHARMACY_DB_NAME.sync();
      // sequelize.SALES_MARKETING.sync();

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
      // sequelize.SALES_MARKETING.drop();

      console.log('Database & tables created!');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  },
};
