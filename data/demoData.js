const stores = [
  { name: 'Aldi Melbourne Central', distanceKm: 0.8, valuePosition: 'budget' },
  { name: 'Coles QV Melbourne', distanceKm: 0.6, valuePosition: 'mainstream' },
  { name: 'Woolworths Metro Swanston', distanceKm: 0.5, valuePosition: 'mainstream' },
  { name: 'Queen Vic Market Produce', distanceKm: 1.4, valuePosition: 'fresh' },
  { name: 'Namaste Asian Grocery', distanceKm: 1.1, valuePosition: 'cultural' }
];

const products = [
  {
    name: 'Brown rice',
    category: 'Grains',
    quantity: '1 kg',
    basePrice: 3.2,
    culturalTags: ['Nepali', 'Indian', 'East Asian', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['high fibre', 'slow energy'],
    avoidFor: [],
    reason: 'Affordable wholegrain base for healthy weekly meals.',
    swap: {
      name: 'Quinoa and brown rice blend',
      reason: 'Higher protein and fibre while still working well with curries and stir-fries.',
      price: 5.5
    }
  },
  {
    name: 'Low-GI basmati rice',
    category: 'Grains',
    quantity: '1 kg',
    basePrice: 4.6,
    culturalTags: ['Nepali', 'Indian', 'Pakistani', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['diabetes friendly', 'slow energy'],
    avoidFor: [],
    reason: 'Culturally familiar rice option with steadier energy release.',
    swap: {
      name: 'Half rice half cauliflower rice mix',
      reason: 'Reduces carbohydrate load while keeping the meal familiar.',
      price: 5.9
    }
  },
  {
    name: 'Rolled oats',
    category: 'Breakfast',
    quantity: '750 g',
    basePrice: 2.4,
    culturalTags: ['Western', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['heart healthy', 'high fibre'],
    avoidFor: [],
    reason: 'Low-cost breakfast that supports fibre intake and fullness.',
    swap: {
      name: 'No-added-sugar muesli',
      reason: 'More texture and variety without extra added sugar.',
      price: 4.8
    }
  },
  {
    name: 'Red lentils',
    category: 'Protein',
    quantity: '1 kg',
    basePrice: 4.1,
    culturalTags: ['Nepali', 'Indian', 'Middle Eastern', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['plant protein', 'iron', 'high fibre'],
    avoidFor: [],
    reason: 'Budget-friendly protein for dal, soup, and meal prep.',
    swap: {
      name: 'Mixed lentils and beans pack',
      reason: 'Adds variety, fibre and plant-based protein across the week.',
      price: 5.7
    }
  },
  {
    name: 'Chickpeas',
    category: 'Protein',
    quantity: '2 cans',
    basePrice: 2.6,
    culturalTags: ['Nepali', 'Indian', 'Middle Eastern', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['plant protein', 'high fibre'],
    avoidFor: [],
    reason: 'Easy protein for curry, salad, wraps, and snacks.',
    swap: {
      name: 'Salt-reduced chickpeas',
      reason: 'Lower sodium choice for blood pressure support.',
      price: 3.0
    }
  },
  {
    name: 'Eggs',
    category: 'Protein',
    quantity: '12 pack',
    basePrice: 5.4,
    culturalTags: ['Nepali', 'Indian', 'Western', 'Flexible'],
    dietTags: ['Balanced', 'High protein', 'Vegetarian'],
    healthTags: ['protein', 'B12'],
    avoidFor: ['Vegan'],
    reason: 'Quick, affordable protein for breakfast, fried rice, or curry.',
    swap: {
      name: 'Extra-firm tofu',
      reason: 'Plant-based protein with lower saturated fat.',
      price: 4.4
    }
  },
  {
    name: 'Skinless chicken breast',
    category: 'Protein',
    quantity: '700 g',
    basePrice: 8.9,
    culturalTags: ['Nepali', 'Indian', 'Western', 'Flexible'],
    dietTags: ['Balanced', 'High protein'],
    healthTags: ['lean protein'],
    avoidFor: ['Vegetarian', 'Vegan'],
    reason: 'Lean protein for meal prep, curry, salad, and wraps.',
    swap: {
      name: 'Skinless chicken thigh trimmed',
      reason: 'Often cheaper while still providing protein; trim visible fat.',
      price: 7.6
    }
  },
  {
    name: 'Extra-firm tofu',
    category: 'Protein',
    quantity: '450 g',
    basePrice: 4.4,
    culturalTags: ['East Asian', 'Nepali', 'Indian', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan', 'High protein'],
    healthTags: ['plant protein', 'low saturated fat'],
    avoidFor: [],
    reason: 'Affordable protein for stir-fry, curry, noodles, and bowls.',
    swap: {
      name: 'Tempeh',
      reason: 'Fermented soy option with more protein and texture.',
      price: 5.8
    }
  },
  {
    name: 'Plain Greek yoghurt',
    category: 'Dairy',
    quantity: '1 kg',
    basePrice: 5.2,
    culturalTags: ['Nepali', 'Indian', 'Western', 'Middle Eastern', 'Flexible'],
    dietTags: ['Balanced', 'High protein', 'Vegetarian'],
    healthTags: ['protein', 'calcium', 'gut health'],
    avoidFor: ['Vegan', 'Lactose intolerance'],
    reason: 'High-protein snack and base for raita, smoothies, and breakfast.',
    swap: {
      name: 'Unsweetened lactose-free yoghurt',
      reason: 'Similar use with less discomfort for lactose intolerance.',
      price: 6.3
    }
  },
  {
    name: 'Unsweetened soy milk',
    category: 'Dairy alternatives',
    quantity: '1 L',
    basePrice: 2.3,
    culturalTags: ['East Asian', 'Western', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['calcium fortified', 'low sugar'],
    avoidFor: [],
    reason: 'Low-sugar milk alternative for cereal, tea, coffee, and smoothies.',
    swap: {
      name: 'Calcium-fortified oat milk no added sugar',
      reason: 'Creamier option while keeping added sugar low.',
      price: 3.0
    }
  },
  {
    name: 'Frozen mixed vegetables',
    category: 'Vegetables',
    quantity: '1 kg',
    basePrice: 3.3,
    culturalTags: ['Nepali', 'Indian', 'Western', 'East Asian', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['budget produce', 'fibre'],
    avoidFor: [],
    reason: 'Cheap, low-waste vegetables for fried rice, soup, curry, or pasta.',
    swap: {
      name: 'Frozen spinach',
      reason: 'Adds iron, folate and greens to dal, curry and smoothies.',
      price: 2.8
    }
  },
  {
    name: 'Fresh spinach',
    category: 'Vegetables',
    quantity: '280 g',
    basePrice: 3.1,
    culturalTags: ['Nepali', 'Indian', 'Western', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['iron', 'folate', 'greens'],
    avoidFor: [],
    reason: 'Easy way to add greens to omelettes, dal, pasta, and wraps.',
    swap: {
      name: 'Frozen spinach',
      reason: 'Lower cost and longer shelf life.',
      price: 2.8
    }
  },
  {
    name: 'Carrots',
    category: 'Vegetables',
    quantity: '1 kg',
    basePrice: 2.1,
    culturalTags: ['Nepali', 'Indian', 'Western', 'East Asian', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['fibre', 'low cost'],
    avoidFor: [],
    reason: 'Versatile vegetable for snacks, curry, noodles, and soups.',
    swap: {
      name: 'Carrot and celery snack pack',
      reason: 'Ready-to-eat option for busy students.',
      price: 3.7
    }
  },
  {
    name: 'Broccoli',
    category: 'Vegetables',
    quantity: '2 heads',
    basePrice: 4.2,
    culturalTags: ['Western', 'East Asian', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['fibre', 'vitamin C'],
    avoidFor: [],
    reason: 'Adds fibre and micronutrients to stir-fries, bowls and pasta.',
    swap: {
      name: 'Frozen broccoli florets',
      reason: 'Cheaper, longer lasting and easy to portion.',
      price: 3.6
    }
  },
  {
    name: 'Tomatoes',
    category: 'Vegetables',
    quantity: '500 g',
    basePrice: 3.4,
    culturalTags: ['Nepali', 'Indian', 'Middle Eastern', 'Western', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['vitamin C', 'low energy density'],
    avoidFor: [],
    reason: 'Useful for curry base, salads, pasta, and sandwiches.',
    swap: {
      name: 'No-added-salt canned tomatoes',
      reason: 'Cheaper and lower sodium for sauces and curries.',
      price: 1.4
    }
  },
  {
    name: 'Bananas',
    category: 'Fruit',
    quantity: '1 kg',
    basePrice: 3.0,
    culturalTags: ['Nepali', 'Indian', 'Western', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['portable snack', 'potassium'],
    avoidFor: [],
    reason: 'Affordable portable fruit for snacks or breakfast.',
    swap: {
      name: 'Apples',
      reason: 'Higher fibre snack option with a lower glycaemic load.',
      price: 4.0
    }
  },
  {
    name: 'Apples',
    category: 'Fruit',
    quantity: '1 kg',
    basePrice: 4.0,
    culturalTags: ['Western', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['fibre', 'snack'],
    avoidFor: [],
    reason: 'Simple high-fibre snack for study or work days.',
    swap: {
      name: 'Seasonal fruit bag',
      reason: 'Usually better value and adds variety.',
      price: 3.6
    }
  },
  {
    name: 'Tuna in springwater',
    category: 'Protein',
    quantity: '4 cans',
    basePrice: 5.6,
    culturalTags: ['Western', 'Flexible'],
    dietTags: ['Balanced', 'High protein'],
    healthTags: ['protein', 'omega 3'],
    avoidFor: ['Vegetarian', 'Vegan'],
    reason: 'Shelf-stable protein for sandwiches, rice bowls, and salads.',
    swap: {
      name: 'Salt-reduced tuna in springwater',
      reason: 'Better option for blood pressure support.',
      price: 6.2
    }
  },
  {
    name: 'Wholemeal wraps',
    category: 'Bakery',
    quantity: '8 pack',
    basePrice: 3.7,
    culturalTags: ['Western', 'Middle Eastern', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['wholegrain', 'quick meal'],
    avoidFor: [],
    reason: 'Fast meal base for packed lunches and quick dinners.',
    swap: {
      name: 'High-fibre wholegrain wraps',
      reason: 'More fibre for fullness and gut health.',
      price: 4.5
    }
  },
  {
    name: 'Wholemeal bread',
    category: 'Bakery',
    quantity: '1 loaf',
    basePrice: 2.6,
    culturalTags: ['Western', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['wholegrain', 'budget'],
    avoidFor: [],
    reason: 'Affordable staple for breakfast and packed lunches.',
    swap: {
      name: 'Seeded wholegrain bread',
      reason: 'More fibre and healthy fats from seeds.',
      price: 4.4
    }
  },
  {
    name: 'Olive oil',
    category: 'Pantry',
    quantity: '500 ml',
    basePrice: 6.5,
    culturalTags: ['Western', 'Middle Eastern', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['heart healthy fats'],
    avoidFor: [],
    reason: 'Useful cooking oil with healthier fat profile.',
    swap: {
      name: 'Canola and olive oil blend',
      reason: 'Lower cost while still improving fat quality compared with butter.',
      price: 4.6
    }
  },
  {
    name: 'Reduced-salt soy sauce',
    category: 'Pantry',
    quantity: '250 ml',
    basePrice: 2.9,
    culturalTags: ['East Asian', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan'],
    healthTags: ['lower sodium'],
    avoidFor: [],
    reason: 'Adds flavour to stir-fries while reducing sodium compared with regular soy sauce.',
    swap: {
      name: 'Tamari reduced salt',
      reason: 'Gluten-free style option with less sodium.',
      price: 4.2
    }
  },
  {
    name: 'Curry spices starter pack',
    category: 'Pantry',
    quantity: 'turmeric, cumin, coriander',
    basePrice: 5.5,
    culturalTags: ['Nepali', 'Indian', 'Middle Eastern', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan', 'High protein'],
    healthTags: ['flavour without excess salt'],
    avoidFor: [],
    reason: 'Builds culturally familiar flavour without relying on salty sauces.',
    swap: {
      name: 'No-added-salt curry paste',
      reason: 'Faster cooking option while keeping sodium lower.',
      price: 4.9
    }
  },
  {
    name: 'Peanut butter no added sugar',
    category: 'Pantry',
    quantity: '375 g',
    basePrice: 3.8,
    culturalTags: ['Western', 'Flexible'],
    dietTags: ['Balanced', 'Vegetarian', 'Vegan', 'High protein'],
    healthTags: ['healthy fats', 'protein'],
    avoidFor: ['Nut allergy'],
    reason: 'Cheap protein-rich spread for breakfast and snacks.',
    swap: {
      name: '100% almond spread',
      reason: 'Different nutrient profile with no added sugar.',
      price: 6.8
    }
  }
];

const culturalOptions = ['Flexible', 'Nepali', 'Indian', 'East Asian', 'Middle Eastern', 'Western'];
const dietOptions = ['Balanced', 'Vegetarian', 'Vegan', 'High protein'];
const healthConditionOptions = ['Diabetes', 'Hypertension', 'High cholesterol', 'Lactose intolerance', 'Anaemia', 'Nut allergy'];
const healthGoalOptions = ['Eat healthier', 'Lose weight', 'Gain muscle', 'Save money', 'Improve energy', 'High fibre'];
const cookingTimeOptions = ['No cooking', 'Quick meals', 'Meal prep', 'I enjoy cooking'];

module.exports = {
  stores,
  products,
  culturalOptions,
  dietOptions,
  healthConditionOptions,
  healthGoalOptions,
  cookingTimeOptions
};
