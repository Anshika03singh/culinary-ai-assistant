const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Import from the new middleware file
const { analyzeIngredients } = require('../controllers/recipeController'); // Import ONLY the handler function

const router = express.Router();

// This is now clean, robust, and follows best practices.
// 1. Check for login. 2. Handle upload. 3. Analyze ingredients.
router.post(
    '/analyze-image', 
    authMiddleware, 
    upload.single('image'), 
    analyzeIngredients
);

module.exports = router;
