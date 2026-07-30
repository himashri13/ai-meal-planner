import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import logger from '../src/utils/logger.js';
import config from '../src/config/env.js';

const prisma = new PrismaClient();

// Utility for hashing passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(config.jwt?.saltRounds || 10));
  return bcrypt.hash(password, salt);
};

// ---------------------------------------------------------
// 1. Core Data Generation Sets
// ---------------------------------------------------------

const baseIngredients = [
  { name: 'Rice', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: 'Paneer', calories: 265, protein: 18, carbs: 1.2, fat: 20 },
  { name: 'Milk', calories: 42, protein: 3.4, carbs: 5, fat: 1 },
  { name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { name: 'Tomato', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  { name: 'Potato', calories: 77, protein: 2, carbs: 17, fat: 0.1 },
  { name: 'Oats', calories: 389, protein: 16.9, carbs: 66, fat: 6.9 },
  { name: 'Broccoli', calories: 34, protein: 2.8, carbs: 6.6, fat: 0.4 },
  { name: 'Beans', calories: 347, protein: 21, carbs: 62, fat: 1.2 },
  { name: 'Lentils', calories: 116, protein: 9, carbs: 20, fat: 0.4 },
  { name: 'Banana', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
  { name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  { name: 'Olive Oil', calories: 884, protein: 0, carbs: 0, fat: 100 },
  { name: 'Almonds', calories: 579, protein: 21, carbs: 21, fat: 49 },
  { name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
  { name: 'Quinoa', calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9 },
  { name: 'Tofu', calories: 144, protein: 15.8, carbs: 2.8, fat: 8.7 },
  { name: 'Salmon', calories: 208, protein: 20, carbs: 0, fat: 13 }
];

// Dynamically generate the remaining 80 ingredients to reach 100
for (let i = 21; i <= 100; i++) {
  baseIngredients.push({
    name: `Ingredient ${i}`,
    calories: Math.floor(Math.random() * 200) + 10,
    protein: parseFloat((Math.random() * 20).toFixed(1)),
    carbs: parseFloat((Math.random() * 30).toFixed(1)),
    fat: parseFloat((Math.random() * 15).toFixed(1))
  });
}

const cuisines = ['INDIAN', 'ITALIAN', 'MEXICAN', 'ASIAN', 'MEDITERRANEAN', 'AMERICAN', 'OTHER'];
const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'DESSERT'];
const difficulties = ['EASY', 'MEDIUM', 'HARD'];

const generateMeals = (count) => {
  const generated = [];
  for (let i = 1; i <= count; i++) {
    const cuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
    const mealType = mealTypes[Math.floor(Math.random() * mealTypes.length)];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    
    generated.push({
      title: `${cuisine} ${mealType} Delight ${i}`,
      description: `A delicious and realistic ${difficulty.toLowerCase()} ${cuisine.toLowerCase()} recipe perfectly suited for ${mealType.toLowerCase()}.`,
      imageUrl: `https://example.com/images/meal-${i}.jpg`,
      calories: Math.floor(Math.random() * 500) + 200,
      protein: parseFloat((Math.random() * 40 + 10).toFixed(1)),
      carbs: parseFloat((Math.random() * 50 + 20).toFixed(1)),
      fat: parseFloat((Math.random() * 30 + 5).toFixed(1)),
      fiber: parseFloat((Math.random() * 10).toFixed(1)),
      sugar: parseFloat((Math.random() * 15).toFixed(1)),
      servings: Math.floor(Math.random() * 4) + 1,
      mealType,
      difficulty,
      cuisine,
      preparationTime: Math.floor(Math.random() * 30) + 5,
      cookingTime: Math.floor(Math.random() * 60) + 10,
      isAIGenerated: i % 5 === 0,
      isPublic: true
    });
  }
  return generated;
};

// ---------------------------------------------------------
// 2. Seeding Functions
// ---------------------------------------------------------

async function seedIngredients() {
  logger.info('Seeding Ingredients...');
  for (const ingredient of baseIngredients) {
    await prisma.ingredient.upsert({
      where: { name: ingredient.name },
      update: {},
      create: ingredient
    });
  }
}

async function seedMeals() {
  logger.info('Seeding Meals and MealIngredients...');
  const mealsData = generateMeals(50);
  const allIngredients = await prisma.ingredient.findMany();

  for (const [index, meal] of mealsData.entries()) {
    const createdMeal = await prisma.meal.upsert({
      where: { id: `meal-seed-${index}` }, // Using a pseudo-id check is tricky without a unique title, but title isn't unique in schema. 
      // We'll query by title to prevent dupes.
      update: {},
      create: meal,
    }).catch(async () => {
       // If upsert trick fails, find or create manually
       let existing = await prisma.meal.findFirst({ where: { title: meal.title } });
       if (!existing) {
         return await prisma.meal.create({ data: meal });
       }
       return existing;
    });

    const existingMeal = await prisma.meal.findFirst({ where: { title: meal.title } });

    // Link 3 random ingredients to each meal
    const ingredientsToLink = [
      allIngredients[Math.floor(Math.random() * allIngredients.length)],
      allIngredients[Math.floor(Math.random() * allIngredients.length)],
      allIngredients[Math.floor(Math.random() * allIngredients.length)]
    ];

    for (const ing of ingredientsToLink) {
      const linkExists = await prisma.mealIngredient.findFirst({
        where: { mealId: existingMeal.id, ingredientId: ing.id }
      });
      if (!linkExists) {
        await prisma.mealIngredient.create({
          data: {
            mealId: existingMeal.id,
            ingredientId: ing.id,
            quantity: Math.floor(Math.random() * 200) + 10,
            unit: 'GRAM'
          }
        });
      }
    }
  }
}

async function seedUsers() {
  logger.info('Seeding Core Users...');
  const defaultPassword = await hashPassword('Password123!');

  const users = [
    { email: 'admin@aimealplanner.com', username: 'admin', role: 'ADMIN' },
    { email: 'demo@aimealplanner.com', username: 'demo_user', role: 'USER' },
    { email: 'test@aimealplanner.com', username: 'test_user', role: 'USER' },
  ];

  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        username: u.username,
        password: defaultPassword,
        role: u.role,
        profile: {
          create: {
            firstName: u.username.split('_')[0],
            age: 30,
            gender: 'MALE',
            height: 180,
            weight: 85,
            targetWeight: 75,
            activityLevel: 'MODERATELY_ACTIVE',
            dietType: 'ANY',
            dailyCalories: 2500,
            dailyProtein: 150,
            dailyCarbs: 250,
            dailyFat: 80,
            dailyWaterGoal: 3000
          }
        },
        settings: {
          create: {
            weightUnit: 'KG',
            theme: 'dark'
          }
        }
      }
    });

    // Populate complex relations for Demo User
    if (u.username === 'demo_user') {
      logger.info('Seeding Demo User relationships...');
      await seedDemoUserRelations(user.id);
    }
  }
}

