import express from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import mealRoutes from './meal.routes.js';
import groceryRoutes from './grocery.routes.js';
import aiRoutes from './ai.routes.js';

const router = express.Router();

/**
 * Base Routes
 */
router.use('/health', healthRoutes);

/**
 * Future Module Placeholders (currently empty routers)
 */
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/meals', mealRoutes);
router.use('/groceries', groceryRoutes);
router.use('/ai', aiRoutes);
// router.use('/meal-plans', mealPlanRoutes); // Not created yet
// router.use('/dashboard', dashboardRoutes); // Not created yet

export default router;
