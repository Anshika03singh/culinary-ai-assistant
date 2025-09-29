const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); 
const { analyzeIngredients, generateRecipe } = require('../controllers/recipeController');

const router = express.Router();

// Route for analyzing an image to get ingredients
router.post(
    '/analyze-image', 
    authMiddleware, 
    upload.single('image'), 
    analyzeIngredients
);

// --- NEW ROUTE ---
// Route for generating a recipe from a list of ingredients
router.post(
    '/generate-recipe',
    authMiddleware, // Protect this route as well
    generateRecipe
);

module.exports = router;
