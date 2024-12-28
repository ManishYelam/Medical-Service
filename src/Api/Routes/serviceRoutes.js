// const express = require('express');
// const routeConfig = require('../Routes/Config/serviceRouteConfig');
// const serviceController = require('../Controllers/ServiceController');

// const serviceRouter = express.Router();

// const getServiceUrl = (service) => {
//     return process.env[`${process.env.NODE_ENV === 'production' ? 'P_' : 'L_'}${service.toUpperCase()}_URL`];
// };

// routeConfig.forEach(route => {
//     const { method, path, controller, middlewares, dynamicService } = route;
//     if (dynamicService) {
//         serviceRouter[method](path, ...middlewares, (req, res) => {
//             const { service } = req.params;
//             const serviceUrl = getServiceUrl(service);
//             if (!serviceUrl) {
//                 return res.status(404).json({ error: 'Service not found' });
//             }
//             if (serviceController[controller]) {
//                 serviceController[controller](serviceUrl)(req, res);
//             } else {
//                 console.error(`Controller method ${controller} not found in serviceController.`);
//                 res.status(500).json({ error: 'Internal server error' });
//             }
//         });
//     } else {
//         if (serviceController[controller]) {
//             serviceRouter[method](path, ...middlewares, serviceController[controller]);
//         } else {
//             console.error(`Controller method ${controller} not found in serviceController.`);
//         }
//     }
// });

// module.exports = serviceRouter;

const express = require('express');
const serviceRouter = express.Router();
const serviceController = require('../Controllers/ServiceController');

serviceRouter
  .get('/all-services', serviceController.getAllServicesData)

  .get('/:service/:endpoint', (req, res) => {
    const { service } = req.params;
    const serviceUrl =
      process.env[
        `${process.env.NODE_ENV === 'production' ? 'P_' : 'L_'}${service.toUpperCase()}_URL`
      ];

    if (!serviceUrl) {
      return res.status(404).json({ error: 'Service not found' });
    }

    serviceController.getServiceData(serviceUrl)(req, res);
  });

module.exports = serviceRouter;
