import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminDashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      router.replace('/admin/login')
      return
    }
    const run = async () => {
      const me = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      const u = await me.json()
      if (!me.ok || u.role !== 'admin') {
        router.replace('/admin/login')
        return
      }
      const res = await fetch('/api/orders', { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.message || 'Failed to load orders')
        return
      }
      setOrders(data.orders)
    }
    run()
  }, [router])

  if (error) return <p className="p-6 text-red-500">{error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="border rounded p-3">
            <div className="text-sm text-gray-500">{o.id}</div>
            <div>User: {o.user_id}</div>
            <div>Status: {o.status}</div>
            <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto">{JSON.stringify(o.data, null, 2)}</pre>
          </div>
        ))}
        {orders.length === 0 && <div>No orders yet.</div>}
      </div>
    </div>
  )
}


