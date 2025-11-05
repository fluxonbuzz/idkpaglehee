import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { 
  Package, 
  Users, 
  IndianRupee, 
  Truck, 
  X, 
  Edit3, 
  Tag,
  LogOut,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  ShoppingCart,
  BarChart3,
  Settings,
  User,
  Shield,
  Trash2,
  Filter
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
  user_email?: string
  user_name?: string
  admin_message?: string
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
  const [activeTab, setActiveTab] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

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
      setIsLoading(true)
      setError('')
      
      const authToken = token || localStorage.getItem('authToken')
      if (!authToken) {
        router.replace('/admin/login')
        return
      }

      // Check if user is admin
      const meResponse = await fetch('/api/auth/me', { 
        headers: { Authorization: `Bearer ${authToken}` } 
      })
      
      if (!meResponse.ok) {
        throw new Error(`Authentication failed: ${meResponse.status}`)
      }
      
      const userData = await meResponse.json()
      
      if (userData.role !== 'admin') {
        setError(`Access denied. Admin role required. Your role: ${userData.role}`)
        setIsLoading(false)
        return
      }

      console.log('Admin access confirmed, loading orders...')

      // Use admin endpoint to get all orders
      const ordersResponse = await fetch('/api/admin/orders', { 
        headers: { Authorization: `Bearer ${authToken}` } 
      })
      
      if (!ordersResponse.ok) {
        const errorData = await ordersResponse.json()
        throw new Error(errorData?.message || `Failed to load orders: ${ordersResponse.status}`)
      }
      
      const data = await ordersResponse.json()
      console.log('Orders loaded:', data.orders?.length || 0)

      setOrders(data.orders || [])
      calculateStats(data.orders || [])
      
    } catch (err: any) {
      console.error('Error loading orders:', err)
      setError(err.message || 'Failed to load orders')
    } finally {
      setIsLoading(false)
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

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      setLoadingId(id)
      const token = localStorage.getItem('authToken')
      if (!token) {
        router.replace('/admin/login')
        return
      }

      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status }),
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

  const deleteOrder = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return
    }

    try {
      setLoadingId(id)
      const token = localStorage.getItem('authToken')
      if (!token) {
        router.replace('/admin/login')
        return
      }

      const res = await fetch(`/api/admin/orders/${id}`, {
        method: 'DELETE',
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      })
      
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.message || 'Delete failed')
      }
      
      await loadOrders(token)
    } catch (e: any) {
      setError(e?.message || 'Delete failed')
    } finally {
      setLoadingId(null)
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      paid: 'bg-green-500/20 text-green-400 border-green-500/30',
      delivered: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: Clock,
      confirmed: CheckCircle2,
      paid: IndianRupee,
      delivered: Truck,
      cancelled: X
    }
    return icons[status as keyof typeof icons] || Package
  }

  const getStatColor = (stat: string) => {
    const colors = {
      total: 'from-blue-600 to-cyan-600',
      pending: 'from-yellow-600 to-amber-600',
      confirmed: 'from-blue-600 to-indigo-600',
      paid: 'from-green-600 to-emerald-600',
      delivered: 'from-purple-600 to-pink-600',
      cancelled: 'from-red-600 to-rose-600'
    }
    return colors[stat as keyof typeof colors] || 'from-gray-600 to-gray-700'
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    router.replace('/admin/login')
  }

  const getTotalRevenue = () => {
    return orders
      .filter(order => order.status === 'paid' || order.status === 'delivered')
      .reduce((sum, order) => sum + order.total, 0)
  }

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab)

  const tabs = [
    { id: 'all', name: 'All Orders', count: orders.length },
    { id: 'pending', name: 'Pending', count: stats.pending },
    { id: 'confirmed', name: 'Confirmed', count: stats.confirmed },
    { id: 'paid', name: 'Paid', count: stats.paid },
    { id: 'delivered', name: 'Delivered', count: stats.delivered },
    { id: 'cancelled', name: 'Cancelled', count: stats.cancelled }
  ]

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-6">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-500/20 p-8 max-w-md w-full text-center">
          <RefreshCw className="w-16 h-16 text-blue-400 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading...</h2>
          <p className="text-gray-300">Checking admin access and loading orders</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-6">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-500/20 p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <div className="text-sm text-gray-400 mb-6 p-3 bg-gray-700/50 rounded">
            Check browser console for detailed error information
          </div>
          <div className="space-y-3">
            <button
              onClick={() => loadOrders()}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
            >
              Try Again
            </button>
            <button
              onClick={() => setError('')}
              className="w-full bg-gray-600 text-white py-3 rounded-xl font-medium hover:bg-gray-700 transition-all duration-300"
            >
              Clear Error
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md border-b border-blue-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-300">
                Total Orders: <span className="font-bold text-white">{orders.length}</span>
                {orders.length > 0 && (
                  <>
                    {' • '}
                    Revenue: <span className="font-bold text-green-400">₹{getTotalRevenue()}</span>
                  </>
                )}
              </div>
              <button
                onClick={() => loadOrders()}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600/50 rounded-lg hover:bg-blue-600/70 backdrop-blur-sm transition-all duration-300 border border-blue-500/30"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600/50 rounded-lg hover:bg-red-600/70 backdrop-blur-sm transition-all duration-300 border border-red-500/30"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      {orders.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            {Object.entries(stats).map(([key, value]) => (
              <div 
                key={key}
                className={`bg-gradient-to-br ${getStatColor(key)} rounded-2xl p-4 shadow-lg border border-white/10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    {key === 'total' && <ShoppingCart className="w-6 h-6 text-white" />}
                    {key === 'pending' && <Clock className="w-6 h-6 text-white" />}
                    {key === 'confirmed' && <CheckCircle2 className="w-6 h-6 text-white" />}
                    {key === 'paid' && <IndianRupee className="w-6 h-6 text-white" />}
                    {key === 'delivered' && <Truck className="w-6 h-6 text-white" />}
                    {key === 'cancelled' && <X className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="text-sm text-white/80 capitalize">{key}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 p-4 bg-gray-800/50 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 border backdrop-blur-sm ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/25'
                    : 'bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-700/70'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-gray-600/50'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Orders */}
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status)
              return (
                <div 
                  key={order.id} 
                  className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-500/20 p-6 transform hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-sm ${getStatusColor(order.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium capitalize">{order.status}</span>
                      </div>
                      <div className="text-sm text-gray-300 font-mono bg-gray-700/50 px-2 py-1 rounded">
                        #{order.id.slice(0, 8)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 bg-gray-700/50 px-3 py-1 rounded">
                      {order.created_at && new Date(order.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 bg-gray-700/30 p-3 rounded-lg">
                      <User className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">User:</span>
                      <span className="text-sm font-medium text-white">
                        {order.user_name || order.user_email || order.user_id.slice(0, 8)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-700/30 p-3 rounded-lg">
                      <IndianRupee className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">Total:</span>
                      <span className="text-sm font-medium text-green-400">₹{order.total}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-700/30 p-3 rounded-lg">
                      <Package className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-gray-300">Items:</span>
                      <span className="text-sm font-medium text-white">{order.items?.length || 0}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.items && order.items.length > 0 && (
                    <div className="mb-4 bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                      <h4 className="text-sm font-bold mb-3 text-white flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Order Items
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center text-sm bg-gray-600/30 p-2 rounded">
                            <div>
                              <span className="text-white font-medium">{item.name}</span>
                              <span className="text-gray-400 ml-2">(x{item.quantity})</span>
                            </div>
                            <span className="text-green-400 font-medium">₹{item.unit_price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Admin Message Editor */}
                  <div className="mb-4 bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                    <h4 className="text-sm font-bold mb-3 text-white flex items-center gap-2">
                      <Edit3 className="w-4 h-4" />
                      Message to User
                    </h4>
                    <textarea
                      defaultValue={order.admin_message || ''}
                      placeholder="Type a message the user will see in their order..."
                      className="w-full bg-gray-800/60 text-white text-sm p-3 rounded border border-gray-600/50 focus:outline-none focus:border-blue-500/60"
                      rows={3}
                      onChange={(e) => { (order as any)._draft = e.target.value }}
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        disabled={loadingId === order.id}
                        onClick={() => updateOrderMessage(order.id, ((order as any)._draft ?? order.admin_message ?? ''))}
                        className="px-4 py-2 text-sm bg-blue-600/50 text-white rounded-lg hover:bg-blue-600/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-blue-500/30 backdrop-blur-sm"
                      >
                        {loadingId === order.id ? 'Saving...' : 'Save Message'}
                      </button>
                      {order.admin_message && (
                        <span className="text-xs text-gray-300 self-center">Current: "{order.admin_message}"</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      disabled={loadingId === order.id || order.status === 'confirmed'}
                      onClick={() => updateOrderStatus(order.id, 'confirmed')}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600/50 text-white rounded-lg hover:bg-blue-600/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-blue-500/30 backdrop-blur-sm"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {loadingId === order.id ? 'Updating...' : 'Confirm'}
                    </button>
                    <button
                      disabled={loadingId === order.id || order.status === 'paid'}
                      onClick={() => updateOrderStatus(order.id, 'paid')}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600/50 text-white rounded-lg hover:bg-green-600/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-green-500/30 backdrop-blur-sm"
                    >
                      <IndianRupee className="w-4 h-4" />
                      {loadingId === order.id ? 'Updating...' : 'Mark Paid'}
                    </button>
                    <button
                      disabled={loadingId === order.id || order.status === 'delivered'}
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-purple-600/50 text-white rounded-lg hover:bg-purple-600/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-purple-500/30 backdrop-blur-sm"
                    >
                      <Truck className="w-4 h-4" />
                      {loadingId === order.id ? 'Updating...' : 'Delivered'}
                    </button>
                    <button
                      disabled={loadingId === order.id || order.status === 'cancelled'}
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600/50 text-white rounded-lg hover:bg-red-600/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-red-500/30 backdrop-blur-sm"
                    >
                      <X className="w-4 h-4" />
                      {loadingId === order.id ? 'Updating...' : 'Cancel'}
                    </button>
                    <button
                      disabled={loadingId === order.id}
                      onClick={() => deleteOrder(order.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-red-700/50 text-white rounded-lg hover:bg-red-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-red-600/30 backdrop-blur-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      {loadingId === order.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {orders.length === 0 && !isLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-blue-500/20">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No orders found</h3>
            <p className="text-gray-400 mb-6">
              {activeTab === 'all' 
                ? 'No orders have been placed yet.' 
                : `No ${activeTab} orders found.`
              }
            </p>
            <button
              onClick={() => loadOrders()}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
            >
              Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
