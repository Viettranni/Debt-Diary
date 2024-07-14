const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Account = require('../models/Account')

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const account = await Account.findOne({ username });
        if (!account) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Successful login
        req.session.account = account; // Store account in session
        res.status(200).json({ message: 'Login successful!', account });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists in the database
        const existingAccount = await Account.findOne({ username });
        if (existingAccount) {
            return res.status(400).json({ message: 'The account already exists. Please log in to account.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new account
        const newAccount = new Account({ username, password: hashedPassword });
        await newAccount.save();

        res.status(201).json({ message: 'Account has been registered successfully!', account: newAccount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out.' });
        }
        res.status(200).json({ message: 'Logout successfully' });
    });
});

module.exports = router;