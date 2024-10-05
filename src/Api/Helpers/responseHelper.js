const { appLogger } = require('../../utils/logger');

/**
 * Standardize a successful response format.
 * @param {Object} res - Express response object.
 * @param {number} [statusCode=200] - HTTP status code.
 * @param {string} [message='Success'] - Success message.
 * @param {Object} [data={}] - Data to send in the response.
 * @returns {Object} - JSON response with status, message, and data.
 */
const sendSuccessResponse = (res, statusCode = 200, message = 'Success', data = {}) => {
  const response = {
    status: 'success',
    message,
    data,
  };

  // Logging the success response
  appLogger.info(`Response sent: ${message}`, { statusCode, data });

  return res.status(statusCode).json(response);
};

/**
 * Standardize an error response format.
 * @param {Object} res - Express response object.
 * @param {number} [statusCode=500] - HTTP status code.
 * @param {string} [message='An error occurred'] - Error message.
 * @param {Object} [error={}] - Additional error details to send.
 * @returns {Object} - JSON response with status, message, and error details.
 */
const sendErrorResponse = (res, statusCode = 500, message = 'An error occurred', error = {}) => {
  const response = {
    status: 'error',
    message,
    error: process.env.NODE_ENV === 'production' ? undefined : error, // Hide error details in production
  };

  // Logging the error response
  appLogger.error(`Error response sent: ${message}`, { statusCode, error });

  return res.status(statusCode).json(response);
};

/**
 * Handle validation errors from request body or params.
 * @param {Object} res - Express response object.
 * @param {Array} errors - Array of validation error details.
 * @returns {Object} - JSON response with validation errors.
 */
const sendValidationErrorResponse = (res, errors) => {
  const response = {
    status: 'fail',
    message: 'Validation errors occurred',
    errors,
  };

  // Logging the validation errors
  appLogger.warn('Validation failed', { errors });

  return res.status(400).json(response);
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
  sendValidationErrorResponse,
};



// const { sendSuccessResponse, sendErrorResponse, sendValidationErrorResponse } = require('./responseHelper');

// // Example of sending success response
// app.get('/api/data', (req, res) => {
//   const data = { key: 'value' };
//   sendSuccessResponse(res, 200, 'Data fetched successfully', data);
// });

// // Example of sending error response
// app.get('/api/error', (req, res) => {
//   try {
//     throw new Error('Something went wrong');
//   } catch (error) {
//     sendErrorResponse(res, 500, 'Server error', error);
//   }
// });

// // Example of sending validation error response
// app.post('/api/submit', (req, res) => {
//   const errors = [{ field: 'email', message: 'Email is required' }];
//   sendValidationErrorResponse(res, errors);
// });



module.exports = {
  sendSuccessResponse: (res, statusCode = 200, message = 'Success', data = {}) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  sendErrorResponse: (res, statusCode = 400, message = 'Error', error = {}) => {
    res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  },

  sendValidationErrorResponse: (res, errors) => {
    res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  },
};
