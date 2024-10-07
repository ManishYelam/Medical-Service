const { Department } = require('../Models/Association');

class DepartmentService {
    async createDepartment(data) {
        return Department.create(data);
    }
    
    async getAllDepartments() {
        return Department.findAll();
    }

    async getDepartmentById(id) {
        return Department.findByPk(id);
    }

    async updateDepartment(id, data) {
        return Department.update(data, { where: { id } });
    }

    async deleteDepartment(id) {
        return Department.destroy({ where: { id } });
    }
}

module.exports = new DepartmentService();
