const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Save files temporarily

router.post('/upload/cloudinary', upload.single('file'), uploadController.uploadToCloudinary);
router.post('/upload/s3', upload.single('file'), uploadController.uploadToS3);
router.post('/upload/gcs', upload.single('file'), uploadController.uploadToGCS);
router.post('/upload/azure', upload.single('file'), uploadController.uploadToAzure);
router.post('/upload/firebase', upload.single('file'), uploadController.uploadToFirebase);
router.post('/upload/backblaze', upload.single('file'), uploadController.uploadToBackblaze);

module.exports = router;
