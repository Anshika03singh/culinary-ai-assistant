const axios = require('axios');

const analyzeImageWithGemini = async (imageBuffer) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("Gemini API key not found in environment variables.");
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // Convert the image buffer to a base64 string
        const base64ImageData = imageBuffer.toString('base64');

        const payload = {
            contents: [
                {
                    parts: [
                        { text: "Identify the distinct food ingredients in this image. List only the names of the ingredients, separated by commas. For example: tomato, onion, garlic." },
                        {
                            inlineData: {
                                mimeType: "image/jpeg", // Assuming jpeg, multer will detect the actual type
                                data: base64ImageData
                            }
                        }
                    ]
                }
            ],
        };

        const response = await axios.post(apiUrl, payload);
        
        const text = response.data.candidates[0].content.parts[0].text;
        
        // Clean up the response and split it into an array
        const ingredients = text.split(',').map(item => item.trim().toLowerCase());
        
        return ingredients;

    } catch (error) {
        console.error("Error calling Gemini API:", error.response ? error.response.data : error.message);
        throw new Error("Failed to analyze image with AI.");
    }
};

module.exports = { analyzeImageWithGemini };