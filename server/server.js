const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes')
const apiRoutes = require('./routes/apiRoutes')

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Handling URLencoded (for future implement)
app.use(express.urlencoded({extended: false}));

//------------------------------------------------------------------------------------------------------------------------

// Extracting the key from .env file (MONGODB_URI)
const uri = process.env.MONGODB_URI;

// Connecting to MongoDB and letting the user know if it was successful
mongoose.connect(uri)
    .then(() => console.log('MongoDB Atlas connected successfully!'))
    .catch(err => console.error('MongoDB Atlas connection error:', err));

//------------------------------------------------------------------------------------------------------------------------

// Routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes)

// Public folder as static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// User will land on this page first
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'templates', 'base.html'));
});


// Start the server and listen on PORT 5001 if not setted in env
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
