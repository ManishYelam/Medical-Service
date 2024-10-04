const { responseLog, requestLog } = require('../../Config/Setting/logger.config'); 

module.exports = {
  logRequestDetails: (req, res, next) => {
    const { method, url, headers, body } = req;
    requestLog.info('Request received', { method, url, headers, body, });
    next();
  },

  logResponseDetails: (req, res, next) => {
    const oldSend = res.send;

    (res.send = function (data) {
      responseLog.info('Response sent', { statusCode: res.statusCode, body: data, });
      oldSend.apply(res, arguments);
    }),
      next();
  },
};
