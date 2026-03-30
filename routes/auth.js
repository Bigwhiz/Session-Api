const express = require('express');
const router = express.Router();

const User = require('../models/User');

// SIGNUP
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Create new user
        const newUser = new User({
            username,
            password
        });

        // Save to database
        await newUser.save();

        res.json({
            message: "User created successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
       
        const user = await User.findOne({ username });

        
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

      
        if (user.password !== password) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

      
        req.session.user = { 
            id: user._id,
            username: user.username
        };

        res.json({ 
            message: "Login successful" 
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }
});


module.exports = router;