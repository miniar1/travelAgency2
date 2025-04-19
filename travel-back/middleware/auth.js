// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add the user data to the request
        req.userData = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication failed',
            error: error.message
        });
    }
};