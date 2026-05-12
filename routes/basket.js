const express = require('express');
const User = require('../models/User');
const Basket = require('../models/Basket');
const Feedback = require('../models/Feedback');
const { requireAuth } = require('../middleware/auth');
const { generateBasket } = require('../services/basketService');
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

router.get('/dashboard', requireAuth, async (req, res) => {
  const [user, baskets] = await Promise.all([
    User.findById(req.session.userId),
    Basket.find({ user: req.session.userId }).sort({ createdAt: -1 }).limit(5)
  ]);

  res.render('dashboard', { title: 'Dashboard', user, baskets });
});

router.get('/basket/new', requireAuth, async (req, res) => {
  const user = await User.findById(req.session.userId);
  res.render('basket/new', {
    title: 'Create a basket',
    user,
    culturalOptions,
    dietOptions,
    healthConditionOptions,
    healthGoalOptions,
    cookingTimeOptions
  });
});

router.post('/basket/generate', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const request = {
      budget: Number(req.body.budget || user.profile.weeklyBudget || 80),
      suburb: req.body.suburb || user.profile.suburb || 'Melbourne CBD',
      culturalPreference: req.body.culturalPreference || user.profile.culturalPreference || 'Flexible',
      diet: req.body.diet || user.profile.diet || 'Balanced',
      cookingTime: req.body.cookingTime || user.profile.cookingTime || 'Quick meals',
      healthGoals: toArray(req.body.healthGoals),
      healthConditions: toArray(req.body.healthConditions),
      avoidIngredients: user.profile.avoidIngredients || []
    };

    const generated = generateBasket(request);
    const basket = await Basket.create({ user: req.session.userId, ...generated });
    req.session.flash = { type: 'success', message: 'Your personalised basket is ready.' };
    res.redirect(`/basket/${basket._id}`);
  } catch (error) {
    console.error(error);
    req.session.flash = { type: 'danger', message: 'Could not generate basket.' };
    res.redirect('/basket/new');
  }
});

router.get('/basket/history', requireAuth, async (req, res) => {
  const baskets = await Basket.find({ user: req.session.userId }).sort({ createdAt: -1 });
  res.render('basket/history', { title: 'Basket history', baskets });
});

router.get('/basket/:id', requireAuth, async (req, res) => {
  const basket = await Basket.findOne({ _id: req.params.id, user: req.session.userId });
  if (!basket) {
    req.session.flash = { type: 'warning', message: 'Basket not found.' };
    return res.redirect('/dashboard');
  }
  const user = await User.findById(req.session.userId);
  res.render('basket/show', { title: 'Your weekly basket', basket, user });
});

router.post('/basket/:id/apply-swap', requireAuth, async (req, res) => {
  try {
    const { index } = req.body;
    const basket = await Basket.findOne({ _id: req.params.id, user: req.session.userId });
    if (!basket || !basket.items[index]) {
      req.session.flash = { type: 'warning', message: 'Swap item not found.' };
      return res.redirect('/dashboard');
    }

    const item = basket.items[index];
    const oldPrice = item.chosenPrice;
    item.name = item.swap.name;
    item.reason = item.swap.reason;
    item.chosenPrice = item.swap.price;
    item.chosenStore = item.swap.store;
    basket.total = Number((basket.total - oldPrice + item.chosenPrice).toFixed(2));
    await basket.save();

    req.session.flash = { type: 'success', message: 'Healthy swap applied to your basket.' };
    res.redirect(`/basket/${basket._id}`);
  } catch (error) {
    console.error(error);
    req.session.flash = { type: 'danger', message: 'Could not apply swap.' };
    res.redirect(`/basket/${req.params.id}`);
  }
});

router.post('/basket/:id/feedback', requireAuth, async (req, res) => {
  try {
    await Feedback.create({
      user: req.session.userId,
      basket: req.params.id,
      rating: Number(req.body.rating),
      comment: req.body.comment
    });
    req.session.flash = { type: 'success', message: 'Thank you for your feedback.' };
    res.redirect(`/basket/${req.params.id}`);
  } catch (error) {
    console.error(error);
    req.session.flash = { type: 'danger', message: 'Could not submit feedback.' };
    res.redirect(`/basket/${req.params.id}`);
  }
});

router.get('/checkout/:basketId', requireAuth, async (req, res) => {
  const [user, basket] = await Promise.all([
    User.findById(req.session.userId),
    Basket.findOne({ _id: req.params.basketId, user: req.session.userId })
  ]);

  if (!basket) {
    req.session.flash = { type: 'warning', message: 'Basket not found.' };
    return res.redirect('/dashboard');
  }

  if (user.plan !== 'premium') {
    return res.render('upgrade', { title: 'Upgrade required', basket, user });
  }

  res.render('checkout', { title: 'Checkout demo', basket, user });
});

router.post('/upgrade', requireAuth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.session.userId, { plan: 'premium' }, { new: true });
  req.session.user = { id: user._id, name: user.name, email: user.email, plan: user.plan };
  req.session.flash = { type: 'success', message: 'Premium demo activated. Checkout is now unlocked.' };
  res.redirect(req.body.returnTo || '/dashboard');
});

module.exports = router;
