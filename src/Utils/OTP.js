const crypto = require('crypto');

const getRandomInt = (max) => {
  return crypto.randomInt(0, max);
};

const generateOTP = (length = 6, useAlphaNumeric = false) => {
  const digits = '0123456789';
  const alphaNumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  const characters = useAlphaNumeric ? alphaNumeric : digits;
  const charactersLength = characters.length;
  
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += characters[getRandomInt(charactersLength)];
  }

  return otp;
};

const verifyOTP = (inputOtp, savedOtp) => {
  return inputOtp === savedOtp;
};

const generateOTPTimestamped = (length = 6, validityPeriod = 300000, useAlphaNumeric = false) => {
  const otp = generateOTP(length, useAlphaNumeric);
  const expiryTime = Date.now() + validityPeriod; // Validity period in milliseconds
  return { otp, expiryTime };
};

const verifyOTPTimestamped = (inputOtp, savedOtp, expiryTime) => {
  if (Date.now() > expiryTime) {
    return { isValid: false, message: 'OTP has expired' };
  }
  
  if (inputOtp === savedOtp) {
    return { isValid: true, message: 'OTP is valid' };
  }

  return { isValid: false, message: 'Invalid OTP' };
};

const timeRemaining = (expiryTime) => {
  const remainingMs = expiryTime - Date.now();
  const minutes = Math.floor(remainingMs / 6000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);
  return `${minutes} min ${seconds} sec remaining`;
};

module.exports = {
  generateOTP,
  verifyOTP,
  generateOTPTimestamped,
  verifyOTPTimestamped,
  timeRemaining,
};
