const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Créer un utilisateur
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Authentifier un utilisateur
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
