const { DatabaseOperator } = require('../../../Config/Database/DatabaseOperator');

module.exports = {
    fetchModelData: async (health_id, modelType, modelKey, filters = {}, page = 1, limit = 10) => {
        try {
            console.log(`✨ Received Health ID: ${health_id} ✨`);

            const data = await DatabaseOperator(health_id);
            if (data.error) {
                return { error: `Error in ${modelType}: ${data.error}` };
            }

            const userModel = data[modelKey];
            const deptKey = userModel.deptKey;
            const deptModel = userModel.deptModel;
            const Model = deptModel[modelKey];

            console.log(`✨ Performing 'findAll' on ${modelType} with pagination...✨ `);
            console.log(`✨ Department Key: ✨`, deptKey);
            console.log(`✨ Department Model: ✨`, deptModel);
            console.log(`✨ Type of ${modelType}: ✨`, typeof Model);
            console.log(`✨ ${modelType} Content: ✨`, Model);

            // Ensure that page and limit are integers
            page = parseInt(page, 10);
            limit = parseInt(limit, 10);

            // Calculate offset for pagination
            const offset = (page - 1) * limit;

            // Apply filters and pagination (if any)
            const modelData = await Model.findAll({
                where: filters,
                limit: limit,
                offset: offset
            });

            // Get the total count of records without pagination
            const totalCount = await Model.count({
                where: filters
            });

            return {
                data: modelData,
                totalCount: totalCount
            };

        } catch (error) {
            console.error(`Error performing 'findAll' on ${modelType}:`, error.message);
            return { error: error.message };
        }
    }
};


// module.exports.UserModel = async (health_id) => await fetchModelData(health_id, 'User', 'User');
// module.exports.UserLogModel = async (health_id) => await fetchModelData(health_id, 'UserLog', 'UserLog');
// module.exports.RoleModel = async (health_id) => await fetchModelData(health_id, 'Role', 'Role');
// module.exports.PermissionModel = async (health_id) => await fetchModelData(health_id, 'Permission', 'Permission');
// module.exports.RolePermissionsModel = async (health_id) => await fetchModelData(health_id, 'RolePermissions', 'RolePermissions');
// module.exports.DepartmentModel = async (health_id) => await fetchModelData(health_id, 'Department', 'Department');
