const express = require('express');
const jwt = require('jsonwebtoken');
const { generateTokens } = require("../../middlewares/auth")

const API_V1_TOKEN = express.Router();

API_V1_TOKEN.post('/token', (req, res) => {
    const { token } = req.body;
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, JWT_REFRESH_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const { accessToken, refreshToken } = generateTokens(user.userId, user.email);
        res.json({ accessToken, refreshToken });
    });
});

module.exports = API_V1_TOKEN;