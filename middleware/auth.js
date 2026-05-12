function requireAuth(req, res, next) {
  if (!req.session.userId) {
    req.session.flash = { type: 'warning', message: 'Please log in first.' };
    return res.redirect('/login');
  }
  next();
}

function requireGuest(req, res, next) {
  if (req.session.userId) {
    return res.redirect('/dashboard');
  }
  next();
}

function setLocals(req, res, next) {
  res.locals.currentUser = req.session.user || null;
  res.locals.flash = req.session.flash || null;
  res.locals.appName = process.env.APP_NAME || 'Prescription Basket';
  delete req.session.flash;
  next();
}

module.exports = { requireAuth, requireGuest, setLocals };
