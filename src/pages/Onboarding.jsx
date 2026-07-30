import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Target, Activity, Leaf } from 'lucide-react';

import { useProfile } from '../hooks/useProfile';
import { calculateWaterIntake } from '../services/recommendationService';
import { calculateAge, convertToCm } from '../utils/mathUtils';
import { onboardingSchema } from '../schemas/profileSchema';
import { 
  ACTIVITY_LEVELS, GOALS, FOOD_PREFERENCES, ALLERGIES, INGREDIENT_DISLIKES,
  LIFESTYLES, COOKING_HABITS, BUDGETS, HEALTH_CONDITIONS
} from '../constants/profileConstants';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import RadioCard from '../components/ui/RadioCard';
import ProgressBar from '../components/ui/ProgressBar';
import MultiSelectPill from '../components/ui/MultiSelectPill';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { updateProfile: saveProfileToContext } = useProfile();

  const { register, trigger, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(onboardingSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '', dateOfBirth: '', weight: '', heightFt: '', heightIn: '', gender: '', 
      goal: '', activityLevel: '', diet: '', 
      allergies: [], ingredientDislikes: [], waterGoal: 0,
      lifestyle: '', cookingHabit: '', budget: '', healthConditions: []
    }
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const formValues = watch();
  const totalSteps = 8;
  
  const computedAge = calculateAge(formValues.dateOfBirth);

  // Auto-calculate water target when reaching step 6 based on weight & activity
  useEffect(() => {
    if (currentStep === 6 && formValues.weight && formValues.activityLevel) {
      if (!formValues.waterGoal || formValues.waterGoal === 0) {
        const rec = calculateWaterIntake(formValues.weight, formValues.activityLevel);
        setValue('waterGoal', rec);
      }
    }
  }, [currentStep, formValues.weight, formValues.activityLevel, setValue, formValues.waterGoal]);

  const nextStep = async () => {
    let fields = [];
    if (currentStep === 1) fields = ['fullName', 'dateOfBirth', 'weight', 'heightFt', 'heightIn', 'gender'];
    if (currentStep === 2) fields = ['goal'];
    if (currentStep === 3) fields = ['activityLevel'];
    if (currentStep === 4) fields = ['diet'];
    if (currentStep === 5) fields = ['allergies', 'ingredientDislikes'];
    if (currentStep === 6) fields = ['waterGoal'];
    if (currentStep === 7) fields = ['lifestyle', 'cookingHabit', 'budget'];
    if (currentStep === 8) fields = ['healthConditions'];
    
    const isValid = await trigger(fields);
    if (isValid) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Construct structured UserProfile
    const userProfile = {
      personalInfo: { 
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth,
        age: calculateAge(data.dateOfBirth),
        gender: data.gender, 
        weight: data.weight, 
        heightFt: data.heightFt,
        heightIn: data.heightIn,
        heightCm: convertToCm(data.heightFt, data.heightIn) 
      },
      nutrition: { waterGoal: data.waterGoal },
      preferences: { diet: data.diet, ingredientDislikes: data.ingredientDislikes, budget: data.budget },
      health: { allergies: data.allergies, conditions: data.healthConditions },
      lifestyle: { activityLevel: data.activityLevel, goal: data.goal, type: data.lifestyle, cookingHabit: data.cookingHabit }
    };
    
    // Save stable profile
    await saveProfileToContext(userProfile);
    navigate('/dashboard');
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-wellness-50 p-4">
        <LoadingSpinner />
        <h2 className="text-2xl font-semibold text-slate-800 text-center mt-6">Creating your personalized nutrition profile...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-wellness-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-6 sm:p-10 mt-10">
        
        <ProgressBar 
          percentage={Math.round((currentStep / totalSteps) * 100)} 
          label={`Step ${currentStep} of ${totalSteps}`}
          subLabel={`${Math.round((currentStep / totalSteps) * 100)}% Completed`}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          
          {/* STEP 1: Basic Info */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Basic Information</h2>
              <p className="text-slate-500 text-sm mb-6">These details help us tailor a healthy baseline just for you.</p>
              
              <div className="mb-4">
                <Input id="fullName" label="Full Name" type="text" placeholder="Jane Doe" {...register("fullName")} error={errors.fullName?.message} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input id="dateOfBirth" label="Date of Birth" type="date" {...register("dateOfBirth")} error={errors.dateOfBirth?.message} />
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700">Age</label>
                  <input 
                    type="text" 
                    value={computedAge || 'Automatically calculated'} 
                    readOnly 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Input id="weight" label="Weight (kg)" type="number" placeholder="70" {...register("weight")} error={errors.weight?.message} />
                <Input id="heightFt" label="Height (Feet)" type="number" placeholder="5" {...register("heightFt")} error={errors.heightFt?.message} />
                <Input id="heightIn" label="Height (Inches)" type="number" placeholder="9" {...register("heightIn")} error={errors.heightIn?.message} />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Gender</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <RadioCard id="gender-male" value="male" label="Male" {...register("gender")} checked={formValues.gender === 'male'} />
                  <RadioCard id="gender-female" value="female" label="Female" {...register("gender")} checked={formValues.gender === 'female'} />
                  <RadioCard id="gender-other" value="other" label="Other" {...register("gender")} checked={formValues.gender === 'other'} />
                </div>
                {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>}
              </div>
            </div>
          )}

          {/* STEP 2: Goal */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">What is your primary goal?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {GOALS.map(g => (
                  <RadioCard key={g.value} id={`goal-${g.value}`} value={g.value} label={g.label} description={g.description} icon={Target} {...register("goal")} checked={formValues.goal === g.value} />
                ))}
              </div>
              {errors.goal && <p className="text-sm text-red-500 mt-2">{errors.goal.message}</p>}
            </div>
          )}

          {/* STEP 3: Activity Level */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Activity Level</h2>
              <div className="flex flex-col space-y-4 mt-6">
                {ACTIVITY_LEVELS.map(act => (
                  <RadioCard key={act.value} id={`act-${act.value}`} value={act.value} label={act.label} description={act.description} icon={Activity} {...register("activityLevel")} checked={formValues.activityLevel === act.value} />
                ))}
              </div>
              {errors.activityLevel && <p className="text-sm text-red-500 mt-2">{errors.activityLevel.message}</p>}
            </div>
          )}

          {/* STEP 4: Food Preference */}
          {currentStep === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Food Preferences</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {FOOD_PREFERENCES.map(diet => (
                  <RadioCard key={diet.value} id={`diet-${diet.value}`} value={diet.value} label={diet.label} icon={Leaf} {...register("diet")} checked={formValues.diet === diet.value} />
                ))}
              </div>
              {errors.diet && <p className="text-sm text-red-500 mt-2">{errors.diet.message}</p>}
            </div>
          )}

          {/* STEP 5: Allergies & Dislikes */}
          {currentStep === 5 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Allergies & Restrictions</h2>
              
              <div className="mt-6 mb-8">
                <label className="text-sm font-medium text-slate-700 block mb-3">Dietary Allergies</label>
                <div className="flex flex-wrap gap-2">
                  {ALLERGIES.map(allergen => (
                    <MultiSelectPill 
                      key={allergen} label={allergen} selected={formValues.allergies.includes(allergen)}
                      onClick={() => {
                        const newAllergies = formValues.allergies.includes(allergen)
                          ? formValues.allergies.filter(a => a !== allergen)
                          : [...formValues.allergies, allergen];
                        setValue('allergies', newAllergies);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-3">Ingredient Dislikes (Optional)</label>
                <div className="flex flex-wrap gap-2">
                  {INGREDIENT_DISLIKES.map(dislike => (
                    <MultiSelectPill 
                      key={dislike} label={dislike} selected={formValues.ingredientDislikes.includes(dislike)}
                      onClick={() => {
                        const newDislikes = formValues.ingredientDislikes.includes(dislike)
                          ? formValues.ingredientDislikes.filter(a => a !== dislike)
                          : [...formValues.ingredientDislikes, dislike];
                        setValue('ingredientDislikes', newDislikes);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Water Goal */}
          {currentStep === 6 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Smart Water Intake</h2>
              <p className="text-slate-500 text-sm mb-6">Based on your profile, we recommend this daily water intake. You can edit it manually.</p>
              
              <div className="max-w-xs">
                <Input 
                  id="waterGoal" 
                  label="Daily Water (Liters)" 
                  type="number" 
                  step="0.1" 
                  {...register("waterGoal")} 
                  error={errors.waterGoal?.message} 
                />
              </div>
            </div>
          )}

          {/* STEP 7: Advanced Lifestyle */}
          {currentStep === 7 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Lifestyle & Cooking</h2>
              <p className="text-slate-500 text-sm mb-6">Let's make sure the meals fit your daily routine and budget.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-3">Living Situation</label>
                  <div className="flex flex-wrap gap-2">
                    {LIFESTYLES.map(life => (
                      <MultiSelectPill 
                        key={life} label={life} selected={formValues.lifestyle === life}
                        onClick={() => setValue('lifestyle', life)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-3">Cooking Habits</label>
                  <div className="flex flex-wrap gap-2">
                    {COOKING_HABITS.map(habit => (
                      <MultiSelectPill 
                        key={habit} label={habit} selected={formValues.cookingHabit === habit}
                        onClick={() => setValue('cookingHabit', habit)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-3">Grocery Budget</label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map(budget => (
                      <MultiSelectPill 
                        key={budget} label={budget} selected={formValues.budget === budget}
                        onClick={() => setValue('budget', budget)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Health Conditions */}
          {currentStep === 8 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Health Conditions</h2>
              <p className="text-slate-500 text-sm mb-6">Select any conditions you want the AI to consider for your nutrition plan.</p>
              
              <div className="flex flex-wrap gap-2">
                {HEALTH_CONDITIONS.map(condition => (
                  <MultiSelectPill 
                    key={condition} label={condition} selected={formValues.healthConditions.includes(condition)}
                    onClick={() => {
                      const newConditions = formValues.healthConditions.includes(condition)
                        ? formValues.healthConditions.filter(c => c !== condition)
                        : [...formValues.healthConditions, condition];
                      setValue('healthConditions', newConditions);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
            <Button variant="ghost" type="button" onClick={prevStep} className={currentStep === 1 ? 'invisible' : ''}>
              Back
            </Button>
            
            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep}>Continue</Button>
            ) : (
              <Button type="submit">Complete Profile</Button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
