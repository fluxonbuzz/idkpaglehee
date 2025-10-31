import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { 
  Package, 
  Users, 
  DollarSign, 
  Truck, 
  X, 
  Edit3, 
  Tag,
  LogOut,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react'

interface Order {
  id: string
  user_id: string
  status: string
  items: any[]
  subtotal: number
  total: number
  discount: any
  created_at: string
  updated_at: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState('')
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    paid: 0,
    delivered: 0,
    cancelled: 0
  })

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      router.replace('/admin/login')
      return
    }
    loadOrders(token)
  }, [router])

  const loadOrders = async (token?: string) => {
    try {
      const authToken = token || localStorage.getItem('authToken')
      if (!authToken) {
        router.replace('/admin/login')
        return
      }

      const me = await fetch('/api/auth/me', { 
        headers: { Authorization: `Bearer ${authToken}` } 
      })
      const u = await me.json()
      if (!me.ok || u.role !== 'admin') {
        router.replace('/admin/login')
        return
      }

      const res = await fetch('/api/orders', { 
        headers: { Authorization: `Bearer ${authToken}` } 
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.message || 'Failed to load orders')
        return
      }
      
      setOrders(data.orders)
      calculateStats(data.orders)
    } catch (err) {
      setError('Failed to load orders')
    }
  }

  const calculateStats = (orders: Order[]) => {
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      confirmed: orders.filter(o => o.status === 'confirmed').length,
      paid: orders.filter(o => o.status === 'paid').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
    }
    setStats(stats)
  }

  const act = async (id: string, body: any) => {
    try {
      setLoadingId(id)
      const token = localStorage.getItem('authToken')
      if (!token) {
        router.replace('/admin/login')
        return
      }

      console.log('Updating order:', id, 'with data:', body)

      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(body),
      })
      
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.message || 'Action failed')
      }
      
      await loadOrders(token)
    } catch (e: any) {
      setError(e?.message || 'Action failed')
    } finally {
      setLoadingId(null)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      paid: 'bg-green-100 text-green-800 border-green-200',
      delivered: 'bg-purple-100 text-purple-800 border-purple-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: Clock,
      confirmed: CheckCircle2,
      paid: DollarSign,
      delivered: Truck,
      cancelled: X
    }
    return icons[status as keyof typeof icons] || Package
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    router.replace('/admin/login')
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => loadOrders()}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => loadOrders()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-500">Total Orders</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
                <p className="text-sm text-gray-500">Confirmed</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
                <p className="text-sm text-gray-500">Paid</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
                <p className="text-sm text-gray-500">Delivered</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-3">
              <X className="w-8 h-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
                <p className="text-sm text-gray-500">Cancelled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {orders.map((order) => {
            const StatusIcon = getStatusIcon(order.status)
            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border p-6">
                {/* Order Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-medium capitalize">{order.status}</span>
                    </div>
                    <div className="text-sm text-gray-500 font-mono">#{order.id.slice(0, 8)}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.created_at && new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>

                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">User ID:</span>
                    <span className="text-sm font-medium">{order.user_id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Total:</span>
                    <span className="text-sm font-medium">₹{order.total}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Items:</span>
                    <span className="text-sm font-medium">{order.items?.length || 0}</span>
                  </div>
                </div>

                {/* Order Items */}
                {order.items && order.items.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-bold mb-2 text-gray-700">Items:</h4>
                    <div className="space-y-1">
                      {order.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm text-gray-600">
                          <span>{item.name} (x{item.qty})</span>
                          <span>₹{item.unitPrice * item.qty}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    disabled={loadingId === order.id}
                    onClick={() => act(order.id, { status: 'confirmed' })}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 disabled:opacity-50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm
                  </button>
                  <button
                    disabled={loadingId === order.id}
                    onClick={() => act(order.id, { status: 'paid' })}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 disabled:opacity-50 transition-colors"
                  >
                    <DollarSign className="w-4 h-4" />
                    Mark Paid
                  </button>
                  <button
                    disabled={loadingId === order.id}
                    onClick={() => act(order.id, { status: 'delivered' })}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 disabled:opacity-50 transition-colors"
                  >
                    <Truck className="w-4 h-4" />
                    Delivered
                  </button>
                  <button
                    disabled={loadingId === order.id}
                    onClick={() => act(order.id, { status: 'cancelled' })}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    disabled={loadingId === order.id}
                    onClick={() => {
                      const code = window.prompt('Discount code (optional):') || undefined
                      const amountStr = window.prompt('Discount amount (number):')
                      const amount = amountStr ? Number(amountStr) : undefined
                      if (amountStr && isNaN(Number(amountStr))) {
                        alert('Please enter a valid number')
                        return
                      }
                      act(order.id, { discount: code || amount ? { code, amount } : null })
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 disabled:opacity-50 transition-colors"
                  >
                    <Tag className="w-4 h-4" />
                    Discount
                  </button>
                </div>
              </div>
            )
          })}
          
          {orders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500">Orders will appear here once customers start placing them.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
