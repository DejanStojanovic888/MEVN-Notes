const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Note = require('../models/Note');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        res.status(201).json(user.username);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });  // samo preko emaila treba da trazimo usera ali smo ovde radili i password
                                                     // trebali smo da radimo bcrypt za password ali nismo
        if(user) {
            req.session.user = user;
            res.json({user}); // { user } is just ES6 shorthand for { user: user }
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

router.get('/me', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ message: "Logout failed" });
        } else {
            res.json({ message: 'Logout successful' });
        }
    });
});

// Notes routes(kreiranje, citanje, update, delete pa testiramo pomocu REST-a)
router.post('/notes', async (req, res) => {
    console.log(req.body)
    if(!req.session.user) {  // BITNO!
        res.status(401).json({ message: 'Not authenticated' }); // ako nije logovan
        return;
    }   
    try {
        const { title, content } = req.body;
        const note = await Note.create({title, content, userId: req.session.user.id});  // MORA OBJEKAT!!!
        res.json(note);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
    
})

router.get('/notes', async (req, res) => {
    console.log(req.session.user)
    if(!req.session.user) {  // BITNO!
        res.status(401).json({ message: 'Not authenticated' }); // ako nije logovan
        return;
    }   
    try {
        const notes = await Note.find({userId: req.session.user.id}); // stavili sve u {}
        res.json({notes});  //  {notes: notes}
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
    
})

////
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
      { email: { $regex: `^${email}`, $options: 'i' } },  // ^ — means starts with 
      { email: 1 }
    ).limit(5);

    res.json(users.map(u => u.email));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/////
module.exports = router;