async function seedDemoUserRelations(userId) {
  // 1. Goals
  const existingGoal = await prisma.goal.findFirst({ where: { userId } });
  if (!existingGoal) {
    await prisma.goal.create({
      data: {
        userId,
        goalType: 'WEIGHT_LOSS',
        targetValue: 75,
        currentValue: 85,
        startDate: new Date()
      }
    });
  }

  // 2. Weight Logs (10 weeks)
  const existingWeightLogs = await prisma.weightLog.findMany({ where: { userId } });
  if (existingWeightLogs.length === 0) {
    for (let i = 0; i < 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (i * 7));
      await prisma.weightLog.create({
        data: {
          userId,
          weight: 85 - (i * 0.5), // Realistic 0.5kg per week loss
          date
        }
      });
    }
  }

  // 3. AI Recommendations
  const existingAiRec = await prisma.aIRecommendation.findFirst({ where: { userId } });
  if (!existingAiRec) {
    await prisma.aIRecommendation.create({
      data: {
        userId,
        prompt: 'How can I optimize my protein intake?',
        response: 'Increase your protein intake by adding more Greek Yogurt, Quinoa, and Chicken to your weekly plans.'
      }
    });
  }

  // 4. Meal Plan & Grocery List
  const allMeals = await prisma.meal.findMany({ take: 10 });
  const existingPlan = await prisma.mealPlan.findFirst({ where: { userId } });
  
  if (!existingPlan && allMeals.length > 0) {
    const mealPlan = await prisma.mealPlan.create({
      data: {
        userId,
        title: 'Weekly Cutting Plan',
        description: 'A robust 7-day high-protein plan.',
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        status: 'ACTIVE'
      }
    });

    // Link Meals to Plan
    for (const meal of allMeals) {
      await prisma.mealPlanMeal.create({
        data: {
          mealPlanId: mealPlan.id,
          mealId: meal.id,
          date: new Date(),
          mealType: meal.mealType
        }
      });
    }

    // Generate Grocery List
    const groceryList = await prisma.groceryList.create({
      data: {
        userId,
        mealPlanId: mealPlan.id
      }
    });

    await prisma.groceryItem.createMany({
      data: [
        { groceryListId: groceryList.id, name: 'Chicken Breast', quantity: 2, unit: 'PIECE', isPurchased: true },
        { groceryListId: groceryList.id, name: 'Broccoli', quantity: 500, unit: 'GRAM', isPurchased: false }
      ]
    });
  }
}

// ---------------------------------------------------------
// Execution Entrypoint
// ---------------------------------------------------------
async function main() {
  logger.info('Starting Prisma Database Seed...');
  await seedIngredients();
  await seedMeals();
  await seedUsers();
  logger.info('Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logger.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
