const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    plan: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free'
    },
    profile: {
      weeklyBudget: { type: Number, default: 80 },
      suburb: { type: String, default: 'Melbourne CBD' },
      culturalPreference: { type: String, default: 'Flexible' },
      diet: { type: String, default: 'Balanced' },
      cookingTime: { type: String, default: 'Quick meals' },
      healthGoals: [{ type: String }],
      healthConditions: [{ type: String }],
      avoidIngredients: [{ type: String }]
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
