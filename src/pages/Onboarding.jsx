import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Target, Activity, Flame, Heart, Zap, Leaf, Wheat, Apple, User, ActivitySquare } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import RadioCard from '../components/ui/RadioCard';
import ProgressBar from '../components/ui/ProgressBar';
import MultiSelectPill from '../components/ui/MultiSelectPill';

// 1. Basic Info
const step1Schema = z.object({
  age: z.coerce.number().min(12, "Must be at least 12 years old").max(120, "Please enter a valid age"),
  weight: z.coerce.number().min(30, "Please enter weight in kg").max(300, "Please enter a valid weight"),
  gender: z.enum(['male', 'female', 'other'], { errorMap: () => ({ message: "Please select a gender" }) }),
  heightMode: z.enum(['cm', 'ft']),
  heightCm: z.coerce.number().optional(),
  heightFt: z.coerce.number().optional(),
  heightIn: z.coerce.number().optional(),
}).superRefine((data, ctx) => {
  if (data.heightMode === 'cm') {
    if (!data.heightCm || data.heightCm < 50 || data.heightCm > 250) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid height (50-250 cm)",
        path: ['heightCm'],
      });
    }
  } else {
    if (!data.heightFt || data.heightFt < 1 || data.heightFt > 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valid feet (1-8)",
        path: ['heightFt'],
      });
    }
    if (data.heightIn === undefined || isNaN(data.heightIn) || data.heightIn < 0 || data.heightIn > 11) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valid inches (0-11)",
        path: ['heightIn'],
      });
    }
  }
});

// 2. Goal
const step2Schema = z.object({
  goal: z.enum(['lose', 'gain_weight', 'maintain', 'build', 'healthy'], { errorMap: () => ({ message: "Please select a goal" }) }),
});

// 3. Activity Level
const step3Schema = z.object({
  activityLevel: z.enum(['sedentary', 'moderate', 'active', 'very_active'], { errorMap: () => ({ message: "Please select an activity level" }) }),
});

// 4. Food Preference
const step4Schema = z.object({
  diet: z.enum(['vegetarian', 'vegan', 'eggetarian', 'non-veg', 'jain'], { errorMap: () => ({ message: "Please select a food preference" }) }),
});

// 5. Allergies (optional)
const step5Schema = z.object({
  allergies: z.array(z.string()).default([]),
});

