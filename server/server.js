const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes')
const apiRoutes = require('./routes/apiRoutes')


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

// Routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes)

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Define route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'templates', 'index.html'));
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
