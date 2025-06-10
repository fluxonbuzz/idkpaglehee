import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Eye, User } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Signup() {
}
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    if (passwordRef.current) {
      passwordRef.current.type = 
        passwordRef.current.type === 'password' ? 'text' : 'password';
    }
  };

  const toggleConfirmPasswordVisibility = () => {
    if (confirmPasswordRef.current) {
      confirmPasswordRef.current.type = 
        confirmPasswordRef.current.type === 'password' ? 'text' : 'password';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirm-password') as string,
      terms: formData.get('terms') === 'on',
    };

    // Client-side validation
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (!data.terms) {
      toast.error("You must accept the terms and conditions");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Account created successfully!');
        router.push('/dashboard');
      } else {
        toast.error(result.message || 'Signup failed');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Container>
        <div className="flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-4">
                Create Account
              </h1>
              <p className="text-lg text-gray-300">
                Join us and get started today
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-blue-500/20 p-8 shadow-lg shadow-blue-500/10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="bg-gray-700/50 border border-gray-600/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 w-full pl-10 pr-3 py-3 rounded-lg text-white placeholder-gray-400 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="bg-gray-700/50 border border-gray-600/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 w-full pl-10 pr-3 py-3 rounded-lg text-white placeholder-gray-400 outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      ref={passwordRef}
                      autoComplete="new-password"
                      required
                      minLength={8}
                      className="bg-gray-700/50 border border-gray-600/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 w-full pl-10 pr-3 py-3 rounded-lg text-white placeholder-gray-400 outline-none transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      <Eye className="h-5 w-5 text-gray-400 hover:text-blue-400" />
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      ref={confirmPasswordRef}
                      autoComplete="new-password"
                      required
                      minLength={8}
                      className="bg-gray-700/50 border border-gray-600/30 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 w-full pl-10 pr-3 py-3 rounded-lg text-white placeholder-gray-400 outline-none transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      <Eye className="h-5 w-5 text-gray-400 hover:text-blue-400" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                    I agree to the <Link href="/terms" className="font-medium text-blue-400 hover:text-blue-300">Terms and Conditions</Link>
                  </label>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 py-3 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Already have an account?{' '}
                  <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
