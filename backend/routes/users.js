const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET request to /users');
});

router.post('/register', function (req, res, next) {
  const { username, email, password, repeatPassword } = req.body;
  //console.log(username);
  //console.log(email);
  //console.log(password);
  //console.log(repeatPassword);

  if (!username || !email || !password || !repeatPassword) {
    console.log('All fields must be filled out');
    return res.status(400).json({ error: 'All fields must be filled out' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('Invalid email address');
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (password !== repeatPassword) {
    console.log('Passwords do not match');
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  if (username.length < 6 || /\s/.test(username)) {
    console.log('Username must be at least 6 characters long and should not contain spaces');
    return res.status(400).json({ error: 'Username must be at least 6 characters long and should not contain spaces' });
  }

  if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
    console.log('Password must be at least 8 characters long, contain at least one uppercase letter, and contain at least one number or special character');
    return res.status(400).json({ error: 'Password must be at least 8 characters long, contain at least one uppercase letter, and contain at least one number or special character' });
  }

  console.log('Form data is valid');
  res.status(200).json({ success: 'Form data is valid' });
});

module.exports = router;