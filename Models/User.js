// models/User.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: String,
    creditor: String,
    amount: Number,
    currency: String,
    due_date: Date
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
