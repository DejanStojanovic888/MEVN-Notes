const express = require('express');
const router = express.Router();
const User = require('../models/User');

//register route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).json(user.username);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});
// const { username, email, password } = req.body;
// console.log(username, email, password)
// res.json({ message: 'User registered successfully' });

//login route
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     res.send('User logged in successfully');
// });



module.exports = router;