const { getInstanceByKey } = require('./departmentMapping');
const models = require('./centralModelLoader');

module.exports = {
    DatabaseOperator: async (health_id) => {
        const data = {};

        const deptKey = getInstanceByKey(health_id);
        if (!deptKey) { return { error: 'Invalid department code.' }; }

        const deptModel = models[deptKey];
        if (!deptModel) { return { error: 'No model found for the specified department.' }; }

        const deptModelEntries = Object.entries(deptModel);

        if (deptModelEntries.length === 0) { return { error: 'No elements found in the department model.' }; }

        deptModelEntries.forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                data[key] = { deptKey, deptModel, table: value };
            } else {
                data[key] = { deptKey, deptModel, value };
            }
        });
        return data;
    },

    UserModel: async health_id => {
        try {
            const data = await DatabaseOperator(health_id);
            if (data.error) {
                console.log('Error:', data.error);
                return;
            }
            const userModel = data.User;
            const deptKey = userModel.deptKey;
            const deptModel = userModel.deptModel;

            const UserLog = deptModel.User;
            console.log("....", deptKey, "....", deptModel, "....type", typeof UserLog, "....User Content:", UserLog);

            const UserData = await UserLog.findAll();
            console.log('User Data:', UserData);
        } catch (error) {
            console.error('Error fetching data from User model:', error.message);
        }
    },

    UserLogModel: async health_id => {
        try {
            const data = await DatabaseOperator(health_id);
            if (data.error) {
                console.log('Error:', data.error);
                return;
            }
            const userModel = data.UserLog;
            const deptKey = userModel.deptKey;
            const deptModel = userModel.deptModel;

            const UserLog = deptModel.UserLog;
            console.log("....", deptKey, "....", deptModel, "....type", typeof UserLog, "....User Content:", UserLog);

            const UserLogData = await UserLog.findAll();
            console.log('User Data:', UserLogData);
        } catch (error) {
            console.error('Error fetching data from User model:', error.message);
        }
    },

    RoleModel: async health_id => {
        try {
            const data = await DatabaseOperator(health_id);
            if (data.error) {
                console.log('Error:', data.error);
                return;
            }
            const userModel = data.Role;
            const deptKey = userModel.deptKey;
            const deptModel = userModel.deptModel;

            const Role = deptModel.Role;
            console.log("....", deptKey, "....", deptModel, "....type", typeof Role, "....User Content:", Role);

            const RoleData = await Role.findAll();
            console.log('User Data:', RoleData);
        } catch (error) {
            console.error('Error fetching data from User model:', error.message);
        }
    },

    PermissionModel: async health_id => {
        try {
            const data = await DatabaseOperator(health_id);
            if (data.error) {
                console.log('Error:', data.error);
                return;
            }
            const userModel = data.Permission;
            const deptKey = userModel.deptKey;
            const deptModel = userModel.deptModel;

            const Permission = deptModel.Permission;
            console.log("....", deptKey, "....", deptModel, "....type", typeof Permission, "....User Content:", Permission);

            const PermissionData = await Permission.findAll();
            console.log('User Data:', PermissionData);
        } catch (error) {
            console.error('Error fetching data from User model:', error.message);
        }
    },

    RolePermissionsModel: async health_id => {
        try {
            const data = await DatabaseOperator(health_id);
            if (data.error) {
                console.log('Error:', data.error);
                return;
            }
            const userModel = data.RolePermissions;
            const deptKey = userModel.deptKey;
            const deptModel = userModel.deptModel;

            const RolePermissions = deptModel.RolePermissions;
            console.log("....", deptKey, "....", deptModel, "....type", typeof RolePermissions, "....User Content:", RolePermissions);

            const RolePermissionsData = await RolePermissions.findAll();
            console.log('User Data:', RolePermissionsData);
        } catch (error) {
            console.error('Error fetching data from User model:', error.message);
        }
    },

    DepartmentModel: async health_id => {
        try {
            const data = await DatabaseOperator(health_id);
            if (data.error) {
                console.log('Error:', data.error);
                return;
            }
            const userModel = data.Department;
            const deptKey = userModel.deptKey;
            const deptModel = userModel.deptModel;

            const Department = deptModel.Department;
            console.log("....", deptKey, "....", deptModel, "....type", typeof Department, "....User Content:", Department);

            const DepartmentData = await Department.findAll();
            console.log('User Data:', DepartmentData);
        } catch (error) {
            console.error('Error fetching data from User model:', error.message);
        }
    },

}
