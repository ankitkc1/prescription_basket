const { products, stores } = require('../data/demoData');

function normalise(value) {
  return String(value || '').trim().toLowerCase();
}

function includesAny(list, targets) {
  const source = (list || []).map(normalise);
  return (targets || []).some((target) => source.includes(normalise(target)));
}

function priceAtStore(basePrice, store, product) {
  let modifier = 1;

  if (store.valuePosition === 'budget') modifier = 0.9;
  if (store.valuePosition === 'mainstream') modifier = store.name.includes('Woolworths') ? 1.03 : 1;
  if (store.valuePosition === 'fresh') modifier = ['Fruit', 'Vegetables'].includes(product.category) ? 0.86 : 1.08;
  if (store.valuePosition === 'cultural') {
    modifier = includesAny(product.culturalTags, ['Nepali', 'Indian', 'East Asian', 'Middle Eastern']) ? 0.88 : 1.09;
  }

  const cents = Math.round(basePrice * modifier * 20) / 20;
  return Number(cents.toFixed(2));
}

function generatePrices(product) {
  return stores.map((store) => ({
    store: store.name,
    distanceKm: store.distanceKm,
    price: priceAtStore(product.basePrice, store, product)
  }));
}

function scoreProduct(product, request) {
  let score = 0;
  const culturalPreference = request.culturalPreference || 'Flexible';
  const diet = request.diet || 'Balanced';
  const conditions = request.healthConditions || [];
  const goals = request.healthGoals || [];
  const cookingTime = request.cookingTime || 'Quick meals';

  if (includesAny(product.culturalTags, [culturalPreference])) score += 4;
  if (includesAny(product.culturalTags, ['Flexible'])) score += 1;
  if (includesAny(product.dietTags, [diet])) score += 3;
  if (diet === 'Balanced') score += 1;

  if (includesAny(product.healthTags, ['high fibre']) && includesAny(goals, ['High fibre', 'Eat healthier', 'Lose weight'])) score += 3;
  if (includesAny(product.healthTags, ['protein', 'plant protein', 'lean protein']) && includesAny(goals, ['Gain muscle', 'Improve energy'])) score += 3;
  if (includesAny(product.healthTags, ['low sugar', 'diabetes friendly']) && includesAny(conditions, ['Diabetes'])) score += 4;
  if (includesAny(product.healthTags, ['lower sodium']) && includesAny(conditions, ['Hypertension'])) score += 4;
  if (includesAny(product.healthTags, ['heart healthy', 'heart healthy fats', 'low saturated fat']) && includesAny(conditions, ['High cholesterol'])) score += 4;
  if (includesAny(product.healthTags, ['iron']) && includesAny(conditions, ['Anaemia'])) score += 3;

  if (cookingTime === 'No cooking' && ['Breakfast', 'Fruit', 'Bakery', 'Dairy', 'Dairy alternatives', 'Pantry'].includes(product.category)) score += 2;
  if (cookingTime === 'Quick meals' && ['Protein', 'Vegetables', 'Bakery', 'Breakfast'].includes(product.category)) score += 2;
  if (cookingTime === 'Meal prep' && ['Protein', 'Grains', 'Vegetables', 'Pantry'].includes(product.category)) score += 2;

  if (includesAny(goals, ['Save money']) && product.basePrice <= 4.5) score += 3;
  if (product.basePrice <= 3.5) score += 1;

  return score;
}

function productAllowed(product, request) {
  const diet = request.diet || 'Balanced';
  const healthConditions = request.healthConditions || [];
  const avoidIngredients = request.avoidIngredients || [];

  if (!includesAny(product.dietTags, [diet]) && diet !== 'Balanced') return false;
  if (includesAny(product.avoidFor, [diet])) return false;
  if (includesAny(product.avoidFor, healthConditions)) return false;
  if (includesAny(product.avoidFor, avoidIngredients)) return false;
  return true;
}

function bestPrice(prices) {
  return prices.reduce((best, current) => (current.price < best.price ? current : best), prices[0]);
}

function calculateStoreComparison(items) {
  return stores.map((store) => {
    const total = items.reduce((sum, item) => {
      const found = item.prices.find((price) => price.store === store.name);
      return sum + (found ? found.price : 0);
    }, 0);

    return {
      store: store.name,
      distanceKm: store.distanceKm,
      total: Number(total.toFixed(2))
    };
  }).sort((a, b) => a.total - b.total);
}

