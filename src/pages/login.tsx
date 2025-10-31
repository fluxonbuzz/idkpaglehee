import { useState } from 'react'
import { useRouter } from 'next/router'
import { AuthService } from '../services/auth'
import { setAuthToken } from '../lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const resp = await AuthService.login({ email, password })
      setAuthToken(resp.token)
      if ((resp.user as any).role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/')
      }
    } catch (err: any) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={loading} className="w-full bg-black text-white rounded py-2 disabled:opacity-60">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <p className="text-sm text-center">
          No account? <a href="/register" className="underline">Create one</a>
        </p>
        <p className="text-sm text-center">
          Admin? <a href="/admin/login" className="underline">Admin login</a>
        </p>
      </form>
    </div>
  )
}


