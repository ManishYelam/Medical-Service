// const models = require("../../Config/Database/centralModelLoader");

const { loadModels } = require("../Models/ModelOperator/LoadModels");

// const { DepartmentModel } = require("../Models/ModelOperator/DataModel");

// const Department = models.MAIN.Department;

// const Department = DepartmentModel();

class DepartmentService {
    async createDepartment(data) {
        return await Department.create(data);
    }

    async createDepartmentsBulk(health_id,data) {
        const { Department } = await loadModels(health_id);
        return await Department.bulkCreate(data);
    }

    async getAllDepartments() {
        return await Department.findAll();
    }

    async getDepartmentById(id) {
        return await Department.findByPk(id);
    }

    async updateDepartment(id, data) {
        const department = await Department.findByPk(id);
        if (!department) {
            throw new Error('Department not found');
        }
        return await department.update(data);
    }

    async deleteDepartment(id) {
        const department = await Department.findByPk(id);
        if (!department) {
            throw new Error('Department not found');
        }
        return await department.destroy();
    }
}

module.exports = new DepartmentService();
