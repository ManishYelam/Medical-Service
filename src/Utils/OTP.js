const crypto = require('crypto');

// Generates a secure random integer up to the specified maximum
const getRandomInt = (max) => {
  return crypto.randomInt(0, max);
};

// Generates an OTP of a specified length, using either numeric or alphanumeric characters
const generateOTP = (length = 6, useAlphaNumeric = false) => {
  const digits = '0123456789';
  const alphaNumeric =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const characters = useAlphaNumeric ? alphaNumeric : digits;
  const charactersLength = characters.length;

  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += characters[getRandomInt(charactersLength)];
  }

  return otp;
};

// Verifies if the input OTP matches the saved OTP
const verifyOTP = (inputOtp, savedOtp) => {
  return inputOtp === savedOtp;
};

// Generates an OTP with an expiration timestamp
const generateOTPTimestamped = (
  length = 8,
  validityPeriod = 300000,
  useAlphaNumeric = false
) => {
  const otp = generateOTP(length, useAlphaNumeric);
  const expiryTime = Date.now() + validityPeriod; // Validity period in milliseconds
  return { otp, expiryTime };
};

// Verifies if the input OTP matches the saved OTP and is within the expiration time
const verifyOTPTimestamped = (inputOtp, savedOtp, expiryTime) => {
  if (Date.now() > expiryTime) {
    return { isValid: false, message: 'OTP has expired' };
  }

  if (inputOtp === savedOtp) {
    return { isValid: true, message: 'OTP is valid' };
  }

  return { isValid: false, message: 'Invalid OTP' };
};

// Calculates and formats the time remaining until OTP expiration
const timeRemaining = (expiryTime) => {
  const remainingMs = expiryTime - Date.now();
  const minutes = Math.floor(remainingMs / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);
  return `${minutes} min ${seconds} sec remaining`;
};

// Exporting all functions to be used in other modules
module.exports = {
  generateOTP,
  verifyOTP,
  generateOTPTimestamped,
  verifyOTPTimestamped,
  timeRemaining,
};