function buildNutritionSummary(request, items) {
  const conditionLabels = request.healthConditions || [];
  const tags = items.flatMap((item) => item.healthTags || []).map(normalise);

  return {
    protein: tags.some((tag) => tag.includes('protein')) ? 'Strong protein coverage from lentils, tofu, eggs, chicken or tuna.' : 'Moderate protein coverage. Add one more protein item if budget allows.',
    fibre: tags.some((tag) => tag.includes('fibre')) ? 'Good fibre support from wholegrains, legumes, vegetables and fruit.' : 'Fibre could be improved with oats, lentils and more vegetables.',
    sodium: includesAny(conditionLabels, ['Hypertension']) ? 'Basket prioritises lower-sodium swaps where possible.' : 'Choose reduced-salt sauces and canned foods where possible.',
    sugar: includesAny(conditionLabels, ['Diabetes']) ? 'Basket favours lower-GI grains and no-added-sugar options.' : 'Keep sweet drinks and high-sugar snacks outside the main basket.',
    note: 'This is a demo wellness guide, not medical advice. Users with health conditions should follow their GP or dietitian advice.'
  };
}

function generateBasket(request) {
  const budget = Number(request.budget || 80);
  const safeBudget = Number.isFinite(budget) && budget > 0 ? budget : 80;
  const minimumCategories = ['Grains', 'Protein', 'Vegetables', 'Fruit', 'Pantry'];

  const rankedProducts = products
    .filter((product) => productAllowed(product, request))
    .map((product) => ({ ...product, score: scoreProduct(product, request), prices: generatePrices(product) }))
    .sort((a, b) => b.score - a.score || a.basePrice - b.basePrice);

  const selected = [];
  const selectedNames = new Set();

  minimumCategories.forEach((category) => {
    const bestInCategory = rankedProducts.find((product) => product.category === category && !selectedNames.has(product.name));
    if (bestInCategory) {
      selected.push(bestInCategory);
      selectedNames.add(bestInCategory.name);
    }
  });

  for (const product of rankedProducts) {
    if (selectedNames.has(product.name)) continue;
    const currentTotal = selected.reduce((sum, item) => sum + bestPrice(item.prices).price, 0);
    const nextPrice = bestPrice(product.prices).price;
    if (currentTotal + nextPrice <= safeBudget || selected.length < 10) {
      selected.push(product);
      selectedNames.add(product.name);
    }
    if (selected.length >= 16) break;
  }

  const items = selected.map((product) => {
    const chosen = bestPrice(product.prices);
    const swapPrice = stores
      .map((store) => ({ store: store.name, price: priceAtStore(product.swap.price, store, product), distanceKm: store.distanceKm }))
      .sort((a, b) => a.price - b.price)[0];

    return {
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      reason: product.reason,
      healthTags: product.healthTags,
      culturalTags: product.culturalTags,
      prices: product.prices,
      chosenPrice: chosen.price,
      chosenStore: chosen.store,
      swap: {
        name: product.swap.name,
        reason: product.swap.reason,
        price: swapPrice.price,
        store: swapPrice.store
      }
    };
  });

  const total = Number(items.reduce((sum, item) => sum + item.chosenPrice, 0).toFixed(2));
  const storeComparison = calculateStoreComparison(items);
  const highestTotal = Math.max(...storeComparison.map((store) => store.total));

  return {
    request: {
      budget: safeBudget,
      culturalPreference: request.culturalPreference || 'Flexible',
      diet: request.diet || 'Balanced',
      suburb: request.suburb || 'Melbourne CBD',
      healthGoals: request.healthGoals || [],
      healthConditions: request.healthConditions || [],
      cookingTime: request.cookingTime || 'Quick meals'
    },
    selectedStore: storeComparison[0]?.store || 'Best mixed stores',
    total,
    savingsComparedToHighest: Number((highestTotal - storeComparison[0].total).toFixed(2)),
    items,
    storeComparison,
    nutritionSummary: buildNutritionSummary(request, items)
  };
}

module.exports = { generateBasket };
