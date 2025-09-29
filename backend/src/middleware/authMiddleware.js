const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    
    // Check if the header exists and is correctly formatted ('Bearer TOKEN')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Extract the token from the header
        const token = authHeader.split(' ')[1];

        // Verify the token using our secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add the user's ID from the token to the request object
        // so that subsequent functions can know who is making the request
        req.user = decoded;
        
        // Pass control to the next function in the chain (e.g., the upload handler)
        next();

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
