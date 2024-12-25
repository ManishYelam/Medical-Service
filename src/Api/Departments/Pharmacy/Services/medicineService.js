const Medicine = require('../Models/Medicine');

// Create a single medicine
async function createMedicine(data) {
    return await Medicine.create(data);
}

// Update a medicine
async function updateMedicine(id, data) {
    const medicine = await Medicine.findByPk(id);
    if (!medicine) return null;

    return await medicine.update(data);
}

// Query medicines with filters
async function queryMedicines(filters) {
    const { page = 1, limit = 10, ...where } = filters;
    const offset = (page - 1) * limit;

    const medicines = await Medicine.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset,
    });

    return {
        page: parseInt(page),
        limit: parseInt(limit),
        total: medicines.count,
        data: medicines.rows,
    };
}

// Get medicine by ID
async function getMedicineById(id) {
    return await Medicine.findByPk(id);
}

// Delete a medicine
async function deleteMedicine(id) {
    const medicine = await Medicine.findByPk(id);
    if (!medicine) return null;

    await medicine.destroy();
    return medicine;
}

// Bulk create medicines
async function bulkCreateMedicines(data) {
    return await Medicine.bulkCreate(data);
}

module.exports = {
    createMedicine,
    updateMedicine,
    queryMedicines,
    getMedicineById,
    deleteMedicine,
    bulkCreateMedicines,
};
