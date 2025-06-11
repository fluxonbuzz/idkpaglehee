// src/pages/login.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Key, AlertCircle, Mail, Lock, Loader2, ArrowRight, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { setAuthToken } from '@/lib/auth';
import { AuthService } from '@/services/auth';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { token, user } = await AuthService.login({
        email: formData.email,
        password: formData.password,
      });

      setAuthToken(token);
      toast.success(`Welcome back, ${user.name || user.email.split('@')[0]}!`);
      router.push('/dashboard');
    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.message.includes('credentials')) {
        setErrors({
          email: 'Invalid credentials',
          password: 'Invalid credentials',
        });
        errorMessage = 'Invalid email or password';
      } else if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your connection.';
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            SX Games
          </Link>
          <nav className="flex gap-6">
            <Link href="/store" className="hover:text-purple-400 transition">Store</Link>
            <Link href="/downloads" className="hover:text-purple-400 transition">Downloads</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Sign in to access your account and continue your gaming journey
          </p>
        </section>

        {/* Login Form */}
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-gray-700 border ${
                        errors.email ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <AlertCircle size={18} className="text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full bg-gray-700 border ${
                        errors.password ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <AlertCircle size={18} className="text-red-500" />
                      </div>
                    )}
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-purple-400 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded transition flex items-center justify-center gap-2 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Key size={18} /> Sign In
                  </>
                )}
              </button>

              {/* Signup Link */}
              <p className="text-center text-sm text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="text-purple-400 hover:underline flex items-center justify-center gap-1">
                  Sign up <ArrowRight size={16} />
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16 bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Sign In?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                  <Zap size={20} className="text-purple-400" />
                </div>
                <h3 className="font-bold">Continue Playing</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Access your saved games, progress, and unlocked achievements across all your devices.
              </p>
            </div>
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-pink-500/20 p-2 rounded-full mr-3">
                  <Shield size={20} className="text-pink-400" />
                </div>
                <h3 className="font-bold">Secure Profile</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Your personal data and game purchases are protected with our advanced security measures.
              </p>
            </div>
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-indigo-500/20 p-2 rounded-full mr-3">
                  <Key size={20} className="text-indigo-400" />
                </div>
                <h3 className="font-bold">Exclusive Content</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Get access to member-only mods, early releases, and special in-game items.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
