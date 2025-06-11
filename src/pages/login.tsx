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
    console.log('Form submitted'); // Debug log
    
    if (!validateForm()) {
      console.log('Validation failed', errors); // Debug log
      return;
    }

    setIsLoading(true);
    console.log('Attempting login...'); // Debug log

    try {
      // Debug: Log what's being sent
      console.log('Sending:', { email: formData.email, password: '***' });
      
      const { token, user } = await AuthService.login({
        email: formData.email,
        password: formData.password,
      });

      console.log('Login response:', { token, user }); // Debug log

      // Store the token
      setAuthToken(token);
      console.log('Token stored'); // Debug log

      // Redirect with success message
      toast.success(`Welcome back, ${user.name || user.email.split('@')[0]}!`);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      
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
      console.log('Login attempt completed'); // Debug log
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* ... (previous header and hero section code remains the same) ... */}

      {/* Login Form */}
      <div className="max-w-md mx-auto bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ... (previous form fields code remains the same) ... */}

            {/* Updated Submit Button with better debugging */}
            <button
              type="submit"
              disabled={isLoading}
              onClick={(e) => {
                console.log('Button clicked');
                handleSubmit(e);
              }}
              className={`w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded transition flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              aria-label={isLoading ? 'Signing in...' : 'Sign in'}
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

            {/* ... (rest of the form code remains the same) ... */}
          </form>
        </div>
      </div>

      {/* ... (remaining sections code remains the same) ... */}
    </div>
  );
}
