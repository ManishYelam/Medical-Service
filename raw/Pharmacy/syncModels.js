const sequelize = require('../config/database');
const Regulation = require('./Regulation');
const Role = require('./Role');
const User = require('./User');

// Define associations
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

Regulation.belongsTo(Role, { foreignKey: 'role_id' });
Regulation.belongsTo(User, { foreignKey: 'approved_by', as: 'approver' });
Regulation.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Regulation.belongsTo(User, { foreignKey: 'modified_by', as: 'modifier' });

// Sync all models
const syncModels = async () => {
    try {
        await sequelize.sync({ force: false }); // Change to true for dropping tables on sync
        console.log("All models synced successfully.");
    } catch (error) {
        console.error("Error syncing models:", error);
    }
};

syncModels();

module.exports = { Regulation, Role, User };
