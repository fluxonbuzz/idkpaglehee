import { useEffect, useState, useMemo } from 'react'
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
  Filter,
  Search,
  Download,
  Upload,
  Mail,
  MessageSquare,
  Eye,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  MoreVertical,
  Calendar,
  BarChart,
  PieChart,
  TrendingUp,
  FileText,
  CreditCard,
  Ban,
  CheckCircle,
  MoreHorizontal
} from 'lucide-react'

interface Order {
  id: string
  user_id: string
  status: 'pending' | 'confirmed' | 'paid' | 'delivered' | 'cancelled'
  items: any[]
  subtotal: number
  total: number
  discount: any
  created_at: string
  updated_at: string
  user_email?: string
  user_name?: string
  shipping_address?: any
}

interface UserStats {
  totalUsers: number
  newUsers: number
  activeUsers: number
}

// Toast Notification Component
const Toast = ({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error' | 'info'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-[100] p-4 rounded-2xl backdrop-blur-lg border transition-all duration-300 animate-slide-in ${
      type === 'success' 
        ? 'bg-green-500/10 border-green-500/30 text-green-300' 
        : type === 'error'
        ? 'bg-red-500/10 border-red-500/30 text-red-300'
        : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          type === 'success' ? 'bg-green-400' : type === 'error' ? 'bg-red-400' : 'bg-blue-400'
        }`}></div>
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default function AdminOrders() {
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
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0
  })
  const [activeTab, setActiveTab] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [sortBy, setSortBy] = useState<'date' | 'total' | 'status'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' })

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000)
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      router.replace('/admin/login')
      return
    }
    loadOrders(token)
    loadUserStats(token)
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

      const meResponse = await fetch('/api/auth/me', { 
        headers: { Authorization: `Bearer ${authToken}` } 
      })
      
      if (!meResponse.ok) {
        if (meResponse.status === 401) {
          localStorage.removeItem('authToken')
          showNotification('Session expired. Please log in again.', 'error')
          router.replace('/admin/login')
          return
        }
        throw new Error(`Authentication failed: ${meResponse.status}`)
      }
      
      const userData = await meResponse.json()
      if (userData.role !== 'admin') {
        setError(`Access denied. Admin role required. Your role: ${userData.role}`)
        setIsLoading(false)
        return
      }

      const ordersResponse = await fetch('/api/admin/orders', { 
        headers: { Authorization: `Bearer ${authToken}` } 
      })
      
      if (!ordersResponse.ok) {
        const errorData = await ordersResponse.json()
        throw new Error(errorData?.message || `Failed to load orders: ${ordersResponse.status}`)
      }
      
      const data = await ordersResponse.json()
      setOrders(data.orders || [])
      calculateStats(data.orders || [])
      
    } catch (err: any) {
      console.error('Error loading orders:', err)
      setError(err.message || 'Failed to load orders')
      showNotification(err.message || 'Failed to load orders', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserStats = async (token: string) => {
    try {
      const response = await fetch('/api/admin/users/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setUserStats(data)
      }
    } catch (err) {
      console.error('Error loading user stats:', err)
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

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      setLoadingId(orderId)
      const token = localStorage.getItem('authToken')
      if (!token) throw new Error('No authentication token')

      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.message || 'Failed to update order status')
      }

      // Update local state
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
      setOrders(updatedOrders)
      calculateStats(updatedOrders)
      
      showNotification(`Order marked as ${status}`, 'success')
    } catch (err: any) {
      showNotification(err.message || 'Failed to update order', 'error')
    } finally {
      setLoadingId(null)
    }
  }

  const deleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return
    }

    try {
      setLoadingId(orderId)
      const token = localStorage.getItem('authToken')
      if (!token) throw new Error('No authentication token')

      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.message || 'Failed to delete order')
      }

      // Remove from local state
      const updatedOrders = orders.filter(order => order.id !== orderId)
      setOrders(updatedOrders)
      calculateStats(updatedOrders)
      
      showNotification('Order deleted successfully', 'success')
    } catch (err: any) {
      showNotification(err.message || 'Failed to delete order', 'error')
    } finally {
      setLoadingId(null)
    }
  }

  const markAsPaid = async (orderId: string) => {
    await updateOrderStatus(orderId, 'paid')
  }

  const cancelOrder = async (orderId: string) => {
    await updateOrderStatus(orderId, 'cancelled')
  }

  const confirmOrder = async (orderId: string) => {
    await updateOrderStatus(orderId, 'confirmed')
  }

  const markAsDelivered = async (orderId: string) => {
    await updateOrderStatus(orderId, 'delivered')
  }

  const filteredOrders = useMemo(() => {
    let filtered = orders

    // Filter by active tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(order => order.status === activeTab)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user_email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort orders
    filtered.sort((a, b) => {
      let aValue: any, bValue: any
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.created_at)
          bValue = new Date(b.created_at)
          break
        case 'total':
          aValue = a.total
          bValue = b.total
          break
        case 'status':
          aValue = a.status
          bValue = b.status
          break
        default:
          aValue = new Date(a.created_at)
          bValue = new Date(b.created_at)
      }

      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : 1
      } else {
        return aValue < bValue ? -1 : 1
      }
    })

    return filtered
  }, [orders, activeTab, searchTerm, sortBy, sortOrder])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'confirmed': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'paid': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'delivered': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'paid': return <CreditCard className="w-4 h-4" />
      case 'delivered': return <Truck className="w-4 h-4" />
      case 'cancelled': return <Ban className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  const getStatusActions = (order: Order) => {
    const actions = []
    
    if (order.status === 'pending') {
      actions.push(
        { label: 'Confirm', action: () => confirmOrder(order.id), color: 'blue', icon: CheckCircle },
        { label: 'Paid', action: () => markAsPaid(order.id), color: 'green', icon: CreditCard },
        { label: 'Cancel', action: () => cancelOrder(order.id), color: 'red', icon: Ban }
      )
    } else if (order.status === 'confirmed') {
      actions.push(
        { label: 'Paid', action: () => markAsPaid(order.id), color: 'green', icon: CreditCard },
        { label: 'Cancel', action: () => cancelOrder(order.id), color: 'red', icon: Ban }
      )
    } else if (order.status === 'paid') {
      actions.push(
        { label: 'Deliver', action: () => markAsDelivered(order.id), color: 'purple', icon: Truck },
        { label: 'Cancel', action: () => cancelOrder(order.id), color: 'red', icon: Ban }
      )
    } else if (order.status === 'delivered') {
      // No status actions for delivered orders
    }
    
    return actions
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900">
      {/* Notification */}
      {notification.show && (
        <Toast 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification({ show: false, message: '', type: 'success' })} 
        />
      )}

      {/* Header */}
      <header className="bg-gray-800/30 backdrop-blur-xl sticky top-0 z-40 border-b border-purple-800/20">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Order Management
                </h1>
                <p className="text-sm text-gray-400">Manage and track customer orders</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <button
                onClick={() => loadOrders()}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-gray-600/50 rounded-xl text-sm font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 backdrop-blur-sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-500/10 border-l-4 border-red-400 p-4 rounded-r-xl backdrop-blur-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 mb-8">
          <div className="bg-gray-800/40 backdrop-blur-sm overflow-hidden shadow-lg rounded-2xl border border-gray-700/50">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-3">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4 flex-1">
                  <dt className="text-sm font-medium text-gray-400 truncate">Total Orders</dt>
                  <dd className="text-2xl font-semibold text-white">{stats.total}</dd>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm overflow-hidden shadow-lg rounded-2xl border border-gray-700/50">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500/20 rounded-xl p-3">
                  <Clock className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-4 flex-1">
                  <dt className="text-sm font-medium text-gray-400 truncate">Pending</dt>
                  <dd className="text-2xl font-semibold text-white">{stats.pending}</dd>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm overflow-hidden shadow-lg rounded-2xl border border-gray-700/50">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500/20 rounded-xl p-3">
                  <CheckCircle className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-4 flex-1">
                  <dt className="text-sm font-medium text-gray-400 truncate">Confirmed</dt>
                  <dd className="text-2xl font-semibold text-white">{stats.confirmed}</dd>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm overflow-hidden shadow-lg rounded-2xl border border-gray-700/50">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500/20 rounded-xl p-3">
                  <CreditCard className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-4 flex-1">
                  <dt className="text-sm font-medium text-gray-400 truncate">Paid</dt>
                  <dd className="text-2xl font-semibold text-white">{stats.paid}</dd>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm overflow-hidden shadow-lg rounded-2xl border border-gray-700/50">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500/20 rounded-xl p-3">
                  <Truck className="h-6 w-6 text-purple-400" />
                </div>
                <div className="ml-4 flex-1">
                  <dt className="text-sm font-medium text-gray-400 truncate">Delivered</dt>
                  <dd className="text-2xl font-semibold text-white">{stats.delivered}</dd>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm overflow-hidden shadow-lg rounded-2xl border border-gray-700/50">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500/20 rounded-xl p-3">
                  <Ban className="h-6 w-6 text-red-400" />
                </div>
                <div className="ml-4 flex-1">
                  <dt className="text-sm font-medium text-gray-400 truncate">Cancelled</dt>
                  <dd className="text-2xl font-semibold text-white">{stats.cancelled}</dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-gray-800/40 backdrop-blur-sm shadow-lg rounded-2xl border border-gray-700/50 mb-6">
          <div className="px-6 py-4 border-b border-gray-700/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-900/50 rounded-xl p-1">
                {[
                  { id: 'all', label: 'All', count: stats.total },
                  { id: 'pending', label: 'Pending', count: stats.pending },
                  { id: 'confirmed', label: 'Confirmed', count: stats.confirmed },
                  { id: 'paid', label: 'Paid', count: stats.paid },
                  { id: 'delivered', label: 'Delivered', count: stats.delivered },
                  { id: 'cancelled', label: 'Cancelled', count: stats.cancelled }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full sm:w-64 text-white placeholder-gray-400"
                  />
                </div>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sort, order] = e.target.value.split('-')
                    setSortBy(sort as any)
                    setSortOrder(order as any)
                  }}
                  className="bg-gray-900/50 border border-gray-600/50 rounded-xl px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="total-desc">Highest Amount</option>
                  <option value="total-asc">Lowest Amount</option>
                  <option value="status-asc">Status A-Z</option>
                  <option value="status-desc">Status Z-A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No orders found</h3>
                <p className="text-gray-400 max-w-sm mx-auto">
                  {searchTerm || activeTab !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'No orders have been placed yet'
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700/50">
                  <thead className="bg-gray-900/30">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Order Details
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800/20 divide-y divide-gray-700/50">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-700/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">
                              #{order.id.slice(-8)}
                            </div>
                            <div className="text-sm text-gray-400">
                              {order.items?.length || 0} items
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {order.user_name || 'Guest'}
                            </div>
                            <div className="text-sm text-gray-400">
                              {order.user_email || 'No email'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">
                          ₹{order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(order.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1.5 capitalize">{order.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            {/* Status Update Buttons */}
                            {getStatusActions(order).map((action, idx) => (
                              <button
                                key={idx}
                                onClick={action.action}
                                disabled={loadingId === order.id}
                                className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-${action.color}-600 hover:bg-${action.color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${action.color}-500 disabled:opacity-50 transition-colors`}
                              >
                                <action.icon className="w-3 h-3 mr-1" />
                                {action.label}
                              </button>
                            ))}

                            {/* View Button */}
                            <button
                              onClick={() => router.push(`/admin/orders/${order.id}`)}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-600/50 text-xs font-medium rounded-lg text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => deleteOrder(order.id)}
                              disabled={loadingId === order.id}
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
                            >
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
