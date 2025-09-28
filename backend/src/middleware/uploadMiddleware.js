const multer = require('multer');

// Configure multer to store the uploaded file in the server's memory
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Set a limit of 10MB for uploads
});

module.exports = upload;
