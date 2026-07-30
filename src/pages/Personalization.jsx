import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { HeartPulse, UtensilsCrossed, Clock, Wallet, ChefHat, Droplets, UserCircle, ArrowLeft } from 'lucide-react';
import CollapsibleCard from '../components/ui/CollapsibleCard';
import MultiSelectPill from '../components/ui/MultiSelectPill';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import FormRadioGroup from '../components/ui/FormRadioGroup';

export default function Personalization() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form with empty default values to track completion
  const { register, watch, setValue, control, handleSubmit } = useForm({
    defaultValues: {
      lifestyle: '',
      cookingSituation: '',
      budget: '',
      cookingTime: '',
      cuisines: [],
      healthConditions: [],
      waterGoal: '',
    }
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const formValues = watch();

  // Calculate Profile Completion
  const sections = [
    { key: 'lifestyle', isComplete: !!formValues.lifestyle },
    { key: 'cookingSituation', isComplete: !!formValues.cookingSituation },
    { key: 'budget', isComplete: !!formValues.budget },
    { key: 'cookingTime', isComplete: !!formValues.cookingTime },
    { key: 'cuisines', isComplete: formValues.cuisines.length > 0 },
    { key: 'healthConditions', isComplete: formValues.healthConditions.length > 0 },
    { key: 'waterGoal', isComplete: !!formValues.waterGoal },
  ];
  
  const completedCount = sections.filter(s => s.isComplete).length;
  const completionPercentage = Math.round((completedCount / sections.length) * 100);

  const onSubmit = async () => {
    setIsSaving(true);
    // Simulate API save
    await new Promise(resolve => setTimeout(resolve, 1500));
    // API save complete
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      
      {/* Header Area */}
      <div className="bg-wellness-700 text-white pt-8 pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] rounded-full bg-wellness-600/50 blur-3xl" />
        
        <div className="max-w-2xl mx-auto relative z-content">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-wellness-100 hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-wellness-100 mb-8 max-w-lg text-sm leading-relaxed">
            The more details you provide, the better our AI can tailor meal recommendations to fit your life, budget, and health needs. Everything is optional.
          </p>

          {/* Progress Bar Widget */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex justify-between items-end mb-2">
              <span className="font-medium text-sm">Profile Completion</span>
              <span className="text-2xl font-bold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-white transition-all duration-1000 ease-out" 
                style={{ width: `${completionPercentage}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="max-w-2xl mx-auto px-4 -mt-8 relative z-nav">
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <CollapsibleCard title="Lifestyle" icon={UserCircle} isComplete={sections[0].isComplete} defaultOpen={true}>
            <p className="text-sm text-slate-500 mb-4">How would you describe your typical daily routine?</p>
            <FormRadioGroup 
              name="lifestyle" 
              options={[
                { value: 'office', label: 'Office Worker', desc: 'Mostly sitting during the day' },
                { value: 'student', label: 'Student', desc: 'Variable schedule, budget-conscious' },
                { value: 'active_job', label: 'Active Job', desc: 'On your feet all day' },
                { value: 'athlete', label: 'Athlete/High Training', desc: 'High physical output' },
              ]} 
              control={control} 
              register={register} 
            />
          </CollapsibleCard>

          <CollapsibleCard title="Cooking Situation" icon={ChefHat} isComplete={sections[1].isComplete}>
            <p className="text-sm text-slate-500 mb-4">Who are you usually cooking for and where?</p>
            <FormRadioGroup 
              name="cookingSituation" 
              options={[
                { value: 'solo', label: 'Cooking for One', desc: 'Just myself' },
                { value: 'couple', label: 'Cooking for Two', desc: 'Myself and a partner' },
                { value: 'family', label: 'Family Meals', desc: 'Cooking for 3+ people' },
                { value: 'dorm', label: 'Dorm/Limited Kitchen', desc: 'Microwave/hotplate only' },
              ]} 
              control={control} 
              register={register} 
            />
          </CollapsibleCard>

          <CollapsibleCard title="Budget & Groceries" icon={Wallet} isComplete={sections[2].isComplete}>
             <p className="text-sm text-slate-500 mb-4">What's your approach to grocery shopping?</p>
             <FormRadioGroup 
              name="budget" 
              options={[
                { value: 'strict', label: 'Strict Budget', desc: 'Focus on affordable staples' },
                { value: 'moderate', label: 'Moderate', desc: 'Balance of cost and quality' },
                { value: 'premium', label: 'Premium', desc: 'Focus on organic/specialty items' },
              ]} 
              control={control} 
              register={register} 
             />
          </CollapsibleCard>

          <CollapsibleCard title="Cooking Time" icon={Clock} isComplete={sections[3].isComplete}>
             <p className="text-sm text-slate-500 mb-4">How much time do you want to spend cooking dinner?</p>
             <FormRadioGroup 
              name="cookingTime" 
              options={[
                { value: '15', label: 'Under 15 mins', desc: 'Ultra-fast or no-cook' },
                { value: '30', label: 'Under 30 mins', desc: 'Quick and easy' },
                { value: '60', label: 'Up to 1 hour', desc: 'Standard cooking time' },
                { value: 'unlimited', label: 'I love cooking', desc: 'Time is not a constraint' },
              ]} 
              control={control} 
              register={register} 
             />
          </CollapsibleCard>

          <CollapsibleCard title="Preferred Cuisines" icon={UtensilsCrossed} isComplete={sections[4].isComplete}>
            <p className="text-sm text-slate-500 mb-4">Select the cuisines you enjoy the most.</p>
            <div className="flex flex-wrap gap-2">
              {['Indian', 'Italian', 'Mexican', 'Asian', 'Mediterranean', 'American', 'Middle Eastern', 'Thai'].map(cuisine => (
                <MultiSelectPill
                  key={cuisine}
                  label={cuisine}
                  selected={formValues.cuisines.includes(cuisine)}
                  onClick={() => {
                    const newCuisines = formValues.cuisines.includes(cuisine)
                      ? formValues.cuisines.filter(c => c !== cuisine)
                      : [...formValues.cuisines, cuisine];
                    setValue('cuisines', newCuisines);
                  }}
                />
              ))}
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Health Conditions" icon={HeartPulse} isComplete={sections[5].isComplete}>
            <p className="text-sm text-slate-500 mb-4">Select any health conditions our AI should consider.</p>
            <div className="flex flex-wrap gap-2">
              {['Diabetes', 'Hypertension', 'PCOS', 'IBS', 'Thyroid', 'High Cholesterol'].map(condition => (
                <MultiSelectPill
                  key={condition}
                  label={condition}
                  selected={formValues.healthConditions.includes(condition)}
                  onClick={() => {
                    const newConditions = formValues.healthConditions.includes(condition)
                      ? formValues.healthConditions.filter(c => c !== condition)
                      : [...formValues.healthConditions, condition];
                    setValue('healthConditions', newConditions);
                  }}
                />
              ))}
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Daily Water Goal" icon={Droplets} isComplete={sections[6].isComplete}>
            <p className="text-sm text-slate-500 mb-4">Set a custom daily water intake goal (in Liters).</p>
            <div className="max-w-xs">
              <Input 
                id="waterGoal" 
                type="number" 
                step="0.1" 
                placeholder="e.g. 2.5" 
                {...register("waterGoal")} 
              />
            </div>
          </CollapsibleCard>

          <div className="mt-8 flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving Profile...' : 'Save Profile Details'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}
