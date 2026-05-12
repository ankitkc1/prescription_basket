# Prescription Basket

Prescription Basket is a full-stack prototype web app for international students, university students and young professionals in Australia who want to eat healthier without overspending.

The app lets users create an account, save a food profile, generate a personalised weekly grocery basket, compare nearby demo store prices, apply health swaps, submit feedback and unlock a premium checkout demo.

## Tech stack

- Node.js
- Express.js
- MongoDB Atlas with Mongoose
- EJS templates
- Bootstrap 5
- Custom CSS brand theme
- Express sessions with Mongo session storage
- Bcrypt password hashing

## Main features

- Register and log in
- User-specific dashboard
- Food profile with:
  - weekly budget
  - suburb
  - cultural food preference
  - diet
  - cooking time
  - health goals
  - health conditions
  - ingredients to avoid
- Create personalised basket
- Demo store price comparison across:
  - Aldi Melbourne Central
  - Coles QV Melbourne
  - Woolworths Metro Swanston
  - Queen Vic Market Produce
  - Namaste Asian Grocery
- Health swap suggestions
- Basket history
- Feedback submission
- Premium checkout gate
- Demo premium upgrade button

## Folder structure

```txt
prescription-basket-app/
├── config/
│   └── db.js
├── data/
│   └── demoData.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Basket.js
│   ├── Feedback.js
│   └── User.js
├── public/
│   ├── css/styles.css
│   └── js/app.js
├── routes/
│   ├── auth.js
│   ├── basket.js
│   └── profile.js
├── services/
│   └── basketService.js
├── views/
├── .env.example
├── package.json
└── server.js
```

## Setup instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env`

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update the values:

```env
PORT=3000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/prescription-basket?retryWrites=true&w=majority
SESSION_SECRET=replace-this-with-a-long-random-secret
APP_NAME=Prescription Basket
```

### 3. MongoDB Atlas checklist

In MongoDB Atlas:

1. Create a free cluster.
2. Create a database user.
3. Add your current IP address in **Network Access**.
4. Copy your connection string.
5. Paste it into `MONGODB_URI` in `.env`.

### 4. Run the app

Development mode:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

Open:

```txt
http://localhost:3000
```

## Demo use flow

1. Open the homepage.
2. Click **Start free**.
3. Create an account.
4. Fill in your food profile.
5. Go to **Create basket**.
6. Generate a weekly basket.
7. Review grocery list, store comparison and healthy swaps.
8. Click **Checkout**.
9. Free users see an upgrade prompt.
10. Click **Upgrade demo account** to unlock the checkout screen.

## Notes for assessment or presentation

This prototype uses realistic demo data and a custom basket recommendation engine. It does not connect to live supermarket APIs yet. The checkout is intentionally simulated because real checkout would require retailer partnerships, payment gateway integration and compliance work.

## Future improvements

- Live supermarket price API or scraping partner feeds
- Real location-based store search
- Nutrition scoring using a food composition database
- Stripe subscription payment
- Email verification
- Password reset
- Admin dashboard
- Dietitian review mode
- Mobile app version
