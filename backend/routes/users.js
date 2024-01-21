const express = require('express');
const User = require("../models/user");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

router.get('/', (req, res) => {
  res.send('GET request to /users');
});

router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are both required' });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, 'secretOrPrivateKey', { expiresIn: '48h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/register', async function (req, res, next) {
  const {username, email, password, repeatPassword} = req.body;
  //console.log(username);
  //console.log(email);
  //console.log(password);
  //console.log(repeatPassword);

  if (!username || !email || !password || !repeatPassword) {
    return res.status(400).json({error: 'All fields must be filled out'});
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({error: 'Invalid email address'});
  }

  if (password !== repeatPassword) {
    return res.status(400).json({error: 'Passwords do not match'});
  }

  if (username.length < 6 || username.includes(' ')) {
    return res.status(400).json({error: 'Username must be at least 6 characters long and should not contain spaces'});
  }

  if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return res.status(400).json({error: 'Password must be at least 8 characters long, contain at least one uppercase letter, and contain at least one number or special character'});
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      username: username,
      email: email,
      password: hash
    });
    await newUser.save();
    res.status(200).send("Account created successfully.");
  } catch (error) {
    if (error.code === 11000) { // MongoDB duplicate key error code
      return res.status(400).json({ error: 'Username or email is already taken' });
    }
  }
});

module.exports = router;