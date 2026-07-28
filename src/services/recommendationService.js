/**
 * Calculates BMI (Body Mass Index)
 * @param {number} weight - Weight in kg
 * @param {number} height - Height in cm
 * @returns {number} BMI value
 */
export const calculateBMI = (weight, height) => {
  if (!weight || !height || height === 0) return 0;
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return Number(bmi.toFixed(1));
};

/**
 * Returns the BMI Category
 * @param {number} bmi
 * @returns {string}
 */
export const getBMICategory = (bmi) => {
  if (bmi === 0) return "Unknown";
  if (bmi < 18.5) return "Underweight";
  if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
  if (bmi >= 25 && bmi < 29.9) return "Overweight";
  return "Obese";
};

/**
 * Calculates recommended daily water intake
 * Base: 0.033 L per kg of body weight
 * Activity adjustment: +0.3L to +0.8L depending on level
 * 
 * @param {number} weight - Weight in kg
 * @param {string} activityLevel - Activity level constant
 * @returns {number} Water in liters
 */
export const calculateWaterIntake = (weight, activityLevel) => {
  if (!weight) return 2.5; // Default fallback

  let baseWater = weight * 0.033;
  
  switch (activityLevel) {
    case 'sedentary':
      baseWater += 0.0;
      break;
    case 'lightly_active':
      baseWater += 0.3;
      break;
    case 'moderately_active':
      baseWater += 0.5;
      break;
    case 'very_active':
      baseWater += 0.8;
      break;
    default:
      baseWater += 0.3;
  }

  return Number(baseWater.toFixed(1));
};

/**
 * Calculates TDEE and applies goal modifiers for daily calorie target
 * Uses Mifflin-St Jeor Equation
 * 
 * @param {number} age 
 * @param {string} gender 
 * @param {number} weight - in kg
 * @param {number} height - in cm
 * @param {string} activityLevel 
 * @param {string} goal 
 * @returns {number} Daily calories
 */
export const calculateCalories = (age, gender, weight, height, activityLevel, goal) => {
  if (!age || !weight || !height) return 2000; // Fallback

  // Mifflin-St Jeor BMR
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // Activity Multiplier
  let multiplier = 1.2;
  switch (activityLevel) {
    case 'sedentary': multiplier = 1.2; break;
    case 'lightly_active': multiplier = 1.375; break;
    case 'moderately_active': multiplier = 1.55; break;
    case 'very_active': multiplier = 1.725; break;
  }

  const tdee = bmr * multiplier;

  // Goal Adjustment
  let targetCalories = tdee;
  switch (goal) {
    case 'weight_loss': targetCalories = tdee - 500; break;
    case 'weight_gain': targetCalories = tdee + 500; break;
    case 'muscle_gain': targetCalories = tdee + 300; break;
    case 'maintain_weight': targetCalories = tdee; break;
  }

  return Math.round(targetCalories);
};

/**
 * Calculates daily protein target in grams
 * 
 * @param {number} weight - in kg
 * @param {string} goal 
 * @returns {number} Protein in grams
 */
export const calculateProteinTarget = (weight, goal) => {
  if (!weight) return 50;

  let multiplier = 1.0; // Maintenance
  
  if (goal === 'weight_loss') multiplier = 1.6;
  if (goal === 'muscle_gain' || goal === 'weight_gain') multiplier = 2.0;

  return Math.round(weight * multiplier);
};

/**
 * Estimates the timeline to reach a goal (mock logic for demo)
 * 
 * @param {string} goal 
 * @returns {string} Estimated timeline string
 */
export const estimateGoalTimeline = (goal) => {
  switch (goal) {
    case 'weight_loss': return '12-16 weeks (sustainable 0.5kg/week)';
    case 'weight_gain': return '8-12 weeks (sustainable 0.25kg/week)';
    case 'muscle_gain': return '16-24 weeks';
    case 'maintain_weight': return 'Ongoing lifestyle';
    default: return '12 weeks';
  }
};
