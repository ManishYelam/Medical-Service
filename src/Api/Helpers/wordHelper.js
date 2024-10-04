const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const mammoth = require('mammoth');

module.exports = {
  // Read a DOCX file and return its content as plain text
  readWordFile: async (filePath) => {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value; // Extracted plain text
    } catch (error) {
      console.error(`Error reading Word file: ${error.message}`);
      throw error;
    }
  },

  // Convert a DOCX file to HTML format
  convertWordToHtml: async (filePath) => {
    try {
      const result = await mammoth.convertToHtml({ path: filePath });
      return result.value; // Extracted HTML content
    } catch (error) {
      console.error(`Error converting Word file to HTML: ${error.message}`);
      throw error;
    }
  },

  // Write content to a new DOCX file
  writeWordFile: async (filePath, textArray) => {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: textArray.map(
              (text) =>
                new Paragraph({
                  children: [new TextRun(text)],
                })
            ),
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      fs.writeFileSync(filePath, buffer);
      console.log(`Word file successfully written to ${filePath}`);
    } catch (error) {
      console.error(`Error writing Word file: ${error.message}`);
      throw error;
    }
  },

  // Generate a Word file with custom data (paragraphs and text runs)
  generateWordFile: async (filePath, paragraphs) => {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs.map(
              (para) =>
                new Paragraph({
                  children: para.map((text) => new TextRun(text)),
                })
            ),
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      fs.writeFileSync(filePath, buffer);
      console.log(`Word file generated at ${filePath}`);
    } catch (error) {
      console.error(`Error generating Word file: ${error.message}`);
      throw error;
    }
  },
};




























const wordHelper = require('./wordHelper');
const wordFilePath = './example.docx';
const outputWordPath = './output.docx';

// Example: Reading a DOCX file
wordHelper.readWordFile(wordFilePath)
  .then((content) => {
    console.log('DOCX Content:', content);
  })
  .catch((error) => {
    console.error('Failed to read DOCX file.', error);
  });

// Example: Converting a DOCX file to HTML
wordHelper.convertWordToHtml(wordFilePath)
  .then((htmlContent) => {
    console.log('DOCX to HTML:', htmlContent);
  })
  .catch((error) => {
    console.error('Failed to convert DOCX to HTML.', error);
  });

// Example: Writing text to a DOCX file
const sampleText = ['This is the first paragraph.', 'This is the second paragraph.'];
wordHelper.writeWordFile(outputWordPath, sampleText);

// Example: Generating a DOCX file with custom paragraphs
const paragraphs = [
  ['First sentence of first paragraph.', 'Second sentence of first paragraph.'],
  ['First sentence of second paragraph.']
];
wordHelper.generateWordFile('./generated.docx', paragraphs);
