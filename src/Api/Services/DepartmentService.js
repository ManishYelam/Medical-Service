// const models = require("../../Config/Database/centralModelLoader");

const { loadModels } = require('../Models/ModelOperator/LoadModels');

// const { DepartmentModel } = require("../Models/ModelOperator/DataModel");

// const Department = models.MAIN.Department;

// const Department = DepartmentModel();

class DepartmentService {
  async createDepartment(data) {
    return await Department.create(data);
  }

  async bulkCreateDepartments(health_id, data) {
    const { Department } = await loadModels(health_id);
    return await Department.bulkCreate(data);
  }

  getAllDepartments = async (
    health_id,
    queryParams = {},
    search = '',
    page = 1,
    pageSize = 10,
    sortBy = 'name',
    sortOrder = 'ASC'
  ) => {
    console.log(health_id, queryParams, search, page, pageSize, sortBy, sortOrder);
    
    try {
      const { Department } = await loadModels(health_id);
      
      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const filterConditions = {};

      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key]) {
          if (typeof queryParams[key] === 'string') {
            filterConditions[key] = {
              [Sequelize.Op.iLike]: `%${queryParams[key]}%`,
            };
          } else {
            filterConditions[key] = queryParams[key];
          }
        }
      });

      let searchConditions = [];
      if (search) {
        searchConditions = [
          { name: { [Sequelize.Op.iLike]: `%${search}%` } },
          { head_of_department: { [Sequelize.Op.iLike]: `%${search}%` } },
          { email: { [Sequelize.Op.iLike]: `%${search}%` } },
        ];
      }

      const whereConditions = {
        ...filterConditions,
        [Sequelize.Op.or]:
          searchConditions.length > 0 ? searchConditions : undefined,
      };

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
  };

  async getDepartmentById(health_id,id) {
    const { Department } = await loadModels(health_id);
    return await Department.findByPk(id);
  }

  async updateDepartment(id, data) {
    const department = await Department.findByPk(id);
    if (!department) {
      throw new Error('Department not found');
    }
    return await department.update(data);
  }

  async deleteDepartment(health_id,id) {
    const { Department } = await loadModels(health_id);
    const department = await Department.findByPk(id);
    if (!department) {
      throw new Error('Department not found');
    }
    return await department.destroy();
  }
}

module.exports = new DepartmentService();
