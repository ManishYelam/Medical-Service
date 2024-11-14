const models = require("../../Config/Database/centralModelLoader");

const Department = models.MAIN.Department;

class DepartmentService {
    async createDepartment(data) {
        return await Department.create(data);
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
