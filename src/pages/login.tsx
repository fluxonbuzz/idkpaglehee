// src/pages/login.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Key, AlertCircle, Mail, Lock, Loader2 } from 'lucide-react';
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
    general: '',
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
        general: '', // Also clear general errors on typing
      }));
    }
  };

  const validateForm = () => {
    console.log('Validating form...');
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
      general: '',
    };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
      console.log('Email validation failed: empty');
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
      console.log('Email validation failed: invalid format');
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
      console.log('Password validation failed: empty');
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
      console.log('Password validation failed: too short');
    }

    setErrors(newErrors);
    console.log('Validation result:', valid, 'Errors:', newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');

    if (!validateForm()) {
      console.log('Form validation failed, aborting submission');
      toast.error('Please fix the form errors');
      return;
    }

    setIsLoading(true);
    console.log('Attempting login with:', { email: formData.email, password: '******' });

    try {
      const response = await AuthService.login({
        email: formData.email,
        password: formData.password,
      });
      
      console.log('Login API response:', response);

      if (!response?.token) {
        throw new Error('No token received in response');
      }

      setAuthToken(response.token);
      console.log('Token stored successfully');

      toast.success(`Welcome back! Redirecting...`);
      console.log('Redirecting to /dashboard');
      router.push('/dashboard');
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.response) {
        // Handle HTTP errors
        console.log('API error response:', error.response);
        if (error.response.status === 401) {
          errorMessage = 'Invalid email or password';
          setErrors({
            email: 'Invalid credentials',
            password: 'Invalid credentials',
            general: errorMessage,
          });
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received:', error.request);
        errorMessage = 'Network error. Please check your connection.';
      } else {
        // Something happened in setting up the request
        console.log('Request setup error:', error.message);
      }

      toast.error(errorMessage);
      setErrors(prev => ({
        ...prev,
        general: errorMessage,
      }));
      
    } finally {
      setIsLoading(false);
      console.log('Login attempt completed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* ... (header and hero section remain the same) ... */}

      {/* Login Form */}
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10">
        <div className="p-8">
          {errors.general && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-sm text-red-200 flex items-center gap-2">
              <AlertCircle size={16} />
              {errors.general}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
          </form>
        </div>
      </div>
    </div>
  );
}
