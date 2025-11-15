import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Shield, AlertCircle, CheckCircle2, Clock, Filter, Search, RefreshCw, Trash2 } from 'lucide-react'

interface Appeal {
  id: string
  username: string
  email: string
  platform: 'discord' | 'telegram' | 'whatsapp' | 'other'
  reason: string
  explanation: string
  contact_method: string
  status: 'pending' | 'approved' | 'rejected'
  created_at?: string
}

export default function AdminAppealsPage() {
  const router = useRouter()
  const [appeals, setAppeals] = useState<Appeal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | Appeal['status']>('all')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null

  const deleteAppeal = async (id: string) => {
    if (!token) return router.replace('/admin/login')
    const ok = window.confirm('Delete this appeal permanently?')
    if (!ok) return
    try {
      setUpdatingId(id)
      const res = await fetch(`/api/admin/appeals?id=${encodeURIComponent(id)}` , {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Failed to delete')
      }
      setAppeals((prev: Appeal[]) => prev.filter((a: Appeal) => a.id !== id))
    } catch (e: any) {
      alert(e?.message || 'Failed to delete appeal')
    } finally {
      setUpdatingId(null)
    }
  }

  useEffect(() => {
    const t = localStorage.getItem('authToken')
    if (!t) {
      router.replace('/admin/login')
      return
    }
    fetchAppeals(t)
  }, [router])

  const fetchAppeals = async (tkn: string) => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch('/api/admin/appeals', {
        headers: {
          Authorization: `Bearer ${tkn}`
        }
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Failed to fetch appeals')
      }
      const data = await res.json()
      setAppeals(data.appeals || [])
    } catch (e: any) {
      setError(e?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: Appeal['status']) => {
    if (!token) return router.replace('/admin/login')
    try {
      setUpdatingId(id)
      const res = await fetch('/api/admin/appeals', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id, status })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Failed to update')
      }
      // optimistic update
      setAppeals(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    } catch (e: any) {
      alert(e?.message || 'Failed to update appeal')
    } finally {
      setUpdatingId(null)
    }
  }

  const filtered = appeals.filter(a => {
    const s = search.toLowerCase()
    const matchesSearch = !s || `${a.username} ${a.email} ${a.reason} ${a.explanation}`.toLowerCase().includes(s)
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold">Ban Appeals</h1>
        </div>

        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 mb-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search username, email, reason..."
                className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-9 pr-3 py-2 text-sm placeholder:text-gray-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
                className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => token && fetchAppeals(token)}
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl px-3 py-2 text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </div>
        )}

        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-0 px-4 py-3 text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800">
            <div className="col-span-2">User</div>
            <div className="col-span-2">Email</div>
            <div className="col-span-1">Platform</div>
            <div className="col-span-2">Reason</div>
            <div className="col-span-3">Explanation</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {loading ? (
            <div className="p-6 text-gray-400 text-sm">Loading appeals...</div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-gray-400 text-sm">No appeals found</div>
          ) : (
            filtered.map(a => (
              <div key={a.id} className="grid grid-cols-12 gap-0 px-4 py-3 border-b border-gray-850 text-sm">
                <div className="col-span-2 font-medium">{a.username}</div>
                <div className="col-span-2 text-gray-300">{a.email}</div>
                <div className="col-span-1 capitalize">{a.platform}</div>
                <div className="col-span-2">{a.reason}</div>
                <div className="col-span-3 text-gray-300 line-clamp-2">{a.explanation}</div>
                <div className="col-span-1">
                  <span className={`px-2 py-1 rounded-lg text-xs capitalize ${a.status === 'pending' ? 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/30' : a.status === 'approved' ? 'bg-green-500/10 text-green-300 border border-green-500/30' : 'bg-red-500/10 text-red-300 border border-red-500/30'}`}>
                    {a.status}
                  </span>
                </div>
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <button
                    disabled={updatingId === a.id || a.status === 'approved'}
                    onClick={() => updateStatus(a.id, 'approved')}
                    className="px-2 py-1 rounded-lg bg-green-600/20 hover:bg-green-600/30 border border-green-600/30 disabled:opacity-50"
                    title="Approve"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button
                    disabled={updatingId === a.id || a.status === 'rejected'}
                    onClick={() => updateStatus(a.id, 'rejected')}
                    className="px-2 py-1 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 disabled:opacity-50"
                    title="Reject"
                  >
                    <AlertCircle className="w-4 h-4" />
                  </button>
                  <button
                    disabled={updatingId === a.id}
                    onClick={() => deleteAppeal(a.id)}
                    className="px-2 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 border border-gray-600 disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 text-xs text-gray-400 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Appeals are sorted by newest first
        </div>
      </div>
    </div>
  )
}
