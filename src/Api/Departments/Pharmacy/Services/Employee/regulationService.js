// services/regulationService.js
const Regulation = require('../models/Regulation');

const regulationService = {
    createRegulation: async (data) => {
        try {
            const regulation = await Regulation.create(data);
            return regulation;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getRegulations: async () => {
        try {
            const regulations = await Regulation.findAll();
            return regulations;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    getRegulationById: async (id) => {
        try {
            const regulation = await Regulation.findByPk(id);
            if (!regulation) throw new Error("Regulation not found");
            return regulation;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    updateRegulation: async (id, data) => {
        try {
            const regulation = await Regulation.findByPk(id);
            if (!regulation) throw new Error("Regulation not found");
            await regulation.update(data);
            return regulation;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deleteRegulation: async (id) => {
        try {
            const regulation = await Regulation.findByPk(id);
            if (!regulation) throw new Error("Regulation not found");
            await regulation.destroy();
            return { message: "Regulation deleted successfully" };
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

module.exports = regulationService;
