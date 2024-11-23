const MedicineService = require('../Services/medicineService');
const { createMedicineValidation, updateMedicineValidation, queryMedicineValidation } = require('../Middlewares/Validation/medicineValidation');

// Create a medicine
async function createMedicine(req, res) {
    try {
        const { error } = createMedicineValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const medicine = await MedicineService.createMedicine(req.body);
        res.status(201).json(medicine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update a medicine
async function updateMedicine(req, res) {
    try {
        const { error } = updateMedicineValidation.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const medicine = await MedicineService.updateMedicine(req.params.id, req.body);
        res.status(200).json(medicine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Query medicines
async function queryMedicines(req, res) {
    try {
        const { error } = queryMedicineValidation.validate(req.query);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const filters = req.query;
        const medicines = await MedicineService.queryMedicines(filters);
        res.status(200).json(medicines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get medicine by ID
async function getMedicineById(req, res) {
    try {
        const medicine = await MedicineService.getMedicineById(req.params.id);
        res.status(200).json(medicine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete medicine
async function deleteMedicine(req, res) {
    try {
        const result = await MedicineService.deleteMedicine(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createMedicine,
    updateMedicine,
    queryMedicines,
    getMedicineById,
    deleteMedicine
};





// const { queryMedicineValidation } = require('../validations/medicineValidation');
// const medicineService = require('../services/medicineService');

// async function queryMedicines(req, res) {
//     try {
//         // Validate query parameters using Joi
//         const { error } = queryMedicineValidation.validate(req.query);
//         if (error) {
//             return res.status(400).json({ message: error.details[0].message });
//         }

//         // Call the service layer to query medicines
//         const medicines = await medicineService.queryMedicines(req.query);

//         if (!medicines.length) {
//             return res.status(404).json({ message: 'No medicines found matching the criteria' });
//         }

//         // Return the medicines in the response
//         res.status(200).json(medicines);
//     } catch (err) {
//         // Handle errors and send a response
//         console.error(err);
//         res.status(500).json({ message: 'Error querying medicines' });
//     }
// }

// module.exports = {
//     queryMedicines
// };























// const path = require('path');
// const fs = require('fs');
// const csv = require('fast-csv');
// const medicineService = require('../services/medicine.service');
// const csvParser = require('../utils/csvParser');
// const { createMedicineValidation, updateMedicineValidation, queryMedicineValidation } = require('../Middlewares/Validation/medicineValidation');

// // Controller to create a single medicine
// async function createMedicine(req, res) {
//     try {
//         const { error } = createMedicineValidation.validate(req.body);
//         if (error) return res.status(400).json({ message: error.details[0].message });

//         const medicine = await medicineService.createMedicine(req.body);
//         res.status(201).json(medicine);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

// // Controller to update a single medicine
// async function updateMedicine(req, res) {
//     try {
//         const { error } = updateMedicineValidation.validate(req.body);
//         if (error) return res.status(400).json({ message: error.details[0].message });

//         const updatedMedicine = await medicineService.updateMedicine(req.params.id, req.body);
//         if (!updatedMedicine) {
//             return res.status(404).json({ success: false, message: 'Medicine not found' });
//         }

//         res.status(200).json({ success: true, data: updatedMedicine });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

// // Controller to query medicines with filters
// async function queryMedicines(req, res) {
//     try {
//         const { error } = queryMedicineValidation.validate(req.query);
//         if (error) return res.status(400).json({ message: error.details[0].message });

//         const filters = req.query;
//         const medicines = await medicineService.queryMedicines(filters);
//         res.status(200).json(medicines);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

// // Controller to fetch a single medicine by ID
// async function getMedicineById(req, res) {
//     try {
//         const medicine = await medicineService.getMedicineById(req.params.id);
//         if (!medicine) {
//             return res.status(404).json({ success: false, message: 'Medicine not found' });
//         }
//         res.status(200).json({ success: true, data: medicine });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

// // Controller to delete a single medicine
// async function deleteMedicine(req, res) {
//     try {
//         const deletedMedicine = await medicineService.deleteMedicine(req.params.id);
//         if (!deletedMedicine) {
//             return res.status(404).json({ success: false, message: 'Medicine not found' });
//         }
//         res.status(200).json({ success: true, message: 'Medicine deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }

// // Controller to upload CSV and create multiple medicines
// const uploadCSV = async (req, res) => {
//     try {
//         // Check if a file is uploaded
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'No file uploaded. Please upload a CSV file.',
//             });
//         }

//         const filePath = path.join(__dirname, '../uploads/', req.file.filename);

//         try {
//             // Use the parseCSV utility to parse the CSV file
//             const medicinesData = await csvParser.parseCSV(filePath);

//             // Map data to correct format (if needed)
//             const formattedData = medicinesData.map((row) => ({
//                 pharmacy_id: row.pharmacy_id,
//                 medicine_name: row.medicine_name,
//                 generic_name: row.generic_name,
//                 description: row.description,
//                 manufacturer: row.manufacturer,
//                 price: parseFloat(row.price),
//                 quantity: parseInt(row.quantity, 10),
//                 expiry_date: row.expiry_date,
//                 side_effects: row.side_effects,
//                 contraindications: row.contraindications,
//                 dosage: row.dosage,
//                 instructions: row.instructions,
//                 health_issues: row.health_issues ? row.health_issues.split('|') : [],
//                 diseases_treated: row.diseases_treated ? row.diseases_treated.split('|') : [],
//                 barcode: row.barcode,
//                 import_source: row.import_source,
//                 regulatory_approvals: row.regulatory_approvals,
//                 storage_conditions: row.storage_conditions,
//                 available_in_stock: row.available_in_stock === 'true'
//             }));

//             // Use the service to create multiple medicines
//             const newMedicines = await medicineService.createMultipleMedicines(formattedData);

//             res.status(201).json({
//                 success: true,
//                 data: newMedicines,
//             });
//         } catch (error) {
//             res.status(500).json({
//                 success: false,
//                 message: `Error creating medicines from CSV: ${error.message}`,
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: `Error processing file: ${error.message}`,
//         });
//     }
// };

// // Controller to fetch all medicines with pagination
// const getAllMedicines = async (req, res) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         const medicines = await medicineService.getAllMedicines(parseInt(page), parseInt(limit));

//         res.status(200).json({
//             success: true,
//             data: medicines.data,
//             pagination: {
//                 total: medicines.total,
//                 currentPage: medicines.currentPage,
//                 totalPages: medicines.totalPages,
//             },
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: `Error fetching medicines: ${error.message}` });
//     }
// };

// module.exports = {
//     createMedicine,
//     updateMedicine,
//     queryMedicines,
//     getMedicineById,
//     deleteMedicine,
//     uploadCSV,
//     getAllMedicines
// };

