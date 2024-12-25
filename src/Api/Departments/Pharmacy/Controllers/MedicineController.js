const MedicineService = require('../Services/medicineService');
const { createMedicineValidation, updateMedicineValidation, queryMedicineValidation } = require('../Middlewares/Validation/medicineValidation');
const { deleteFile } = require('../../../Helpers/fileHelper');
const { parseCSV } = require('../../../Helpers/excelHelper');

module.exports = {
    createMedicine: async (req, res) => {
        try {
            const { error } = createMedicineValidation.validate(req.body);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const medicine = await MedicineService.createMedicine(req.body);
            res.status(201).json(medicine);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    updateMedicine: async (req, res) => {
        try {
            const { error } = updateMedicineValidation.validate(req.body);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const medicine = await MedicineService.updateMedicine(req.params.id, req.body);
            res.status(200).json(medicine);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    queryMedicines: async (req, res) => {
        try {
            const { error } = queryMedicineValidation.validate(req.query);
            if (error) return res.status(400).json({ message: error.details[0].message });

            const filters = req.query;
            const medicines = await MedicineService.queryMedicines(filters);
            res.status(200).json(medicines);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getMedicineById: async (req, res) => {
        try {
            const medicine = await MedicineService.getMedicineById(req.params.id);
            if (!medicine) return res.status(404).json({ message: 'Medicine not found' });

            res.status(200).json(medicine);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteMedicine: async (req, res) => {
        try {
            const result = await MedicineService.deleteMedicine(req.params.id);
            if (!result) return res.status(404).json({ message: 'Medicine not found' });

            res.status(200).json({ message: 'Medicine deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },


    bulkCreateMedicines: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }
    
            const rows = await parseCSV(req.file.path);
            console.log(rows);
    
            deleteFile(req.file.path);
    
            const parseData = (row) => {
                const [day, month, year] = row.expiry_date.split('-');
                const formattedExpiryDate = new Date(`${year}-${month}-${day}`).toISOString();
    
                const health_issues = row.health_issues ? row.health_issues.split('|') : [];
                const diseases_treated = row.diseases_treated ? row.diseases_treated.split('|') : [];
    
                const availableInStock = row.available_in_stock && row.available_in_stock.toUpperCase() === 'true';
    
                return {
                    pharmacy_id: parseInt(row.pharmacy_id, 10),
                    medicine_name: row.medicine_name,
                    generic_name: row.generic_name,
                    description: row.description,
                    manufacturer: row.manufacturer,
                    price: parseFloat(row.price),
                    quantity: parseInt(row.quantity, 10),
                    expiry_date: formattedExpiryDate,
                    side_effects: row.side_effects,
                    contraindications: row.contraindications,
                    dosage: row.dosage,
                    instructions: row.instructions,
                    health_issues,
                    diseases_treated,
                    barcode: row.barcode.toString(),
                    import_source: row.import_source,
                    regulatory_approvals: row.regulatory_approvals,
                    storage_conditions: row.storage_conditions,
                };
            };
    
            const medicines = [];
            const errors = [];
    
            rows.forEach((row, index) => {
                const parsedRow = parseData(row);
    
                const { error } = createMedicineValidation.validate(parsedRow);
                if (error) {
                    errors.push({ row: index + 1, error: error.details[0].message });
                } else {
                    medicines.push(parsedRow);
                }
            });
    
            if (errors.length > 0) {
                return res.status(400).json({
                    message: 'Some rows have validation errors',
                    errors,
                });
            }
    
            const medicinesResult = await MedicineService.bulkCreateMedicines(medicines);
    
            return res.status(201).json({
                message: 'Medicines uploaded successfully',
                result: {
                    file: req.file,
                    medicines: medicinesResult,
                    count: medicines.length,
                    message: 'Medicines data processed and saved successfully.',
                },
            });
            
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error', error: err.message });
        }
    },    

};