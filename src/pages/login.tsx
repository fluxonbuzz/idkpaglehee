import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Eye } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const allowSignups = true;
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    if (passwordRef.current) {
      passwordRef.current.type = 
        passwordRef.current.type === 'password' ? 'text' : 'password';
    }
  };

  const handleAdminAccess = async () => {
    try {
      await router.push('/admin');
    } catch (error) {
      console.error('Navigation failed:', error);
    }
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
                {allowSignups 
                  ? "Sign in to your account or create a new one"
                  : "Sign in to access your account"}
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 p-8 shadow-lg shadow-purple-500/10">
              <form className="space-y-6">
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
                      type="password"
                      ref={passwordRef}
                      autoComplete="current-password"
                      required
                      className="bg-gray-700/50 border border-gray-600/30 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 w-full pl-10 pr-3 py-3 rounded-lg text-white placeholder-gray-400 outline-none transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      <Eye className="h-5 w-5 text-gray-400 hover:text-purple-400" />
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
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 py-3 text-lg"
                  >
                    Sign In
                  </Button>
                </div>
              </form>

              {allowSignups && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-400">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="font-medium text-purple-400 hover:text-purple-300">
                      Sign up
                    </Link>
                  </p>
                </div>
              )}

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
