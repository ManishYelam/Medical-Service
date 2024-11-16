const { DatabaseOperator } = require('../../../Config/Database/DatabaseOperator');

module.exports = {
    UserModel: async health_id => {
        try {
            console.log("........", health_id, data);
            const data = await DatabaseOperator("MEDSRV578672");
            if (data.error) {
                console.log('Error:', data.error);
                return;
            }
            const userModel = data.User;
            const deptKey = userModel.deptKey;
            const deptModel = userModel.deptModel;

            const User = deptModel.User;
            console.log("....", deptKey, "....", deptModel, "....type", typeof User, "....User Content:", User);

            const UserData = await User.findAll();
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
            console.log("....", deptKey,);
            console.log("....", deptModel,);
            console.log("....", typeof UserLog,);
            console.log("....", UserLog,);

            return UserLog
        } catch (error) {
            console.error('Error fetching data:', error.message);
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
            const data = await DatabaseOperator('PHARMA437293');
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
            const data = await DatabaseOperator('PHARMA437293');
            if (data.error) {
                console.log('Error:', data.error);
                return;
            }
            const userModel = data.Department;
            const deptKey = userModel.deptKey;
            const deptModel = userModel.deptModel;

            const RolePermissions = deptModel.Department;
            console.log("....", deptKey, "....", deptModel, "....type", typeof Department, "....User Content:", RolePermissions);

            const DepartmentData = await RolePermissions.findAll();
            console.log('User Data:', DepartmentData);
        } catch (error) {
            console.error('Error fetching data from User model:', error.message);
        }
    },

}

// const UserLogModel = async health_id => {
//     try {
//         const data = await DatabaseOperator("MEDSRV718079");
//         if (data.error) {
//             console.log('Error:', data.error);
//             return;
//         }
//         const userModel = data.UserLog;
//         const deptKey = userModel.deptKey;
//         const deptModel = userModel.deptModel;

//         const UserLog = deptModel.UserLog;
//         console.log("....", deptKey,);
//         console.log("....", deptModel,);
//         console.log("....", typeof UserLog,);
//         console.log("....", UserLog,);

//         return UserLog
//     } catch (error) {
//         console.error('Error fetching data:', error.message);
//     }
// }
// module.exports = { UserLogModel }