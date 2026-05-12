const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('MONGODB_URI is missing. Add it to .env to connect MongoDB Atlas.');
    return;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.error('Check your Atlas username/password, IP whitelist, and database URI.');
    process.exit(1);
  }
}

module.exports = connectDB;
