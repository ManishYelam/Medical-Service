const fileCategories = {
    images: ['image/jpeg', 'image/png', 'image/gif'],
    videos: ['video/mp4', 'video/mkv'],
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    spreadsheets: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    presentations: ['application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    textFiles: ['text/plain'],
    csvFiles: ['text/csv']
};

const maxSize = 10 * 1024 * 1024; // 10 MB for larger file types
const maxSmallSize = 5 * 1024 * 1024; // 5 MB for smaller file types

const validateFile = (file) => {
    const mimetype = file.mimetype;

    if (fileCategories.images.includes(mimetype)) {
        return file.size <= maxSmallSize;
    } else if (fileCategories.videos.includes(mimetype)) {
        return file.size <= maxSize;
    } else if (fileCategories.documents.includes(mimetype)) {
        return file.size <= maxSize;
    } else if (fileCategories.spreadsheets.includes(mimetype)) {
        return file.size <= maxSmallSize;
    } else if (fileCategories.presentations.includes(mimetype)) {
        return file.size <= maxSmallSize;
    } else if (fileCategories.textFiles.includes(mimetype)) {
        return file.size <= maxSmallSize;
    } else if (fileCategories.csvFiles.includes(mimetype)) {
        return file.size <= maxSmallSize;
    } else {
        return false; // Invalid file type
    }
};

const generateFileUrl = (filename) => {
    return `/uploads/${filename}`; // Generates URL for uploaded files
};

module.exports = { validateFile, generateFileUrl };
