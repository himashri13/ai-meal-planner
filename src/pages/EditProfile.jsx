import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Target, Activity, Leaf, ArrowLeft, Save, ActivitySquare } from 'lucide-react';

import { useProfile } from '../hooks/useProfile';
import { 
  calculateBMI, getBMICategory, calculateCalories, 
  calculateProteinTarget, calculateWaterIntake 
} from '../services/recommendationService';
import { convertToCm } from '../utils/mathUtils';
import { editProfileSchema } from '../schemas/profileSchema';
import { 
  ACTIVITY_LEVELS, GOALS, FOOD_PREFERENCES, ALLERGIES, INGREDIENT_DISLIKES
} from '../constants/profileConstants';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import RadioCard from '../components/ui/RadioCard';
import MultiSelectPill from '../components/ui/MultiSelectPill';

export default function EditProfile() {
  const navigate = useNavigate();
  const { profile: initialProfile, loading, updateProfile: saveProfile } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(editProfileSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (loading) return;
    if (initialProfile) {
      setValue('fullName', initialProfile.personalInfo.fullName);
      setValue('age', initialProfile.personalInfo.age);
      setValue('gender', initialProfile.personalInfo.gender);
      setValue('weight', initialProfile.personalInfo.weight);
      setValue('heightFt', initialProfile.personalInfo.heightFt);
      setValue('heightIn', initialProfile.personalInfo.heightIn);
      setValue('goal', initialProfile.lifestyle.goal);
      setValue('activityLevel', initialProfile.lifestyle.activityLevel);
      setValue('diet', initialProfile.preferences.diet);
      setValue('allergies', initialProfile.health.allergies || []);
      setValue('ingredientDislikes', initialProfile.preferences.ingredientDislikes || []);
    } else {
      navigate('/onboarding');
    }
  }, [initialProfile, loading, setValue, navigate]);

  const formValues = useWatch({ control });

  if (!initialProfile) return null;

  // Real-time calculations
  const currentWeight = formValues.weight || initialProfile.personalInfo.weight;
  const currentHeightFt = formValues.heightFt || initialProfile.personalInfo.heightFt;
  const currentHeightIn = formValues.heightIn || initialProfile.personalInfo.heightIn;
  const currentAge = formValues.age || initialProfile.personalInfo.age;
  const currentGender = formValues.gender || initialProfile.personalInfo.gender;
  const currentGoal = formValues.goal || initialProfile.lifestyle.goal;
  const currentActivity = formValues.activityLevel || initialProfile.lifestyle.activityLevel;
  
  const currentHeightCm = convertToCm(currentHeightFt, currentHeightIn);
  
  const liveBmi = calculateBMI(currentWeight, currentHeightCm);
  const liveBmiCategory = getBMICategory(liveBmi);
  const liveCalories = calculateCalories(currentAge, currentGender, currentWeight, currentHeightCm, currentActivity, currentGoal);
  const liveProtein = calculateProteinTarget(currentWeight, currentGoal);
  const liveWater = calculateWaterIntake(currentWeight, currentActivity);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    const updatedProfile = {
      ...initialProfile,
      personalInfo: {
        ...initialProfile.personalInfo,
        fullName: data.fullName,
        age: data.age,
        gender: data.gender,
        weight: data.weight,
        heightFt: data.heightFt,
        heightIn: data.heightIn,
        heightCm: convertToCm(data.heightFt, data.heightIn)
      },
      nutrition: {
        ...initialProfile.nutrition,
        waterGoal: calculateWaterIntake(data.weight, data.activityLevel)
      },
      preferences: {
        ...initialProfile.preferences,
        diet: data.diet,
        ingredientDislikes: data.ingredientDislikes,
      },
      health: {
        ...initialProfile.health,
        allergies: data.allergies
      },
      lifestyle: {
        ...initialProfile.lifestyle,
        goal: data.goal,
        activityLevel: data.activityLevel
      }
    };
    
    await saveProfile(updatedProfile);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-wellness-50 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-nav">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="font-bold text-slate-800 text-lg">Edit Profile</h1>
          </div>
          <Button 
            onClick={handleSubmit(onSubmit)} 
            disabled={isSubmitting}
            className="h-10 px-4 flex items-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Save Changes
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Form Content */}
          <div className="flex-1 space-y-8">
            <form id="editProfileForm" onSubmit={handleSubmit(onSubmit)}>
              
              {/* Basic Info */}
              <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Basic Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Input id="fullName" label="Full Name" type="text" {...register("fullName")} error={errors.fullName?.message} />
                  <Input id="age" label="Age" type="number" {...register("age")} error={errors.age?.message} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <Input id="weight" label="Weight (kg)" type="number" {...register("weight")} error={errors.weight?.message} />
                  <Input id="heightFt" label="Height (Feet)" type="number" {...register("heightFt")} error={errors.heightFt?.message} />
                  <Input id="heightIn" label="Height (Inches)" type="number" {...register("heightIn")} error={errors.heightIn?.message} />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-700">Gender</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <RadioCard id="gender-male" value="male" label="Male" {...register("gender")} checked={formValues.gender === 'male'} />
                    <RadioCard id="gender-female" value="female" label="Female" {...register("gender")} checked={formValues.gender === 'female'} />
                    <RadioCard id="gender-other" value="other" label="Other" {...register("gender")} checked={formValues.gender === 'other'} />
                  </div>
                </div>
              </section>

              {/* Goal & Activity */}
              <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 mt-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Goal & Activity</h2>
                
                <div className="mb-8">
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Primary Goal</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {GOALS.map(g => (
                      <RadioCard key={g.value} id={`goal-${g.value}`} value={g.value} label={g.label} description={g.description} icon={Target} {...register("goal")} checked={formValues.goal === g.value} />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Activity Level</label>
                  <div className="flex flex-col space-y-3">
                    {ACTIVITY_LEVELS.map(act => (
                      <RadioCard key={act.value} id={`act-${act.value}`} value={act.value} label={act.label} description={act.description} icon={Activity} {...register("activityLevel")} checked={formValues.activityLevel === act.value} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Dietary Preferences */}
              <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 mt-8">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Dietary Preferences</h2>
                
                <div className="mb-8">
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Food Preference</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FOOD_PREFERENCES.map(diet => (
                      <RadioCard key={diet.value} id={`diet-${diet.value}`} value={diet.value} label={diet.label} icon={Leaf} {...register("diet")} checked={formValues.diet === diet.value} />
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Allergies</label>
                  <div className="flex flex-wrap gap-2">
                    {ALLERGIES.map(allergen => (
                      <MultiSelectPill 
                        key={allergen} label={allergen} selected={formValues.allergies?.includes(allergen)}
                        onClick={() => {
                          const current = formValues.allergies || [];
                          const newArr = current.includes(allergen) ? current.filter(a => a !== allergen) : [...current, allergen];
                          setValue('allergies', newArr);
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Ingredient Dislikes</label>
                  <div className="flex flex-wrap gap-2">
                    {INGREDIENT_DISLIKES.map(dislike => (
                      <MultiSelectPill 
                        key={dislike} label={dislike} selected={formValues.ingredientDislikes?.includes(dislike)}
                        onClick={() => {
                          const current = formValues.ingredientDislikes || [];
                          const newArr = current.includes(dislike) ? current.filter(d => d !== dislike) : [...current, dislike];
                          setValue('ingredientDislikes', newArr);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </section>

            </form>
          </div>

          {/* Sticky Preview Sidebar */}
          <div className="w-full lg:w-80">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-wellness-600 to-wellness-700 rounded-3xl p-6 text-white shadow-lg border border-wellness-500 overflow-hidden relative">
                <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                  <ActivitySquare size={160} />
                </div>
                
                <h3 className="text-lg font-bold mb-6 relative z-content">Live Impact</h3>
                
                <div className="space-y-5 relative z-content">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                    <div className="text-wellness-100 text-sm font-medium mb-1">Body Mass Index</div>
                    <div className="text-2xl font-bold">{liveBmi || '--'}</div>
                    <div className="text-xs font-semibold text-wellness-200 mt-1">{liveBmiCategory || '--'}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-wellness-100 text-xs font-medium mb-1">Calories</div>
                      <div className="text-xl font-bold">{liveCalories || '--'} <span className="text-sm font-normal text-wellness-200">kcal</span></div>
                    </div>
                    <div>
                      <div className="text-wellness-100 text-xs font-medium mb-1">Protein</div>
                      <div className="text-xl font-bold">{liveProtein || '--'} <span className="text-sm font-normal text-wellness-200">g</span></div>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-white/10">
                      <div className="text-wellness-100 text-xs font-medium mb-1">Water Target</div>
                      <div className="text-lg font-bold">{liveWater || '--'} <span className="text-sm font-normal text-wellness-200">Liters</span></div>
                    </div>
                  </div>
                </div>
                
              </div>
              
              <p className="text-xs text-slate-400 text-center mt-4">
                Targets update automatically as you adjust your profile.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