// Combined Schema
const onboardingSchema = z.intersection(
  step1Schema,
  z.intersection(
    step2Schema,
    z.intersection(step3Schema, z.intersection(step4Schema, step5Schema))
  )
);

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    trigger,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    mode: 'onTouched', // Validate on touch
    defaultValues: {
      gender: '',
      goal: '',
      activityLevel: '',
      diet: '',
      allergies: [],
      heightMode: 'cm',
    }
  });

  const watchGender = watch('gender');
  const watchGoal = watch('goal');
  const watchActivity = watch('activityLevel');
  const watchDiet = watch('diet');
  const watchHeightMode = watch('heightMode');
  const watchAllergies = watch('allergies');

  const totalSteps = 5;

  const nextStep = async () => {
    // Determine which fields to validate based on current step
    let fieldsToValidate = [];
    if (currentStep === 1) fieldsToValidate = ['age', 'weight', 'gender', 'heightMode', 'heightCm', 'heightFt', 'heightIn'];
    if (currentStep === 2) fieldsToValidate = ['goal'];
    if (currentStep === 3) fieldsToValidate = ['activityLevel'];
    if (currentStep === 4) fieldsToValidate = ['diet'];
    
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Standardize height to cm
    let finalHeightCm = data.heightCm;
    if (data.heightMode === 'ft') {
      // 1 foot = 30.48 cm, 1 inch = 2.54 cm
      finalHeightCm = Math.round((data.heightFt * 30.48) + (data.heightIn * 2.54));
    }

    const payload = {
      ...data,
      height: finalHeightCm
    };
    
    // Remove temporary height fields
    delete payload.heightMode;
    delete payload.heightCm;
    delete payload.heightFt;
    delete payload.heightIn;

    // Simulate API call to create profile
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Onboarding profile data:", payload);
    navigate('/dashboard');
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wellness-50 p-4 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-wellness-200/40 blur-3xl" />
        <div className="w-16 h-16 border-4 border-wellness-200 border-t-wellness-600 rounded-full animate-spin mb-6 relative z-10" />
        <h2 className="text-2xl font-semibold text-slate-800 relative z-10 text-center">Creating your personalized nutrition profile...</h2>
        <p className="text-slate-500 mt-2 relative z-10 text-center max-w-md">We are analyzing your inputs to generate the best meal plan for your goals.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-wellness-50 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-wellness-200/40 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-wellness-300/30 blur-3xl" aria-hidden="true" />

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-wellness-900/5 p-6 sm:p-10 relative z-10 border border-white/50 mt-10">
        
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          
          {/* STEP 1: Basic Info */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Basic Information</h2>
              <p className="text-slate-500 text-sm mb-6">Tell us a bit about yourself so we can calculate your daily calorie needs.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Input id="age" label="Age" type="number" placeholder="25" {...register("age")} error={errors.age?.message} />
                <Input id="weight" label="Weight (kg)" type="number" placeholder="70" {...register("weight")} error={errors.weight?.message} />
              </div>

              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium text-slate-700">Height</label>
                
                {/* Height Mode Toggle */}
                <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                  <label className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-lg transition-colors ${watchHeightMode === 'cm' ? 'bg-white shadow-sm text-wellness-700' : 'text-slate-600 hover:text-slate-900'}`}>
                    <input type="radio" value="cm" {...register("heightMode")} className="sr-only" />
                    Centimeters (cm)
                  </label>
                  <label className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-lg transition-colors ${watchHeightMode === 'ft' ? 'bg-white shadow-sm text-wellness-700' : 'text-slate-600 hover:text-slate-900'}`}>
                    <input type="radio" value="ft" {...register("heightMode")} className="sr-only" />
                    Feet & Inches
                  </label>
                </div>

                {/* Height Inputs */}
                {watchHeightMode === 'cm' ? (
                  <div className="w-full sm:w-1/3">
                    <Input id="heightCm" type="number" placeholder="175" {...register("heightCm")} error={errors.heightCm?.message} />
                  </div>
                ) : (
                  <div className="flex gap-4 w-full sm:w-2/3">
                    <div className="flex-1">
                      <Input id="heightFt" label="Feet" type="number" placeholder="5" {...register("heightFt")} error={errors.heightFt?.message} />
                    </div>
                    <div className="flex-1">
                      <Input id="heightIn" label="Inches" type="number" placeholder="9" {...register("heightIn")} error={errors.heightIn?.message} />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Gender</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <RadioCard id="gender-male" value="male" label="Male" {...register("gender")} checked={watchGender === 'male'} />
                  <RadioCard id="gender-female" value="female" label="Female" {...register("gender")} checked={watchGender === 'female'} />
                  <RadioCard id="gender-other" value="other" label="Other" {...register("gender")} checked={watchGender === 'other'} />
                </div>
                {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>}
              </div>
            </div>
          )}

          {/* STEP 2: Goal */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">What is your primary goal?</h2>
              <p className="text-slate-500 text-sm mb-6">Choose the goal that best aligns with what you want to achieve.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RadioCard id="goal-lose" value="lose" label="Lose Weight" description="Burn fat and get leaner" icon={Flame} {...register("goal")} checked={watchGoal === 'lose'} />
                <RadioCard id="goal-gain" value="gain_weight" label="Gain Weight" description="Increase body mass safely" icon={Zap} {...register("goal")} checked={watchGoal === 'gain_weight'} />
                <RadioCard id="goal-build" value="build" label="Build Muscle" description="Focus on strength training" icon={Target} {...register("goal")} checked={watchGoal === 'build'} />
                <RadioCard id="goal-maintain" value="maintain" label="Maintain Weight" description="Keep current physique" icon={ActivitySquare} {...register("goal")} checked={watchGoal === 'maintain'} />
                <RadioCard id="goal-healthy" value="healthy" label="Healthy Eating" description="Focus on nutrition" icon={Heart} {...register("goal")} checked={watchGoal === 'healthy'} />
              </div>
              {errors.goal && <p className="text-sm text-red-500 mt-2">{errors.goal.message}</p>}
            </div>
          )}

          {/* STEP 3: Activity Level */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Activity Level</h2>
              <p className="text-slate-500 text-sm mb-6">How active are you on a typical day?</p>
              
              <div className="flex flex-col space-y-4">
                <RadioCard id="act-sedentary" value="sedentary" label="Sedentary" description="Little or no exercise, desk job" icon={User} {...register("activityLevel")} checked={watchActivity === 'sedentary'} />
                <RadioCard id="act-moderate" value="moderate" label="Lightly Active" description="Light exercise/sports 1-3 days/week" icon={Activity} {...register("activityLevel")} checked={watchActivity === 'moderate'} />
                <RadioCard id="act-active" value="active" label="Active" description="Moderate exercise/sports 3-5 days/week" icon={Zap} {...register("activityLevel")} checked={watchActivity === 'active'} />
                <RadioCard id="act-very_active" value="very_active" label="Very Active" description="Hard exercise/sports 6-7 days a week" icon={Flame} {...register("activityLevel")} checked={watchActivity === 'very_active'} />
              </div>
              {errors.activityLevel && <p className="text-sm text-red-500 mt-2">{errors.activityLevel.message}</p>}
            </div>
          )}

          {/* STEP 4: Food Preference */}
          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Food Preferences</h2>
              <p className="text-slate-500 text-sm mb-6">Select your dietary preference to help us filter recipes.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RadioCard id="diet-veg" value="vegetarian" label="Vegetarian" description="No meat, includes dairy" icon={Leaf} {...register("diet")} checked={watchDiet === 'vegetarian'} />
                <RadioCard id="diet-vegan" value="vegan" label="Vegan" description="Strictly plant-based" icon={Wheat} {...register("diet")} checked={watchDiet === 'vegan'} />
                <RadioCard id="diet-egg" value="eggetarian" label="Eggetarian" description="Vegetarian + Eggs" icon={Apple} {...register("diet")} checked={watchDiet === 'eggetarian'} />
                <RadioCard id="diet-nonveg" value="non-veg" label="Non-Vegetarian" description="Eats everything including meat" icon={Heart} {...register("diet")} checked={watchDiet === 'non-veg'} />
                <RadioCard id="diet-jain" value="jain" label="Jain" description="No root vegetables, purely vegetarian" icon={Leaf} {...register("diet")} checked={watchDiet === 'jain'} />
              </div>
              {errors.diet && <p className="text-sm text-red-500 mt-2">{errors.diet.message}</p>}
            </div>
          )}

          {/* STEP 5: Allergies */}
          {currentStep === 5 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Allergies & Restrictions</h2>
              <p className="text-slate-500 text-sm mb-6">List any food allergies or specific ingredients you want to avoid (optional).</p>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['Dairy', 'Gluten', 'Peanuts', 'Tree Nuts', 'Soy', 'Eggs', 'Fish', 'Shellfish'].map(allergen => (
                    <MultiSelectPill 
                      key={allergen}
                      label={allergen}
                      selected={watchAllergies.includes(allergen)}
                      onClick={() => {
                        const newAllergies = watchAllergies.includes(allergen)
                          ? watchAllergies.filter(a => a !== allergen)
                          : [...watchAllergies, allergen];
                        setValue('allergies', newAllergies, { shouldValidate: true });
                      }}
                    />
                  ))}
                </div>
                
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm text-slate-500">None of these apply?</span>
                  <button
                    type="button"
                    onClick={() => setValue('allergies', [])}
                    className="text-sm font-medium text-wellness-600 hover:text-wellness-800"
                  >
                    Clear Selections (Skip)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
            <Button 
              variant="ghost" 
              onClick={prevStep} 
              disabled={currentStep === 1}
              className={currentStep === 1 ? 'invisible' : ''}
            >
              Back
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button type="submit">
                Complete Profile
              </Button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
