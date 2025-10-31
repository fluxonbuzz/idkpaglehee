import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminDashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [error, setError] = useState('')
  const [loadingId, setLoadingId] = useState<string | null>(null)

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

  const act = async (id: string, body: any) => {
    try {
      setLoadingId(id)
      const token = localStorage.getItem('authToken')
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.message || 'Action failed')
      // Refresh orders
      const list = await fetch('/api/orders', { headers: { Authorization: `Bearer ${token}` } })
      const listData = await list.json()
      if (!list.ok) throw new Error(listData?.message || 'Failed to reload orders')
      setOrders(listData.orders)
    } catch (e: any) {
      setError(e?.message || 'Action failed')
    } finally {
      setLoadingId(null)
    }
  }

  if (error) return <p className="p-6 text-red-500">{error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="border rounded p-3">
            <div className="text-sm text-gray-500">{o.id}</div>
            <div className="flex flex-wrap gap-3 items-center">
              <div>User: {o.user_id}</div>
              <div>Status: <strong>{o.status}</strong></div>
              <button disabled={loadingId===o.id} onClick={() => act(o.id, { status: 'confirmed' })} className="px-2 py-1 text-sm border rounded">Confirm</button>
              <button disabled={loadingId===o.id} onClick={() => act(o.id, { status: 'paid' })} className="px-2 py-1 text-sm border rounded">Mark Paid</button>
              <button disabled={loadingId===o.id} onClick={() => act(o.id, { status: 'delivered' })} className="px-2 py-1 text-sm border rounded">Delivered</button>
              <button disabled={loadingId===o.id} onClick={() => act(o.id, { status: 'cancelled' })} className="px-2 py-1 text-sm border rounded">Cancel</button>
              <button disabled={loadingId===o.id} onClick={() => {
                const code = window.prompt('Discount code (optional):') || undefined
                const amountStr = window.prompt('Discount amount (number):')
                const amount = amountStr ? Number(amountStr) : undefined
                if (amountStr && isNaN(Number(amountStr))) return
                act(o.id, { discount: code || amount ? { code, amount } : null })
              }} className="px-2 py-1 text-sm border rounded">Apply Discount</button>
              <button disabled={loadingId===o.id} onClick={() => {
                const notes = window.prompt('Admin notes:') || ''
                act(o.id, { admin_notes: notes })
              }} className="px-2 py-1 text-sm border rounded">Add Notes</button>
            </div>
            <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto mt-2">{JSON.stringify(o.data, null, 2)}</pre>
          </div>
        ))}
        {orders.length === 0 && <div>No orders yet.</div>}
      </div>
    </div>
  )
}


