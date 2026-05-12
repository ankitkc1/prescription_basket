require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const { setLocals } = require('./middleware/auth');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const basketRoutes = require('./routes/basket');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'dev-prescription-basket-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};

if (process.env.MONGODB_URI) {
  sessionConfig.store = MongoStore.create({ mongoUrl: process.env.MONGODB_URI });
}

app.use(session(sessionConfig));
app.use(setLocals);

app.get('/', (req, res) => {
  res.render('index', { title: 'Eat better without overspending' });
});

app.use(authRoutes);
app.use(profileRoutes);
app.use(basketRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page not found' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render('500', { title: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Prescription Basket running at http://localhost:${PORT}`);
});
