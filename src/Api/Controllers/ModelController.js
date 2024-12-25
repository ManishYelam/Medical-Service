const ModelService = require('../Services/ModelService');
const { Op } = require('sequelize');

class ModelController {
    async getRecords(req, res) {
        try {
            const health_id = req.user.health_id;

            if (!health_id) {
                return res.status(400).json({
                    name: "BadRequest",
                    status: false,
                    code: 400,
                    message: "Health ID is required."
                });
            }

            const { modelName, page = 1, limit = 10, filters } = req.query;

            let parsedFilters = {};
            if (filters) {
                try {
                    parsedFilters = JSON.parse(filters);
                } catch (err) {
                    return res.status(400).json({
                        name: "BadRequest",
                        status: false,
                        code: 400,
                        message: "Invalid filters format."
                    });
                }
            }

            let results;
            if (modelName) {
                results = await ModelService.fetchSpecificModelRecords(health_id, modelName, page, limit, parsedFilters);
                return res.status(200).json({
                    name: "OK",
                    status: true,
                    code: 200,
                    message: `${results.totalCount} records found, displaying ${results.data.length} records.`,
                    data: results.data,
                    totalCount: results.totalCount
                });
            } else {
                results = await ModelService.fetchAllRecords(health_id, page, limit, parsedFilters);
                return res.status(200).json({
                    name: "OK",
                    status: true,
                    code: 200,
                    message: "Data fetched successfully for all models.",
                    data: results
                });
            }
        } catch (error) {
            console.error("Error in getRecords:", error.message);
            return res.status(500).json({
                name: "InternalServerError",
                status: false,
                code: 500,
                message: "Failed to fetch records.",
                error: error.message
            });
        }
    }

    async createRecord(req, res) {
        try {
            const health_id = req.user.health_id;
            const { data } = req.body;
            const { modelName } = req.params;

            if (!health_id || !modelName || !data) {
                return res.status(400).json({
                    name: "BadRequest",
                    status: false,
                    code: 400,
                    message: "Health ID, modelName, and data are required."
                });
            }

            try {
                const result = await ModelService.createRecord(health_id, modelName, data);
                return res.status(201).json({
                    name: "Created",
                    status: true,
                    code: 201,
                    message: "Record created successfully.",
                    data: result
                });
            } catch (error) {
                console.error(`Error creating record for model "${modelName}": ${error.message}`);
                return res.status(500).json({
                    name: "InternalServerError",
                    status: false,
                    code: 500,
                    message: `Failed to create record for model: ${modelName}`,
                    error: error.message
                });
            }
        } catch (error) {
            console.error("Unexpected error in createRecord:", error.message);
            return res.status(500).json({
                name: "InternalServerError",
                status: false,
                code: 500,
                message: "Failed to create record.",
                error: error.message
            });
        }
    }

    async updateRecord(req, res) {
        try {
            const health_id = req.user.health_id;
            const { data } = req.body;
            const { modelName, id } = req.params;

            if (!health_id || !modelName || !data || !id) {
                return res.status(400).json({
                    name: "BadRequest",
                    status: false,
                    code: 400,
                    message: "Health ID, modelName, data, and id are required."
                });
            }

            try {
                const result = await ModelService.updateRecord(health_id, modelName, data, id);
                return res.status(200).json({
                    name: "OK",
                    status: true,
                    code: 200,
                    message: `Record with ID ${id} updated successfully.`,
                    data: result
                });
            } catch (error) {
                console.error(`Error updating record for model "${modelName}": ${error.message}`);
                return res.status(500).json({
                    name: "InternalServerError",
                    status: false,
                    code: 500,
                    message: `Failed to update record for model: ${modelName}`,
                    error: error.message
                });
            }
        } catch (error) {
            console.error("Unexpected error in updateRecord:", error.message);
            return res.status(500).json({
                name: "InternalServerError",
                status: false,
                code: 500,
                message: "Failed to update record.",
                error: error.message
            });
        }
    }

