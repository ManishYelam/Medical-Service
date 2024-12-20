const path = require('path');
const fs = require('fs');
const { fileCategories, sizeLimits } = require('../Config/Database/Data');

const validateFile = (file, category) => {    
    if (!file || !file.mimetype || !file.size) return false;
    const { mimetype, size } = file;
    if (fileCategories[category].includes(mimetype)) {
        const maxSize = sizeLimits[category] || sizeLimits.large;
        if (size <= maxSize) {
            return true;
        } else {
            return false;
        }
    }
    return false;
};

const getUploadPath = (file) => {
    const baseDir = path.join(process.cwd(), '/UploadedFiles');
    if (fileCategories.images.includes(file.mimetype)) return path.join(baseDir, 'Images');
    if (fileCategories.documents.includes(file.mimetype)) return path.join(baseDir, 'Documents');
    if (fileCategories.csvFiles.includes(file.mimetype)) return path.join(baseDir, 'CSV');
    if (fileCategories.videos.includes(file.mimetype)) return path.join(baseDir, 'Videos');
    return path.join(baseDir, 'Others');
};

const generateFileUrl = (filename, directory) => `/uploads/${directory}/${filename}`;

module.exports = {
    validateFile,
    getUploadPath,
    generateFileUrl
};
