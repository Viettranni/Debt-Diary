const express = require('express');
const path = require('path');
const app = express();

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
