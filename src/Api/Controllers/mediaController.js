const { generateFileUrl } = require('../../Utils/fileUtils');

const uploadMedia = (req, res) => {
    let fileUrls = [];

    if (req.file) {
        fileUrls.push(generateFileUrl(req.file.filename)); // Single file upload  
    } else if (req.files && req.files.length > 0) {
        req.files.forEach(file => { fileUrls.push(generateFileUrl(file.filename)); });   // Multiple files upload
    }

    if (fileUrls.length === 0) {
        return res.status(400).json({ error: 'No files uploaded.' });  // If no file was uploaded
    }

    res.status(201).json({ urls: fileUrls });
};

module.exports = { uploadMedia };
