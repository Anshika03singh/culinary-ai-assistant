const { analyzeImageWithGemini } = require('../services/visionService');

const analyzeIngredients = async (req, res) => {
    try {
        // By the time this function runs, our new uploadMiddleware has already
        // processed the file and checked for its existence.
        if (!req.file) {
            // This is a fallback, though the middleware should handle it.
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

// We only need to export this one function now
module.exports = {
    analyzeIngredients
}