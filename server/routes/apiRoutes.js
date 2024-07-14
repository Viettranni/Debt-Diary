const express = require('express');
const router = express.Router();
const User = require('../models/User');


// API own test endpoint to insert data to the DebtDiary database
router.post('/users', (req, res) => {
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

router.get('/users', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;