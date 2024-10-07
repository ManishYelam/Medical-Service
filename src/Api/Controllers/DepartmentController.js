const departmentService = require('../Services/DepartmentService');

class DepartmentController {
    async createDepartment(req, res) {
        try {
            const newDepartment = await departmentService.createDepartment(req.body);
            res.status(201).json(newDepartment);
        } catch (error) {
            res.status(500).json({ message: error.message });
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
            const department = await departmentService.getDepartmentById(req.params.id);
            if (!department) return res.status(404).json({ message: 'Department not found' });
            res.status(200).json(department);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateDepartment(req, res) {
        try {
            const updatedDepartment = await departmentService.updateDepartment(req.params.id, req.body);
            if (updatedDepartment[0] === 0) return res.status(404).json({ message: 'Department not found' });
            res.status(200).json({ message: 'Department updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteDepartment(req, res) {
        try {
            const deleted = await departmentService.deleteDepartment(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Department not found' });
            res.status(200).json({ message: 'Department deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new DepartmentController();

