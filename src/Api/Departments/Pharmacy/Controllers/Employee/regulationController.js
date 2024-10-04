// controllers/regulationController.js
const regulationService = require('../services/regulationService');

const regulationController = {
    createRegulation: async (req, res) => {
        try {
            const regulation = await regulationService.createRegulation(req.body);
            res.status(201).json(regulation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getRegulations: async (req, res) => {
        try {
            const regulations = await regulationService.getRegulations();
            res.status(200).json(regulations);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getRegulationById: async (req, res) => {
        try {
            const regulation = await regulationService.getRegulationById(req.params.id);
            res.status(200).json(regulation);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    updateRegulation: async (req, res) => {
        try {
            const regulation = await regulationService.updateRegulation(req.params.id, req.body);
            res.status(200).json(regulation);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    deleteRegulation: async (req, res) => {
        try {
            const response = await regulationService.deleteRegulation(req.params.id);
            res.status(200).json(response);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = regulationController;
