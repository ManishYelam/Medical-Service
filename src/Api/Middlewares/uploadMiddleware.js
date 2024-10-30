const multer = require('multer');
const path = require('path');
const { validateFile } = require('../../Utils/fileUtils');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files are saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
    }
});

const uploadMiddleware = (req, res, next) => {
    const isMultiple = req.params.isMultiple === 'true'; // Use params to determine if multiple uploads

    const multerConfig = multer({
        storage,
        limits: { fileSize: 10 * 1024 * 1024 }, // General file size limit for all file types
        fileFilter: (req, file, cb) => {
            if (validateFile(file, )) { // Pass category to validateFile
                cb(null, true); // File is valid
            } else {
                cb(new Error(`Invalid file type or size. Please upload a valid document, image, video, or text file.`));
            }
        }
    });

    if (isMultiple) {        
        multerConfig.array('files', 10)(req, res, next); // Allow up to 10 files for multiple uploads
    } else {        
        multerConfig.single('file')(req, res, next); // Only one file for single upload
    }
};

module.exports = uploadMiddleware;
