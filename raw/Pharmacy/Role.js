const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

// This function will parse the CSV file and return the extracted data
function csv {
    try {
        const parsedRow = {
            pharmacy_id: row.pharmacy_id,
            medicine_name: row.medicine_name,
            generic_name: row.generic_name,
            description: row.description,
            manufacturer: row.manufacturer,
            price: parseFloat(row.price),
            quantity: parseInt(row.quantity, 10),
            expiry_date: row.expiry_date,
            side_effects: row.side_effects,
            contraindications: row.contraindications,
            dosage: row.dosage,
            instructions: row.instructions,
            health_issues: row.health_issues ? row.health_issues.split('|') : [],
            diseases_treated: row.diseases_treated ? row.diseases_treated.split('|') : [],
            barcode: row.barcode,
            import_source: row.import_source,
            regulatory_approvals: row.regulatory_approvals,
            storage_conditions: row.storage_conditions,
            available_in_stock: row.available_in_stock === 'true'
        };

        if (!parsedRow.price || isNaN(parsedRow.price) || parsedRow.price <= 0) {
            throw new Error(`Invalid price value for medicine: ${parsedRow.medicine_name}`);
        }
        if (parsedRow.quantity <= 0) {
            throw new Error(`Invalid quantity value for medicine: ${parsedRow.medicine_name}`);
        }
        medicinesData.push(parsedRow);
    } catch (error) {
        console.error(`Error processing row: ${error.message}`);
    }
}

const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const medicinesData = [];

        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true, skipEmptyLines: true }))
            .on('data', (row) => {
                await csv
            })
            .on('end', () => resolve(medicinesData))
            .on('error', (error) => reject(error));
    });
};

module.exports = { parseCSV };
