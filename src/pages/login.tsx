import { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        if (result.error === "User not found") {
          setError("Email isn't registered with us. Try signing up.");
        } else if (result.error === "Invalid password") {
          setError("Incorrect email or password");
        } else {
          setError(result.error);
        }
        throw new Error(result.error);
      }

      if (result?.ok) {
        toast.success("Logged in successfully!");
        router.push("/");
      }
    } catch (error) {
      if (!(error instanceof Error && (error.message === "User not found" || error.message === "Invalid password"))) {
        toast.error(error instanceof Error ? error.message : "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminAccess = () => {
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Container>
        <div className="flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
                Welcome Back
              </h1>
              <p className="text-lg text-gray-300">
                Sign in to access your account
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8 shadow-lg shadow-purple-500/10">
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-300 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-700/50 border border-gray-600/30 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 w-full pl-10 pr-3 py-3 rounded-lg text-white placeholder-gray-400 outline-none transition-all"
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
                      <Lock className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      ref={passwordRef}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-gray-700/50 border border-gray-600/30 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 w-full pl-10 pr-3 py-3 rounded-lg text-white placeholder-gray-400 outline-none transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-purple-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-purple-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-600 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 py-3 text-lg"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Don't have an account?{' '}
                  <Link href="/signup" className="font-medium text-purple-400 hover:text-purple-300">
                    Sign up
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center">
                <button 
                  onClick={handleAdminAccess}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center justify-center w-full"
                >
                  <Lock className="h-3 w-3 mr-1" />
                  Admin Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
