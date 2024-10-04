const { sequelize } = require('../../../config/database/db.config');
const { User } = require('../User');
const { Department } = require('../Department');
const { Role } = require('../Department');
const { Permission} = require('../Permission')


const seedData = async () => {
    try {
        await sequelize.sync({ force: true }); // Clear database for seeding

        // Seed Departments
        const departments = await Department.bulkCreate([
            { name: 'Human Resources' },
            { name: 'Finance' },
            { name: 'Engineering' },
            { name: 'Marketing' },
            { name: 'Sales' }
        ]);

        console.log('Departments seeded: ', departments);

        // Seed Roles
        const roles = await Role.bulkCreate([
            { name: 'Admin' },
            { name: 'User' },
            { name: 'Manager' },
            { name: 'Employee' }
        ]);

        console.log('Roles seeded: ', roles);

        // Seed Permissions
        const permissions = await Permission.bulkCreate([
            { name: 'create_user' },
            { name: 'edit_user' },
            { name: 'delete_user' },
            { name: 'view_user' },
            { name: 'create_department' },
            { name: 'edit_department' },
            { name: 'delete_department' },
            { name: 'view_department' }
        ]);

        console.log('Permissions seeded: ', permissions);

        // Seed Users
        const users = await User.bulkCreate([
            {
                username: 'admin1',
                email: 'admin1@example.com',
                password: 'admin123', // Hash the password in production
                role_id: 1,
                department_id: 1,
                status: 'active'
            },
            {
                username: 'user1',
                email: 'user1@example.com',
                password: 'user123', // Hash the password in production
                role_id: 2,
                department_id: 2,
                status: 'active'
            },
            {
                username: 'manager1',
                email: 'manager1@example.com',
                password: 'manager123', // Hash the password in production
                role_id: 3,
                department_id: 3,
                status: 'active'
            },
            {
                username: 'employee1',
                email: 'employee1@example.com',
                password: 'employee123', // Hash the password in production
                role_id: 4,
                department_id: 4,
                status: 'active'
            }
        ]);

        console.log('Users seeded: ', users);

        // Assign permissions to roles
        const role = await Role.findOne({ where: { name: 'Admin' } });
        const permissionList = await Permission.findAll();
        await role.addPermissions(permissionList);

        console.log('Permissions assigned to Admin role');
    } catch (error) {
        console.error('Error seeding data: ', error);
    } finally {
        sequelize.close();
    }
};

seedData();
