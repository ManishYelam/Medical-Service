const express = require('express');
const serviceRouter = express.Router();
const serviceController = require('../Controllers/ServiceController');

serviceRouter
    .get('/all-services', serviceController.getAllServicesData)

    .get('/:service/:endpoint', (req, res) => {
        const { service } = req.params;
        const serviceUrl = process.env[`${process.env.NODE_ENV === 'production' ? 'P_' : 'L_'}${service.toUpperCase()}_URL`];

        if (!serviceUrl) {
            return res.status(404).json({ error: 'Service not found' });
        }

        serviceController.getServiceData(serviceUrl)(req, res);
    });

module.exports = serviceRouter;
