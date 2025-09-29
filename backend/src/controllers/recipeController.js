const { analyzeImageWithGemini } = require('../services/visionService');
const { generateRecipeWithGemini } = require('../services/recipeAIService'); // Import the new service

const analyzeIngredients = async (req, res) => {
    try {
        // By the time this function runs, uploadMiddleware has already done its job.
        if (!req.file) {
            return res.status(400).json({ msg: "No image file was uploaded." });
        }

        const imageBuffer = req.file.buffer;
        const ingredients = await analyzeImageWithGemini(imageBuffer);

        res.json({ ingredients });

    } catch (error) {
        console.error("Error in analyzeIngredients controller:", error);
        res.status(500).json({ msg: "Server error while trying to analyze the image." });
    }
};

// --- NEW FUNCTION ---
// This function will handle the recipe generation requests
const generateRecipe = async (req, res) => {
    try {
        const { ingredients } = req.body; // Get ingredients from the request body

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ msg: "Ingredient list cannot be empty." });
        }

        // Call our new AI recipe service
        const recipe = await generateRecipeWithGemini(ingredients);

        // Send the complete recipe object back to the frontend
        res.json({ recipe });

    } catch (error) {
        console.error("Error in generateRecipe controller:", error);
        res.status(500).json({ msg: "Server error while trying to generate the recipe." });
    }
};


// We now export the new function as well
module.exports = {
    analyzeIngredients,
    generateRecipe 
};

