const Medicine = require('../Models/Medicine');
const { Op } = require('sequelize');

class MedicineService {
    async createMedicine(data) {
        try {
            // Check if the barcode already exists
            const existingMedicine = await Medicine.findOne({ where: { barcode: data.barcode } });
            if (existingMedicine) {
                throw new Error('Medicine with this barcode already exists');
            }

            const medicine = await Medicine.create(data);
            return medicine;
        } catch (error) {
            throw new Error(`Error creating medicine: ${error.message}`);
        }
    }

    async updateMedicine(id, data) {
        try {
            const medicine = await Medicine.findByPk(id);
            if (!medicine) {
                throw new Error('Medicine not found');
            }

            // Check if the barcode is being updated and is unique
            if (data.barcode && data.barcode !== medicine.barcode) {
                const existingMedicine = await Medicine.findOne({ where: { barcode: data.barcode } });
                if (existingMedicine) {
                    throw new Error('Medicine with this barcode already exists');
                }
            }

            await medicine.update(data);
            return medicine;
        } catch (error) {
            throw new Error(`Error updating medicine: ${error.message}`);
        }
    }

    async queryMedicines(filters) {
        try {
            const conditions = {};
    
            // Dynamically build the query conditions
            if (filters.pharmacy_id) {
                conditions.pharmacy_id = filters.pharmacy_id;
            }
            if (filters.medicine_name) {
                conditions.medicine_name = filters.medicine_name;
            }
            if (filters.price_min || filters.price_max) {
                conditions.price = {};
                if (filters.price_min) conditions.price[Op.gte] = filters.price_min;
                if (filters.price_max) conditions.price[Op.lte] = filters.price_max;
            }
            if (filters.available_in_stock !== undefined) {
                conditions.available_in_stock = filters.available_in_stock === 'true'; // Convert string to boolean
            }
            if (filters.expiry_date_before) {
                conditions.expiry_date = { [Op.lte]: filters.expiry_date_before };
            }
            if (filters.expiry_date_after) {
                conditions.expiry_date = { [Op.gte]: filters.expiry_date_after };
            }
    
            // Fetch medicines from the database
            const medicines = await Medicine.findAll({ where: conditions });
    
            return medicines;
        } catch (err) {
            console.error('Error in medicine query service:', err);
            throw new Error('Error querying medicines');
        }
    }

    async getMedicineById(id) {
        try {
            const medicine = await Medicine.findByPk(id);
            if (!medicine) {
                throw new Error('Medicine not found');
            }
            return medicine;
        } catch (error) {
            throw new Error(`Error getting medicine: ${error.message}`);
        }
    }
    
    async deleteMedicine(id) {
        try {
            const medicine = await Medicine.findByPk(id);
            if (!medicine) {
                throw new Error('Medicine not found');
            }
            await medicine.destroy();
            return { message: 'Medicine deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting medicine: ${error.message}`);
        }
    }
}

module.exports = new MedicineService();