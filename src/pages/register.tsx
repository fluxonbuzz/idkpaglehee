// src/pages/register.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, ArrowRight, CheckCircle, Shield, Mail, User, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { AuthService } from '../services/auth';
import { setAuthToken } from '../lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    if (!formData.terms) {
      toast.error("You must accept the terms and conditions");
      setIsLoading(false);
      return;
    }

    try {
      const resp = await AuthService.signup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });
      if (resp?.token) {
        setAuthToken(resp.token);
      }
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-purple-800/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            SX Store
          </Link>
          <nav className="flex gap-6">
            <Link href="/store" className="hover:text-purple-400 transition">Store</Link>
            <Link href="/downloads" className="hover:text-purple-400 transition">Games</Link>
            <Link href="/login" className="text-purple-400 hover:text-purple-300 transition">
              Already have an account?
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Join SX Store
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create your account to access exclusive gaming products and services
          </p>
        </section>

        {/* Signup Form */}
        <div className="max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-800/30 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

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
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                      placeholder="you@example.com"
                    />
                  </div>
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
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Must be at least 6 characters</p>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 text-purple-600"
                  />
                </div>
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the{' '}
                  <Link href="/terms" className="text-purple-400 hover:underline">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-purple-400 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Zap size={18} /> Create Account
                  </>
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-purple-400 hover:underline font-medium">
                  Log in here
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16 bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-purple-800/30">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Join SX Store?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50 hover:border-purple-500/30 transition">
              <div className="flex items-center mb-3">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                  <CheckCircle size={20} className="text-purple-400" />
                </div>
                <h3 className="font-bold">Exclusive Products</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Access premium gaming accounts, tools, and services not available elsewhere.
              </p>
            </div>
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50 hover:border-purple-500/30 transition">
              <div className="flex items-center mb-3">
                <div className="bg-pink-500/20 p-2 rounded-full mr-3">
                  <Shield size={20} className="text-pink-400" />
                </div>
                <h3 className="font-bold">Secure Purchases</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Your transactions are protected with secure payment processing and order tracking.
              </p>
            </div>
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700/50 hover:border-purple-500/30 transition">
              <div className="flex items-center mb-3">
                <div className="bg-blue-500/20 p-2 rounded-full mr-3">
                  <Zap size={20} className="text-blue-400" />
                </div>
                <h3 className="font-bold">Instant Delivery</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Most digital products are delivered instantly after purchase confirmation.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SX Store. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/terms" className="text-gray-400 hover:text-purple-300 transition text-sm">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-purple-300 transition text-sm">
              Privacy
            </Link>
            <Link href="/refund" className="text-gray-400 hover:text-purple-300 transition text-sm">
              Refund Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}