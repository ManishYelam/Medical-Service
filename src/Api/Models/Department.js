const { DataTypes } = require('sequelize');
const { sequelize } = require('../../Config/Database/db.config');

const departmentAttribute = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    head_of_department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false
    },
    branch_of_department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_number: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    department_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Active'
    },
    date_founded: {
        type: DataTypes.DATE,
        allowNull: true
    },
    num_employees: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

const Department = sequelize.MAIN_DB_NAME.define('Department', departmentAttribute,
    {
        tableName: 'tbl_departments',
        timestamps: true
    });

module.exports = Department;


