const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = {
  // Resize an image
  resizeImage: async (inputPath, outputPath, width, height) => {
    try {
      await sharp(inputPath)
        .resize(width, height)
        .toFile(outputPath);
      console.log(`Image resized successfully and saved to ${outputPath}`);
    } catch (error) {
      console.error(`Error resizing image: ${error.message}`);
      throw error;
    }
  },

  // Convert an image to a different format (JPEG, PNG, WebP, etc.)
  convertImageFormat: async (inputPath, outputPath, format) => {
    try {
      await sharp(inputPath)
        .toFormat(format)
        .toFile(outputPath);
      console.log(`Image converted to ${format} and saved to ${outputPath}`);
    } catch (error) {
      console.error(`Error converting image format: ${error.message}`);
      throw error;
    }
  },

  // Compress an image
  compressImage: async (inputPath, outputPath, quality) => {
    try {
      await sharp(inputPath)
        .jpeg({ quality }) // Compression quality for JPEG images
        .toFile(outputPath);
      console.log(`Image compressed successfully and saved to ${outputPath}`);
    } catch (error) {
      console.error(`Error compressing image: ${error.message}`);
      throw error;
    }
  },

  // Generate a thumbnail from an image
  createThumbnail: async (inputPath, outputPath, size) => {
    try {
      await sharp(inputPath)
        .resize(size, size) // Creating a square thumbnail
        .toFile(outputPath);
      console.log(`Thumbnail created and saved to ${outputPath}`);
    } catch (error) {
      console.error(`Error creating thumbnail: ${error.message}`);
      throw error;
    }
  },

  // Get image metadata (dimensions, format, etc.)
  getImageMetadata: async (inputPath) => {
    try {
      const metadata = await sharp(inputPath).metadata();
      console.log(`Image metadata:`, metadata);
      return metadata;
    } catch (error) {
      console.error(`Error fetching image metadata: ${error.message}`);
      throw error;
    }
  },

  // Convert an image to a Base64 string
  convertImageToBase64: async (inputPath) => {
    try {
      const imageBuffer = await sharp(inputPath).toBuffer();
      return imageBuffer.toString('base64');
    } catch (error) {
      console.error(`Error converting image to Base64: ${error.message}`);
      throw error;
    }
  },

  // Save a Base64 string as an image
  saveBase64AsImage: async (base64String, outputPath) => {
    try {
      const imageBuffer = Buffer.from(base64String, 'base64');
      fs.writeFileSync(outputPath, imageBuffer);
      console.log(`Base64 string saved as image to ${outputPath}`);
    } catch (error) {
      console.error(`Error saving Base64 string as image: ${error.message}`);
      throw error;
    }
  },
};
























const imageHelper = require('./imageHelper');

// Paths for image files
const inputImage = './example.jpg';
const outputImage = './output.jpg';

// Example: Resize an image
imageHelper.resizeImage(inputImage, './resized.jpg', 300, 300);

// Example: Convert image to PNG
imageHelper.convertImageFormat(inputImage, './converted.png', 'png');

// Example: Compress image (JPEG quality)
imageHelper.compressImage(inputImage, './compressed.jpg', 80);

// Example: Generate a thumbnail
imageHelper.createThumbnail(inputImage, './thumbnail.jpg', 100);

// Example: Get image metadata
imageHelper.getImageMetadata(inputImage).then((metadata) => {
  console.log('Metadata:', metadata);
});

// Example: Convert image to Base64
imageHelper.convertImageToBase64(inputImage).then((base64String) => {
  console.log('Base64 String:', base64String);
});

// Example: Save Base64 string as image
const base64String = '...'; // Your Base64 string
imageHelper.saveBase64AsImage(base64String, './output-from-base64.jpg');
