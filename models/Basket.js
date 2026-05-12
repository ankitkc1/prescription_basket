const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    request: {
      budget: Number,
      culturalPreference: String,
      diet: String,
      suburb: String,
      healthGoals: [String],
      healthConditions: [String],
      cookingTime: String
    },
    selectedStore: String,
    total: Number,
    savingsComparedToHighest: Number,
    items: [
      {
        name: String,
        category: String,
        quantity: String,
        reason: String,
        healthTags: [String],
        culturalTags: [String],
        prices: [
          {
            store: String,
            price: Number,
            distanceKm: Number
          }
        ],
        chosenPrice: Number,
        chosenStore: String,
        swap: {
          name: String,
          reason: String,
          price: Number,
          store: String
        }
      }
    ],
    storeComparison: [
      {
        store: String,
        total: Number,
        distanceKm: Number
      }
    ],
    nutritionSummary: {
      protein: String,
      fibre: String,
      sodium: String,
      sugar: String,
      note: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Basket', basketSchema);
