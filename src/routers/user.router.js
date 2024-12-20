const express = require('express');
// getAllUsers, getUserByEId, getUserByEmail
const {login,createNewUser} = require('../models/user.model.js');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const { password } = require('pg/lib/defaults.js');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/login', async (req, res, next) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ error: 'Missing Data' });
        }
        const loginUser = await login(name);

        if (!loginUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, loginUser.password);
        if (!isPasswordValid) {
            throw new Error("Invalid username or password");
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: loginUser.id, name: loginUser.name },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' } // Token expiration time
        );

        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: loginUser.id,
                name: loginUser.name,
                email: loginUser.email
            }
        });
    } catch (error) {
        console.error("Login Route Error:", error);
        res.status(500).json({ error: Error });
    }
});

router.post('/registerNewUser', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing Data' });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = await createNewUser(name, email, hashedPassword);

        res.status(201).json(newUser);
    } catch (error) {
        if (error.message === "Error Registering New User") {
            res.status(409).json({ error: 'User with this email already exists' });
        } else {
            next(error); 
        }
    }
});

module.exports = router;