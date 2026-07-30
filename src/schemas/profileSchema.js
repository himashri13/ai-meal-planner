import { z } from 'zod';
import { calculateAge } from '../utils/mathUtils';

// Helper for generic text arrays
const textArray = z.array(z.string()).default([]);

// 1. Basic Info
export const step1Schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  dateOfBirth: z.string().min(1, "Please select your date of birth").refine(val => {
    const age = calculateAge(val);
    return age >= 12 && age <= 120;
  }, { message: "You must be between 12 and 120 years old" }),
  weight: z.coerce.number().min(30, "Enter weight in kg").max(300, "Enter a valid weight"),
  heightFt: z.coerce.number().min(1, "Valid feet (1-8)").max(8),
  heightIn: z.coerce.number().min(0, "Valid inches (0-11)").max(11),
  gender: z.enum(['male', 'female', 'other'], { errorMap: () => ({ message: "Select a gender" }) }),
});

export const step2Schema = z.object({ goal: z.string().min(1, "Please select a goal") });
export const step3Schema = z.object({ activityLevel: z.string().min(1, "Please select an activity level") });
export const step4Schema = z.object({ diet: z.string().min(1, "Please select a food preference") });
export const step5Schema = z.object({ allergies: textArray, ingredientDislikes: textArray });
export const step6Schema = z.object({ waterGoal: z.coerce.number().min(0.5, "Must be at least 0.5L").max(8, "Cannot exceed 8L") });
export const step7Schema = z.object({ lifestyle: z.string().optional(), cookingHabit: z.string().optional(), budget: z.string().optional() });
export const step8Schema = z.object({ healthConditions: textArray });

export const onboardingSchema = z.intersection(step1Schema, step2Schema)
  .and(step3Schema).and(step4Schema).and(step5Schema).and(step6Schema)
  .and(step7Schema).and(step8Schema);

export const editProfileSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  age: z.coerce.number().min(12).max(120),
  gender: z.enum(['male', 'female', 'other']),
  weight: z.coerce.number().min(30, "Enter weight in kg").max(300, "Enter a valid weight"),
  heightFt: z.coerce.number().min(1).max(8),
  heightIn: z.coerce.number().min(0).max(11),
  goal: z.string().min(1, "Please select a goal"),
  activityLevel: z.string().min(1, "Please select an activity level"),
  diet: z.string().min(1, "Please select a food preference"),
  allergies: textArray,
  ingredientDislikes: textArray,
});
