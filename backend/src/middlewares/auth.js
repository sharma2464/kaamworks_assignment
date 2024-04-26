const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'kaamworks_jwt_2024';
const JWT_REFRESH_SECRET = 'kaamworks_jwt_2024_new';


// Middleware to validate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Token is not valid
        req.user = user;
        next();
    });
};

// Generating Tokens
const generateTokens = (userId, email) => {
    const user = { userId, email };
    const accessToken = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '24h' });
    const refreshToken = jwt.sign(user, JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

module.exports = { authenticateToken, generateTokens, JWT_REFRESH_SECRET, JWT_SECRET_KEY }