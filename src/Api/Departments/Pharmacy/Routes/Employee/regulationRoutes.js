// routes/regulationRoutes.js
const express = require('express');
const regulationController = require('../controllers/regulationController');
const authMiddleware = require('../middlewares/authMiddleware');

const regulationRouter = express.Router();

regulationRouter
    .post('/', authMiddleware, regulationController.createRegulation)
    .get('/', authMiddleware, regulationController.getRegulations)
    .get('/:id', authMiddleware, regulationController.getRegulationById)
    .put('/:id', authMiddleware, regulationController.updateRegulation)
    .delete('/:id', authMiddleware, regulationController.deleteRegulation);

module.exports = regulationRouter;
