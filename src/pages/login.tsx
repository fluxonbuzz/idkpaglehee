import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthService } from '../services/auth'
import { setAuthToken, getAuthToken } from '../lib/auth'
import { Mail, Lock, Eye, EyeOff, Store, User, Shield } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorCode, setErrorCode] = useState<string | undefined>(undefined)
  const [showPassword, setShowPassword] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      router.push('/store')
    }
  }, [router])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setErrorCode(undefined)
    try {
      const resp = await AuthService.login({ email, password })
      setAuthToken(resp.token)
      router.push('/store')
    } catch (err: any) {
      setError(err?.message || 'Login failed')
      if (err?.code) setErrorCode(err.code)
    } finally {
      setLoading(false)
    }
  }

  const onResend = async () => {
    setLoading(true)
    setError('')
    try {
      await AuthService.resendEmailConfirmation(email)
      setError('Verification email sent. Please check your inbox.')
    } catch (e: any) {
      setError(e?.message || 'Failed to resend email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Store className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">SX Store</h1>
          </div>
          <p className="text-white/80 text-lg">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className={`p-4 rounded-xl border ${
                errorCode === 'EMAIL_NOT_CONFIRMED' 
                  ? 'border-amber-200 bg-amber-50/90' 
                  : 'border-red-200 bg-red-50/90'
              } backdrop-blur-sm`}>
                <p className={`text-sm ${
                  errorCode === 'EMAIL_NOT_CONFIRMED' ? 'text-amber-800' : 'text-red-800'
                }`}>
                  {error}
                </p>
                {errorCode === 'EMAIL_NOT_CONFIRMED' && (
                  <button 
                    type="button" 
                    onClick={onResend} 
                    className="text-sm font-medium text-amber-700 underline mt-2 hover:text-amber-800 transition-colors"
                    disabled={loading}
                  >
                    Resend verification email
                  </button>
                )}
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/70" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
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
                  <User className="w-5 h-5" />
                  Sign in
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/70">or</span>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-3 text-center">
              <p className="text-sm text-white/80">
                No account?{' '}
                <a 
                  href="/register" 
                  className="font-semibold text-white hover:text-gray-200 underline transition-colors"
                >
                  Create one
                </a>
              </p>
              <p className="text-sm text-white/80">
                Admin?{' '}
                <a 
                  href="/admin/login" 
                  className="font-semibold text-white hover:text-gray-200 transition-colors flex items-center justify-center gap-1"
                >
                  <Shield className="w-4 h-4" />
                  Admin login
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-white/60">
            Made by <span className="font-semibold text-white">fluxon</span>
          </p>
        </div>
      </div>
    </div>
  )
}
