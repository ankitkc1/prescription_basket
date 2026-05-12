const express = require('express');
const User = require('../models/User');
const { requireGuest } = require('../middleware/auth');

const router = express.Router();

router.get('/register', requireGuest, (req, res) => {
  res.render('auth/register', { title: 'Create your account' });
});

router.post('/register', requireGuest, async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      req.session.flash = { type: 'danger', message: 'Please fill in all required fields.' };
      return res.redirect('/register');
    }

    if (password !== confirmPassword) {
      req.session.flash = { type: 'danger', message: 'Passwords do not match.' };
      return res.redirect('/register');
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      req.session.flash = { type: 'danger', message: 'An account already exists with this email.' };
      return res.redirect('/login');
    }

    const user = await User.create({ name, email, password });
    req.session.userId = user._id;
    req.session.user = { id: user._id, name: user.name, email: user.email, plan: user.plan };
    req.session.flash = { type: 'success', message: 'Welcome to Prescription Basket. Create your profile to get better grocery recommendations.' };
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    req.session.flash = { type: 'danger', message: 'Could not create account. Please try again.' };
    res.redirect('/register');
  }
});

router.get('/login', requireGuest, (req, res) => {
  res.render('auth/login', { title: 'Log in' });
});

router.post('/login', requireGuest, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || '').toLowerCase().trim() });

    if (!user || !(await user.comparePassword(password))) {
      req.session.flash = { type: 'danger', message: 'Invalid email or password.' };
      return res.redirect('/login');
    }

    req.session.userId = user._id;
    req.session.user = { id: user._id, name: user.name, email: user.email, plan: user.plan };
    req.session.flash = { type: 'success', message: `Welcome back, ${user.name}.` };
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    req.session.flash = { type: 'danger', message: 'Login failed. Please try again.' };
    res.redirect('/login');
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
