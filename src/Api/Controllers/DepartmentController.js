const { parseCSV } = require('../Helpers/excelHelper');
const { deleteFile } = require('../Helpers/fileHelper');
const { departmentCreateSchema } = require('../Middlewares/Joi_Validations/deptSchema');
const departmentService = require('../Services/DepartmentService');

module.exports = {
  createDepartment: async (req, res) => {
    try {
      const data = req.body;
      const department = await departmentService.createDepartment(data);
      return res.status(201).json({
        name: `OK`,
        status: true,
        code: 201,
        message: 'Department created successfully',
        data: department,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },

  bulkCreateDepartments: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const rows = await parseCSV(req.file.path);
      deleteFile(req.file.path);

      const parseData = (row) => {
        const [day, month, year] = row.date_founded?.split('-') || [];
        const formattedDateFounded = year
          ? new Date(`${year}-${month}-${day}`).toISOString()
          : null;

        return {
          name: row.name,
          head_of_department: row.head_of_department,
          branch: row.branch,
          branch_of_department: row.branch_of_department,
          contact_number: row.contact_number || null,
          address: row.address,
          email: row.email,
          department_code: row.department_code,
          status: row.status || 'Active',
          date_founded: formattedDateFounded,
          num_employees: parseInt(row.num_employees, 10) || 0,
          description: row.description || null,
          created_by: row.created_by,
          updated_by: row.updated_by,
        };
      };

      const departments = [];
      const errors = [];

      for (const [index, row] of rows.entries()) {
        try {
          const parsedRow = parseData(row);
          const { error } = departmentCreateSchema.validate(parsedRow);

          if (error) {
            errors.push({
              row: index + 1,
              error: error.details[0]?.message || 'Unknown validation error',
            });
          } else {
            departments.push(parsedRow);
          }
        } catch (parseError) {
          errors.push({
            row: index + 1,
            error: `Error parsing row: ${parseError.message}`,
          });
        }
      }

      if (errors.length > 0) {
        return res.status(400).json({
          message: 'Some rows have validation errors',
          errors,
        });
      }

      const deptResult =
        await departmentService.bulkCreateDepartments(departments);

      return res.status(201).json({
        name: 'OK',
        status: true,
        code: 201,
        message: 'Departments uploaded successfully',
        result: {
          file: req.file,
          departments: deptResult,
          count: departments.length,
          message: 'Departments data processed and saved successfully.',
        },
      });
    } catch (err) {
      console.error('Error in bulkCreateDepartments:', err);
      return res.status(500).json({
        name: 'Error',
        status: false,
        code: 500,
        message: 'Internal server error',
        error: err.message,
      });
    }
  },

  getAllDepartments: async (req, res) => {
    try {
      const {
        page = 1,
        pageSize = 10,
        search = '',
        sortBy = 'name',
        sortOrder = 'ASC',
        ...filters
      } = req.query;

      const { departments, totalDepartments, totalPages } =
        await departmentService.getAllDepartments(
          filters,
          search,
          parseInt(page),
          parseInt(pageSize),
          sortBy,
          sortOrder
        );

      res.status(200).json({
        name: `OK`,
        status: true,
        code: 200,
        message: 'Departments fetched successfully',
        data: departments,
        pagination: {
          totalDepartments,
          totalPages,
          currentPage: parseInt(page),
          pageSize: parseInt(pageSize),
        },
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  },

  getDepartmentById: async (req, res) => {
    try {
      const { id } = req.params;
      const department = await departmentService.getDepartmentById(id);

      if (!department) {
        return res.status(404).json({
          status: false,
          code: 404,
          message: 'Department not found',
        });
      }

      return res.status(200).json({
        name: `OK`,
        status: true,
        code: 200,
        message: 'Department fetched successfully',
        data: department,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        code: 500,
        message: 'Internal server error',
        error: error.message,
      });
    }
  },

  updateDepartment: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const department = await departmentService.updateDepartment(id, data);

      if (!department) {
        return res.status(404).json({
          status: false,
          message: 'Department not found',
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Department updated successfully',
        data: department,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  },

  deleteDepartment: async (req, res) => {
    try {
      const { id } = req.params;
      const department = await departmentService.deleteDepartment(id);

      if (!department) {
        return res.status(404).json({
          status: false,
          message: 'Department not found',
        });
      }

      return res.status(204).json({
        status: true,
        message: 'Department deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  },
};
