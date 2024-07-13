const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User.js')

const app = express();

// Middleware to parse JSON bodies
app.use(express.json())

//------------------------------------------------------------------------------------------------------------------------

// Connecting to MongoDB, taking the key from .env file (MONGODB_URI)
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => console.log('MongoDB Atlas connected successfully!'))
    .catch(err => console.error('MongoDB Atlas connection error:', err));

//------------------------------------------------------------------------------------------------------------------------


// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Define route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'templates', 'index.html'));
});

// API endpoint example
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});


// API own test endpoint to insert data to the DebtDiary database
app.post('/api/users', (req, res) => {
    const { name, creditor, amount, currency, dueDate } = req.body;
    const newUser = new User({
        name,
        creditor,
        amount,
        currency,
        dueDate: new Date(dueDate)
    });

    newUser.save()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/api/users', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
