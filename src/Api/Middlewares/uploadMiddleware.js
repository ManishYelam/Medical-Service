const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { getUploadPath, validateFile, generateFileUrl } = require('../../Utils/fileUtils');
const { sizeLimits } = require('../../Config/Database/Data');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = getUploadPath(file);
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${file.originalname.replace(/[: ]/g, '_')}`;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage, limits: { fileSize: sizeLimits.large }, });

const uploadMiddleware = (req, res, next) => {
    const isSingle = req.headers['upload-type'] === 'single';
    const uploadHandler = isSingle ? upload.single('file') : upload.array('files', 10);

    uploadHandler(req, res, (err) => {
        const files = isSingle ? [req.file] : req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded.' });
        }

        const validFiles = files.filter(file => validateFile(file, req.headers['upload-category']));
        if (validFiles.length === 0) {
            return res.status(400).json({ error: 'No valid files uploaded.' });
        }

        req.uploadedFiles = validFiles.map((file, index) => {
            const fileUrl = generateFileUrl(file.filename, path.basename(getUploadPath(file)));
            return { id: index + 1, file, url: fileUrl };
        });
        next();
    });
};

module.exports = uploadMiddleware;
