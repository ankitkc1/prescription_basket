const express = require('express');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');
const {
  culturalOptions,
  dietOptions,
  healthConditionOptions,
  healthGoalOptions,
  cookingTimeOptions
} = require('../data/demoData');

const router = express.Router();

function toArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

router.get('/profile', requireAuth, async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render('profile/edit', {
    title: 'Your food profile',
    user,
    culturalOptions,
    dietOptions,
    healthConditionOptions,
    healthGoalOptions,
    cookingTimeOptions
  });
});

router.post('/profile', requireAuth, async (req, res) => {
  try {
    const profile = {
      weeklyBudget: Number(req.body.weeklyBudget || 80),
      suburb: req.body.suburb || 'Melbourne CBD',
      culturalPreference: req.body.culturalPreference || 'Flexible',
      diet: req.body.diet || 'Balanced',
      cookingTime: req.body.cookingTime || 'Quick meals',
      healthGoals: toArray(req.body.healthGoals),
      healthConditions: toArray(req.body.healthConditions),
      avoidIngredients: String(req.body.avoidIngredients || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    };

    const user = await User.findByIdAndUpdate(req.session.userId, { profile }, { new: true });
    req.session.user = { id: user._id, name: user.name, email: user.email, plan: user.plan };
    req.session.flash = { type: 'success', message: 'Your profile has been saved.' };
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    req.session.flash = { type: 'danger', message: 'Could not save profile.' };
    res.redirect('/profile');
  }
});

module.exports = router;
