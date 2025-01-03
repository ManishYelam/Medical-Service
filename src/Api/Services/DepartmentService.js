const { Sequelize } = require('sequelize');
const { loadModels } = require('../Models/ModelOperator/LoadModels');

module.exports = {
  createDepartment: async (health_id, data) => {
    const { Department } = await loadModels(health_id);
    return await Department.create(data);
  },

  bulkCreateDepartments: async (health_id, data) => {
    const { Department } = await loadModels(health_id);
    return await Department.bulkCreate(data);
  },

  getAllDepartments: async (
    health_id,
    queryParams = {},
    search = '',
    page = 1,
    pageSize = 10,
    sortBy = 'name',
    sortOrder = 'ASC'
  ) => {
    try {
      const { Department } = await loadModels(health_id);

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const filterConditions = {};

      Object.keys(queryParams).forEach((key) => {
        const value = queryParams[key];
        if (value !== undefined && value !== null) {
          filterConditions[key] = {
            [Sequelize.Op.like]: `%${value}%`,
          };
        }
      });

      let searchConditions = [];
      if (search) {
        searchConditions = [
          { name: { [Sequelize.Op.like]: `%${search}%` } },
          { head_of_department: { [Sequelize.Op.like]: `%${search}%` } },
          { email: { [Sequelize.Op.like]: `%${search}%` } },
        ];
      }

      const whereConditions = {
        ...filterConditions,
        ...(searchConditions.length > 0 && {
          [Sequelize.Op.or]: searchConditions,
        }),
      };

      const validSortFields = Object.keys(Department.rawAttributes);
      if (!validSortFields.includes(sortBy)) {
        throw new Error(
          `Invalid sortBy value: ${sortBy}. Allowed fields are: ${validSortFields.join(', ')}`
        );
      }
      if (!['ASC', 'DESC'].includes(sortOrder)) {
        throw new Error(`Invalid sortOrder value: ${sortOrder}`);
      }

      const order = [[sortBy, sortOrder]];

      const departments = await Department.findAll({
        where: whereConditions,
        offset,
        limit,
        order,
      });

      const totalDepartments = await Department.count({
        where: whereConditions,
      });

      return {
        departments,
        totalDepartments,
        page,
        pageSize,
        totalPages: Math.ceil(totalDepartments / pageSize),
      };
    } catch (error) {
      throw new Error('Error fetching departments: ' + error.message);
    }
  },

  getDepartmentById: async (health_id, id) => {
    const { Department } = await loadModels(health_id);
    return await Department.findByPk(id);
  },

  updateDepartment: async (health_id, id, data) => {
    const { Department } = await loadModels(health_id);
    const department = await Department.findByPk(id);
    if (!department) {
      throw new Error('Department not found');
    }
    return await department.update(data);
  },

  deleteDepartment: async (health_id, id) => {
    const { Department } = await loadModels(health_id);
    const department = await Department.findByPk(id);
    if (!department) {
      throw new Error('Department not found');
    }
    return await department.destroy();
  },
};
