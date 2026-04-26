const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).json(user.username);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

router.get('/users/search', async (req, res) => {
  const { username } = req.query;
  if (!username || username.trim().length < 2) return res.json([]);

  try {
    const users = await User.find(
      { username: { $regex: `^${username}`, $options: 'i' } },  // $options: 'i' is case insensitive(nebitno dal su velika ili mala slova)
      { username: 1 }   // projection(da uzme samo username iz baze)
    ).limit(5);

    res.json(users.map(u => u.username));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users/search-email', async (req, res) => {
  const { email } = req.query;
  if (!email || email.trim().length < 2) return res.json([]);

  try {
    const users = await User.find(
      { email: { $regex: `^${email}`, $options: 'i' } },
      { email: 1 }
    ).limit(5);

    res.json(users.map(u => u.email));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;