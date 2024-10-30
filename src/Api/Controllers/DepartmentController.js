const departmentService = require('../Services/DepartmentService');

class DepartmentController {
    async createDepartment(req, res) {
        try {
            const data = req.body;
            const department = await departmentService.createDepartment(data);
            res.status(201).json(department);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllDepartments(req, res) {
        try {
            const departments = await departmentService.getAllDepartments();
            res.status(200).json(departments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getDepartmentById(req, res) {
        try {
            const { id } = req.params;
            const department = await departmentService.getDepartmentById(id);
            if (!department) {
                return res.status(404).json({ message: 'Department not found' });
            }
            res.status(200).json(department);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateDepartment(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const department = await departmentService.updateDepartment(id, data);
            res.status(200).json(department);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteDepartment(req, res) {
        try {
            const { id } = req.params;
            await departmentService.deleteDepartment(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new DepartmentController();
