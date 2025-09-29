const axios = require('axios');

const generateRecipeWithGemini = async (ingredients) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("Gemini API key not found.");
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // This is the "prompt". We are giving the AI very specific instructions.
        const prompt = `You are a creative and experienced chef. Based on the following ingredients, create a unique and delicious recipe. 
        
        Ingredients available: ${ingredients.join(', ')}.

        Please provide the response in a structured JSON format. Do not include any text outside of the JSON object. The JSON object should have the following keys:
        - "title": A creative name for the recipe.
        - "description": A short, appealing description of the dish.
        - "prepTime": Estimated preparation time (e.g., "15 mins").
        - "cookTime": Estimated cooking time (e.g., "30 mins").
        - "servings": How many people the recipe serves (e.g., "4").
        - "ingredients": An array of objects, where each object has "name", "quantity", and "unit" keys (e.g., { "name": "tomato", "quantity": "2", "unit": "cups" }).
        - "instructions": An array of strings, with each string being a step in the recipe.
        `;

        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
            },
        };

        const response = await axios.post(apiUrl, payload);
        
        // The AI's response will be a JSON string, which we need to parse.
        const recipeJson = response.data.candidates[0].content.parts[0].text;
        const recipe = JSON.parse(recipeJson);
        
        return recipe;

    } catch (error) {
        console.error("Error calling Gemini API for recipe generation:", error.response ? error.response.data : error.message);
        throw new Error("Failed to generate recipe with AI.");
    }
};

module.exports = { generateRecipeWithGemini };