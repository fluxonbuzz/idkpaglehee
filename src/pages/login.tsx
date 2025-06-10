import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Lock, Mail, Eye, User, Key } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [theme, setTheme] = useState('dark');
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    if (passwordRef.current) {
      passwordRef.current.type = 
        passwordRef.current.type === 'password' ? 'text' : 'password';
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setTheme(isLogin ? 'light' : 'dark');
  };

  const handleAdminAccess = () => {
    router.push('/admin');
  };

  const themes = {
    dark: {
      bgFrom: 'from-gray-900',
      bgTo: 'to-gray-800',
      cardBg: 'bg-gray-800/50',
      cardBorder: 'border-purple-500/20',
      textAccent: 'text-purple-400'
    },
    light: {
      bgFrom: 'from-blue-50',
      bgTo: 'to-blue-100',
      cardBg: 'bg-white/90',
      cardBorder: 'border-blue-300',
      textAccent: 'text-blue-500'
    }
  };

  const currentTheme = themes[theme as keyof typeof themes];

  return (
    <div className={`min-h-screen bg-gradient-to-b ${currentTheme.bgFrom} ${currentTheme.bgTo} text-gray-800`}>
      <Container>
        <div className="flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${isLogin ? 'from-purple-400 to-pink-500' : 'from-blue-400 to-cyan-500'} bg-clip-text text-transparent mb-4`}>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {isLogin ? 'Sign in to your account' : 'Join our community today'}
              </p>
            </div>

            <div className={`${currentTheme.cardBg} backdrop-blur-sm rounded-xl border ${currentTheme.cardBorder} p-8 shadow-lg ${theme === 'dark' ? 'shadow-purple-500/10' : 'shadow-blue-500/10'}`}>
              <form className="space-y-6">
                {!isLogin && (
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className={`h-5 w-5 ${currentTheme.textAccent}`} />
                      </div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        className={`bg-white/20 border ${theme === 'dark' ? 'border-gray-600/30' : 'border-gray-300'} focus:ring-1 ${theme === 'dark' ? 'focus:ring-purple-500/30' : 'focus:ring-blue-500/30'} w-full pl-10 pr-3 py-3 rounded-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'} placeholder-gray-400 outline-none transition-all`}
                        placeholder="yourname"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 ${currentTheme.textAccent}`} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={`bg-white/20 border ${theme === 'dark' ? 'border-gray-600/30' : 'border-gray-300'} focus:ring-1 ${theme === 'dark' ? 'focus:ring-purple-500/30' : 'focus:ring-blue-500/30'} w-full pl-10 pr-3 py-3 rounded-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'} placeholder-gray-400 outline-none transition-all`}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 ${currentTheme.textAccent}`} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      ref={passwordRef}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      required
                      className={`bg-white/20 border ${theme === 'dark' ? 'border-gray-600/30' : 'border-gray-300'} focus:ring-1 ${theme === 'dark' ? 'focus:ring-purple-500/30' : 'focus:ring-blue-500/30'} w-full pl-10 pr-3 py-3 rounded-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'} placeholder-gray-400 outline-none transition-all`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      <Eye className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-blue-500'}`} />
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className={`h-5 w-5 ${currentTheme.textAccent}`} />
                      </div>
                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        required
                        className={`bg-white/20 border ${theme === 'dark' ? 'border-gray-600/30' : 'border-gray-300'} focus:ring-1 ${theme === 'dark' ? 'focus:ring-purple-500/30' : 'focus:ring-blue-500/30'} w-full pl-10 pr-3 py-3 rounded-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'} placeholder-gray-400 outline-none transition-all`}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className={`h-4 w-4 ${theme === 'dark' ? 'text-purple-500' : 'text-blue-500'} focus:ring-${theme === 'dark' ? 'purple' : 'blue'}-500 border-${theme === 'dark' ? 'gray-600' : 'gray-300'} rounded`}
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <button 
                        type="button" 
                        className={`font-medium ${currentTheme.textAccent} hover:opacity-80`}
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <Button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${isLogin ? 'from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700' : 'from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700'} py-3 text-lg`}
                  >
                    {isLogin ? 'Sign In' : 'Sign Up'}
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button 
                    type="button" 
                    onClick={toggleAuthMode}
                    className={`font-medium ${currentTheme.textAccent} hover:opacity-80`}
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>

              {isLogin && (
                <div className="mt-4 text-center">
                  <button 
                    onClick={handleAdminAccess}
                    className={`text-xs ${currentTheme.textAccent} hover:opacity-80 flex items-center justify-center w-full`}
                  >
                    <Key className="h-3 w-3 mr-1" />
                    Admin Access
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
