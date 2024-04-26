const express = require('express');
const User = require('../../models/user');

const API_V1_AUTH = express.Router();

// Signup route
API_V1_AUTH.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = await User.create({ email, password });

        // Create a token
        const secret_key = 'kaamworks_api_2024'.concat(Date.now().toString())
        const token = jwt.sign(
            { userId: newUser.id, email: newUser.email },
            secret_key,
            { expiresIn: '24h' }
        );

        // Return success response
        return res.status(201).json({ message: 'Signup successful', user: newUser, token });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Internal server error', error: Object.keys(error).includes('name') ? error.name : null });
    }

    // ------------------
    // router.post('/signup', function(req, res, next) {
    //     var salt = crypto.randomBytes(16);
    //     crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    //       if (err) { return next(err); }
    //       db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
    //         req.body.username,
    //         hashedPassword,
    //         salt
    //       ], function(err) {
    //         if (err) { return next(err); }
    //         var user = {
    //           id: this.lastID,
    //           username: req.body.username
    //         };
    //         req.login(user, function(err) {
    //           if (err) { return next(err); }
    //           res.redirect('/');
    //         });
    //       });
    //     });
    //   });
    // ------------------

});

// Login route
API_V1_AUTH.post('/login', (req, res) => {
    // Implement login logic here
});

// Forgot Password route
API_V1_AUTH.post('/forgot-password', (req, res) => {
    // Implement forgot password logic here
});

module.exports = API_V1_AUTH;