    async deleteRecord(req, res) {
        try {
            const health_id = req.user.health_id;
            const { modelName, id } = req.params;

            if (!health_id || !modelName || !id) {
                return res.status(400).json({
                    name: "BadRequest",
                    status: false,
                    code: 400,
                    message: "Health ID, modelName, and id are required."
                });
            }

            try {
                const result = await ModelService.deleteRecord(health_id, modelName, id);
                return res.status(200).json({
                    name: "OK",
                    status: true,
                    code: 200,
                    message: `Record with ID ${id} deleted successfully.`,
                    data: result
                });
            } catch (error) {
                console.error(`Error deleting record for model "${modelName}": ${error.message}`);
                return res.status(500).json({
                    name: "InternalServerError",
                    status: false,
                    code: 500,
                    message: `Failed to delete record for model: ${modelName}`,
                    error: error.message
                });
            }
        } catch (error) {
            console.error("Unexpected error in deleteRecord:", error.message);
            return res.status(500).json({
                name: "InternalServerError",
                status: false,
                code: 500,
                message: "Failed to delete record.",
                error: error.message
            });
        }
    }

}

module.exports = new ModelController();



// const ModelService = require('../Services/ModelService');

// class ModelController {
//     // Fetch records
//     async getRecords(req, res) {
//         try {
//             const health_id = req.user.health_id;

//             if (!health_id) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Health ID is required."
//                 });
//             }

//             const { modelName } = req.query;

//             if (modelName) {
//                 // Fetch specific model data
//                 const result = await ModelService.fetchSpecificModelRecords(health_id, modelName);
//                 return res.status(200).json({
//                     success: true,
//                     message: `${result.count} records fetched successfully from ${result.model}.`,
//                     data: result.data
//                 });
//             } else {
//                 // Fetch all model data
//                 const results = await ModelService.fetchAllRecords(health_id);
//                 return res.status(200).json({
//                     success: true,
//                     message: "Data fetched successfully for all models.",
//                     data: results
//                 });
//             }
//         } catch (error) {
//             console.error("Error in getRecords:", error.message);
//             return res.status(500).json({
//                 success: false,
//                 message: "Failed to fetch records.",
//                 error: error.message
//             });
//         }
//     }

//     // Create a record
//     async createRecord(req, res) {
//         try {
//             const { modelName, data } = req.body;

//             const result = await ModelService.createRecord(modelName, data);
//             return res.status(201).json({
//                 success: true,
//                 message: `${modelName} created successfully.`,
//                 data: result
//             });
//         } catch (error) {
//             console.error("Error in createRecord:", error.message);
//             return res.status(500).json({
//                 success: false,
//                 message: "Failed to create record.",
//                 error: error.message
//             });
//         }
//     }

//     // Update a record
//     async updateRecord(req, res) {
//         try {
//             const { modelName, id, updateData } = req.body;

//             const result = await ModelService.updateRecord(modelName, id, updateData);
//             return res.status(200).json({
//                 success: true,
//                 message: `${modelName} updated successfully.`,
//                 data: result
//             });
//         } catch (error) {
//             console.error("Error in updateRecord:", error.message);
//             return res.status(500).json({
//                 success: false,
//                 message: "Failed to update record.",
//                 error: error.message
//             });
//         }
//     }

//     // Delete a record
//     async deleteRecord(req, res) {
//         try {
//             const { modelName, id } = req.params;

//             const result = await ModelService.deleteRecord(modelName, id);
//             return res.status(200).json({
//                 success: true,
//                 message: `${modelName} deleted successfully.`,
//                 data: result
//             });
//         } catch (error) {
//             console.error("Error in deleteRecord:", error.message);
//             return res.status(500).json({
//                 success: false,
//                 message: "Failed to delete record.",
//                 error: error.message
//             });
//         }
//     }
// }

// module.exports = new ModelController();
