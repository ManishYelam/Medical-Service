const MedicineService = require('../Services/medicineService');
const { createMedicineValidation, updateMedicineValidation, queryMedicineValidation } = require('../Middlewares/Validation/medicineValidation');
const { deleteFile } = require('../../../Helpers/fileHelper');
const { parseCSV } = require('../../../Helpers/excelHelper');

module.exports = {
  createMedicine: async (req, res) => {
    try {
      const { error } = createMedicineValidation.validate(req.body);
      if (error)
        return res.status(400).json({
          name: 'Error',
          status: false,
          code: 400,
          message: error.details[0].message,
        });

      const medicine = await MedicineService.createMedicine(req.body);
      res.status(201).json({
        name: 'OK',
        status: true,
        code: 201,
        medicine,
      });
    } catch (err) {
      res.status(500).json({
        name: 'Error',
        status: false,
        code: 500,
        message: 'Internal server error',
        error: err.message,
      });
    }
  },

  updateMedicine: async (req, res) => {
    try {
      const { error } = updateMedicineValidation.validate(req.body);
      if (error)
        return res.status(400).json({
          name: 'Error',
          status: false,
          code: 400,
          message: error.details[0].message,
        });

      const medicine = await MedicineService.updateMedicine(
        req.params.id,
        req.body
      );
      res.status(200).json({
        name: 'OK',
        status: true,
        code: 200,
        result: medicine,
      });
    } catch (err) {
      res.status(500).json({
        name: 'Error',
        status: false,
        code: 500,
        message: 'Internal server error',
        error: err.message,
      });
    }
  },

  queryMedicines: async (req, res) => {
    try {
      const { error } = queryMedicineValidation.validate(req.query);
      if (error)
        return res.status(400).json({
          name: 'Error',
          status: false,
          code: 400,
          message: error.details[0].message,
        });

      const filters = req.query;
      const medicines = await MedicineService.queryMedicines(filters);
      res.status(200).json({
        name: 'OK',
        status: true,
        code: 200,
        result: medicines,
      });
    } catch (err) {
      res.status(500).json({
        name: 'Error',
        status: false,
        code: 500,
        message: 'Internal server error',
        error: err.message,
      });
    }
  },

  getMedicineById: async (req, res) => {
    try {
      const medicine = await MedicineService.getMedicineById(req.params.id);
      if (!medicine)
        return res.status(404).json({
          name: 'Error',
          status: false,
          code: 404,
          message: 'Medicine not found',
        });

      res.status(200).json({
        name: 'OK',
        status: true,
        code: 200,
        data: medicine,
      });
    } catch (err) {
      res.status(500).json({
        name: 'Error',
        status: false,
        code: 500,
        message: 'Internal server error',
        error: err.message,
      });
    }
  },

  deleteMedicine: async (req, res) => {
    try {
      const result = await MedicineService.deleteMedicine(req.params.id);
      if (!result)
        return res.status(404).json({
          name: 'Error',
          status: false,
          code: 404,
          message: 'Medicine not found',
        });

      res.status(200).json({
        name: 'OK',
        status: true,
        code: 200,
        message: 'Medicine deleted successfully',
        result: result,
      });
    } catch (err) {
      res.status(500).json({
        name: 'Error',
        status: false,
        code: 500,
        message: 'Internal server error',
        error: err.message,
      });
    }
  },

  bulkCreateMedicines: async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({
            name: 'Error',
            status: false,
            code: 400,
            message: 'No file uploaded',
          });
      }

      const rows = await parseCSV(req.file.path);
      deleteFile(req.file.path);

      const parseData = (row) => {
        const [day, month, year] = row.expiry_date.split('-');
        const formattedExpiryDate = new Date(`${year}-${month}-${day}`).toISOString();

        return {
          pharmacy_id: parseInt(row.pharmacy_id, 10),
          medicine_name: row.medicine_name,
          generic_name: row.generic_name,
          description: row.description,
          manufacturer: row.manufacturer,
          price: parseFloat(row.price),
          quantity: parseInt(row.quantity, 10),
          expiry_date: formattedExpiryDate,
          side_effects: row.side_effects || null,
          contraindications: row.contraindications || null,
          dosage: row.dosage || null,
          instructions: row.instructions || null,
          health_issues: row.health_issues ? row.health_issues.split('|') : [],
          diseases_treated: row.diseases_treated ? row.diseases_treated.split('|') : [],
          barcode: row.barcode?.toString() || null,
          import_source: row.import_source || null,
          regulatory_approvals: row.regulatory_approvals || null,
          storage_conditions: row.storage_conditions || null,
          available_in_stock: row.available_in_stock?.toUpperCase() === 'TRUE',
        };
      };

      const medicines = [];
      const errors = [];

      rows.forEach((row, index) => {
        try {
          const parsedRow = parseData(row);
          const { error } = createMedicineValidation.validate(parsedRow);

          if (error) {
            errors.push({
              row: index + 1,
              error: error.details[0]?.message || 'Unknown validation error',
            });
          } else {
            medicines.push(parsedRow);
          }
        } catch (parseError) {
          errors.push({
            row: index + 1,
            error: `Error parsing row: ${parseError.message}`,
          });
        }
      });

      if (errors.length > 0) {
        return res.status(400).json({
          name: 'Error',
          status: false,
          code: 400,
          message: 'Some rows have validation errors',
          errors,
        });
      }

      const medicinesResult =
        await MedicineService.bulkCreateMedicines(medicines);

      return res.status(201).json({
        name: 'OK',
        status: true,
        code: 201,
        message: 'Medicines uploaded successfully',
        result: {
          file: req.file,
          medicines: medicinesResult,
          count: medicines.length,
          message: 'Medicines data processed and saved successfully.',
        },
      });
    } catch (err) {
      console.error('Error in bulkCreateMedicines:', err);
      return res.status(500).json({
        name: 'Error',
        status: false,
        code: 500,
        message: 'Internal server error',
        error: err.message,
      });
    }
  },
};
