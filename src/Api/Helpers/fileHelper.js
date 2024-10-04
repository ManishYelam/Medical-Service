const fs = require('fs');
const path = require('path');
const base64Helper = require('./base64Helper');

module.exports = {
  // Read a file from the given path and return its contents
  readFile: (filePath) => {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      console.error(`Error reading file: ${error.message}`);
      throw error;
    }
  },

  // Write data to a file at the specified path
  writeFile: (filePath, data) => {
    try {
      fs.writeFileSync(filePath, data, 'utf-8');
      console.log(`File successfully written to ${filePath}`);
    } catch (error) {
      console.error(`Error writing file: ${error.message}`);
      throw error;
    }
  },

  // Delete a file from the given path
  deleteFile: (filePath) => {
    try {
      fs.unlinkSync(filePath);
      console.log(`File successfully deleted: ${filePath}`);
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
      throw error;
    }
  },

  // Encode a file to Base64 string
  encodeFileToBase64: (filePath) => {
    try {
      const fileBuffer = fs.readFileSync(filePath);
      return base64Helper.encodeBufferToBase64(fileBuffer);
    } catch (error) {
      console.error(`Error encoding file to Base64: ${error.message}`);
      throw error;
    }
  },

  // Decode a Base64 string and save it as a file
  decodeBase64ToFile: (base64String, destinationPath) => {
    try {
      const fileBuffer = base64Helper.decodeBase64ToBuffer(base64String);
      fs.writeFileSync(destinationPath, fileBuffer);
      console.log(`File successfully created at ${destinationPath}`);
    } catch (error) {
      console.error(`Error decoding Base64 to file: ${error.message}`);
      throw error;
    }
  },

  // Get file metadata (size, created date, etc.)
  getFileStats: (filePath) => {
    try {
      return fs.statSync(filePath);
    } catch (error) {
      console.error(`Error getting file stats: ${error.message}`);
      throw error;
    }
  },

  // Check if a file exists at the given path
  fileExists: (filePath) => {
    return fs.existsSync(filePath);
  },
};



































const fileHelper = require('./fileHelper');
const filePath = './example.txt';
const encodedFilePath = './encodedFile.txt';

// Example: Reading a file
try {
  const fileContent = fileHelper.readFile(filePath);
  console.log('File Content:', fileContent);
} catch (error) {
  console.error('Failed to read file.');
}

// Example: Writing to a file
fileHelper.writeFile(filePath, 'This is sample content');

// Example: Deleting a file
fileHelper.deleteFile(filePath);

// Example: Encode a file to Base64
const encodedString = fileHelper.encodeFileToBase64(filePath);
console.log('Encoded Base64:', encodedString);

// Example: Decode Base64 and save as file
fileHelper.decodeBase64ToFile(encodedString, encodedFilePath);

// Example: Check if file exists
const exists = fileHelper.fileExists(filePath);
console.log('File exists:', exists);

// Example: Get file metadata
const stats = fileHelper.getFileStats(filePath);
console.log('File Stats:', stats);

const multer = require('multer');

module.exports = {
  // Configure multer for file uploads
  uploadFile: (destinationPath) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, destinationPath);
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });

    return multer({ storage }).single('file');
  },

  // Serve a file for download
  downloadFile: (res, filePath, fileName) => {
    try {
      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error(`Error downloading file: ${err.message}`);
        }
      });
    } catch (error) {
      console.error(`Error serving file for download: ${error.message}`);
      throw error;
    }
  },
};
const fileHelper = require('./fileHelper');

// File upload endpoint
app.post('/upload', fileHelper.uploadFile('./uploads'), (req, res) => {
  res.json({ message: 'File uploaded successfully', file: req.file });
});

// File download endpoint
app.get('/download/:fileName', (req, res) => {
  const filePath = `./uploads/${req.params.fileName}`;
  fileHelper.downloadFile(res, filePath, req.params.fileName);
});



