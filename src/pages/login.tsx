// src/pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Key, ArrowRight, AlertCircle, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

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

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
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
      // Simulate API call with different error scenarios
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock responses for demonstration
      const mockUsers = [
        { email: 'user@example.com', password: 'password123' }
      ];
      
      const user = mockUsers.find(u => u.email === formData.email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      if (user.password !== formData.password) {
        throw new Error('Incorrect password');
      }
      
      toast.success('Login successful!');
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'User not found') {
          setErrors(prev => ({
            ...prev,
            email: 'No account found with this email',
          }));
          toast.error('User not found');
        } else if (error.message === 'Incorrect password') {
          setErrors(prev => ({
            ...prev,
            password: 'Incorrect password',
          }));
          toast.error('Incorrect password');
        } else {
          toast.error('Login failed. Please try again.');
        }
      }
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
            Sign in to your account to continue your gaming journey
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
                      className={`w-full bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-purple-500'}`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.email}
                    </p>
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
                      className={`w-full bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-purple-500'}`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.password}
                    </p>
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
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
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
                <Link href="/signup" className="text-purple-400 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16 bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center">Continue Your Adventure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                  <Key size={20} className="text-purple-400" />
                </div>
                <h3 className="font-bold">Sync Your Progress</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Pick up right where you left off with cloud-saved game progress across all devices.
              </p>
            </div>
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-pink-500/20 p-2 rounded-full mr-3">
                  <AlertCircle size={20} className="text-pink-400" />
                </div>
                <h3 className="font-bold">Enhanced Security</h3>
              </div>
              <p className="text-gray-300 text-sm">
                We monitor your account for suspicious activity and notify you of any login attempts.
              </p>
            </div>
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <div className="flex items-center mb-3">
                <div className="bg-violet-500/20 p-2 rounded-full mr-3">
                  <ArrowRight size={20} className="text-violet-400" />
                </div>
                <h3 className="font-bold">Quick Access</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Get instant access to your purchased games, mods, and exclusive content.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
