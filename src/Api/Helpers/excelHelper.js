const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

module.exports = {
  // Read an Excel file and return its content as JSON
  readExcelFile: (filePath) => {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetNames = workbook.SheetNames;
      const sheet = workbook.Sheets[sheetNames[0]]; // Read the first sheet
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      return jsonData;
    } catch (error) {
      console.error(`Error reading Excel file: ${error.message}`);
      throw error;
    }
  },

  // Write data to an Excel file from a JSON array
  writeExcelFile: (filePath, jsonData) => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(jsonData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, filePath);
      console.log(`Excel file successfully written to ${filePath}`);
    } catch (error) {
      console.error(`Error writing Excel file: ${error.message}`);
      throw error;
    }
  },

  // Convert an Excel file to JSON
  excelToJson: (filePath) => {
    try {
      const jsonData = module.exports.readExcelFile(filePath);
      return JSON.stringify(jsonData, null, 2);
    } catch (error) {
      console.error(`Error converting Excel to JSON: ${error.message}`);
      throw error;
    }
  },

  // Generate a new Excel file with custom data
  generateExcelFile: (filePath, headers, data) => {
    try {
      const worksheetData = [headers, ...data];
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      XLSX.writeFile(workbook, filePath);
      console.log(`Excel file generated at ${filePath}`);
    } catch (error) {
      console.error(`Error generating Excel file: ${error.message}`);
      throw error;
    }
  },
};
























const excelHelper = require('./excelHelper');
const excelPath = './example.xlsx';
const outputExcelPath = './output.xlsx';

// Example: Reading an Excel file
try {
  const excelData = excelHelper.readExcelFile(excelPath);
  console.log('Excel Data:', excelData);
} catch (error) {
  console.error('Failed to read Excel file.');
}

// Example: Writing to an Excel file
const sampleData = [
  { Name: 'John Doe', Age: 30, City: 'New York' },
  { Name: 'Jane Smith', Age: 25, City: 'San Francisco' },
];
excelHelper.writeExcelFile(outputExcelPath, sampleData);

// Example: Convert Excel to JSON
const jsonData = excelHelper.excelToJson(excelPath);
console.log('Excel to JSON:', jsonData);

// Example: Generating a new Excel file with headers and data
const headers = ['Name', 'Age', 'City'];
const data = [
  ['Alice', 28, 'Los Angeles'],
  ['Bob', 34, 'Chicago'],
];
excelHelper.generateExcelFile('./generated.xlsx', headers, data);
