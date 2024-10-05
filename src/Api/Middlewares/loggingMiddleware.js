module.exports = {
  logRequestDetails: (req, res, next) => {
    const { method, url, headers, body } = req;
    console.log('Request received', { method, url, headers, body, });
    next();
  },

  logResponseDetails: (req, res, next) => {
    const oldSend = res.send;

    (res.send = function (data) {
      console.log('Response sent', { statusCode: res.statusCode, body: data, });
      oldSend.apply(res, arguments);
    }),
      next();
  },
};
