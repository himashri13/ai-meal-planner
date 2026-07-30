import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

// Define the validation schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();
  const [authError, setAuthError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setAuthError(null);
    try {
      await login(data);
      navigate('/dashboard');
    } catch (err) {
      setAuthError(err.message || "Failed to login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-wellness-50 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-wellness-200/40 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-wellness-300/30 blur-3xl" aria-hidden="true" />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-wellness-900/5 p-8 relative z-content border border-white/50">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-wellness-400 to-wellness-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-wellness-500/30">
            <Heart className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-semibold text-slate-800 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2 text-sm">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password?.message}
          />
          
          {authError && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
              {authError}
            </div>
          )}

          <div className="flex items-center justify-between pt-1 pb-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-wellness-600 focus:ring-wellness-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <Button variant="link" className="font-medium text-wellness-600 hover:text-wellness-500">
                Forgot password?
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Sign In
          </Button>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-500">Don't have an account? </span>
            <Link to="/signup" className="font-semibold text-wellness-600 hover:text-wellness-700">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
