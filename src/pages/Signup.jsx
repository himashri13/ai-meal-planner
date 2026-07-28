import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  acceptTerms: z.boolean().refine(val => val === true, "You must accept the terms and privacy policy")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Signup() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Signup data:", data);
    setIsSubmitting(false);
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-wellness-50 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-wellness-200/40 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-wellness-300/30 blur-3xl" aria-hidden="true" />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-wellness-900/5 p-8 relative z-10 border border-white/50">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-wellness-400 to-wellness-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-wellness-500/30">
            <Leaf className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">Create Account</h1>
          <p className="text-slate-500 mt-2 text-sm">Start your wellness journey today.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="fullName"
            label="Full Name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            {...register("fullName")}
            error={errors.fullName?.message}
          />

          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="hello@example.com"
            autoComplete="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("password")}
            error={errors.password?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
          />

          <Input
            id="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="new-password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="focus:outline-none"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
          />

          <div className="flex items-start py-2">
            <div className="flex items-center h-5">
              <input
                id="acceptTerms"
                type="checkbox"
                {...register("acceptTerms")}
                className={`h-4 w-4 rounded border-slate-300 text-wellness-600 focus:ring-wellness-500 ${errors.acceptTerms ? 'border-red-300' : ''}`}
              />
            </div>
            <label htmlFor="acceptTerms" className="ml-2 block text-sm text-slate-600">
              I agree to the{" "}
              <a href="#" className="text-wellness-600 hover:text-wellness-700 underline-offset-2 hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-wellness-600 hover:text-wellness-700 underline-offset-2 hover:underline">Privacy Policy</a>.
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-red-500 mt-1" role="alert">{errors.acceptTerms.message}</p>
          )}

          <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
            Create Account
          </Button>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">Already have an account? </span>
            <Link to="/login" className="font-semibold text-wellness-600 hover:text-wellness-700">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
