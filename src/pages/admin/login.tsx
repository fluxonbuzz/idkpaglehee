import { useState } from 'react'
import { useRouter } from 'next/router'
import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle, Store } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data?.message || 'Login failed. Check your credentials.')
      }
      
      localStorage.setItem('authToken', data.token)
      router.push('/admin')
      
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Demo credentials hint (remove in production)
  const showDemoHint = !email && !password

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">SX Store</h1>
              <p className="text-white/80 mt-1">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Admin Login</h2>
            <p className="text-white/70 mt-2">Access the admin dashboard</p>
          </div>

          {showDemoHint && (
            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-yellow-200 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Need admin credentials? Check your database or API.</span>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-red-200 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/70" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-white">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/70" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white/70 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/70 hover:text-white transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-purple-600 py-3 px-4 rounded-xl font-semibold hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Sign in as Admin
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Don't have admin access?{' '}
              <a 
                href="/" 
                className="text-white hover:text-gray-200 underline transition-colors"
              >
                Go to main site
              </a>
            </p>
          </div>
        </div>

        {/* Demo Section - Remove in production */}
        <div className="mt-6 text-center">
          <details className="inline-block text-white/60 text-sm">
            <summary className="cursor-pointer hover:text-white transition-colors">
              Need help setting up admin?
            </summary>
            <div className="mt-2 p-4 bg-black/20 rounded-xl text-left">
              <p className="mb-2">To create an admin user, you need to:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Check your database for existing admin users</li>
                <li>Run a seed script to create admin accounts</li>
                <li>Or add admin registration to your API</li>
              </ol>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
