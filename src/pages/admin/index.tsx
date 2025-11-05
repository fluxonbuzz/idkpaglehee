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
  FileText
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
  shipping_address?: any
  payment_method?: string
  notes?: string
}

interface UserStats {
  totalUsers: number
  newUsers: number
  activeUsers: number
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
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' | 'error' })

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      router.replace('/admin/login')
      return
    }
    loadOrders(token)
    loadUserStats(token)
  }, [router])

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000)
  }

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
      
      if (!meResponse.ok) throw new Error(`Authentication failed: ${meResponse.status}`)
      
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

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = searchTerm === '' || 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTab = activeTab === 'all' || order.status === activeTab
      
      const orderDate = new Date(order.created_at)
      const matchesDate = (!dateRange.start || orderDate >= new Date(dateRange.start)) &&
                         (!dateRange.end || orderDate <= new Date(dateRange.end + 'T23:59:59'))
      
      return matchesSearch && matchesTab && matchesDate
    })

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
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      }
    })

    return filtered
  }, [orders, activeTab, searchTerm, dateRange, sortBy, sortOrder])

  // Bulk operations
  const toggleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredAndSortedOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredAndSortedOrders.map(order => order.id))
    }
  }

  const bulkUpdateStatus = async (status: string) => {
    if (selectedOrders.length === 0) return

    try {
      setLoadingId('bulk')
      const token = localStorage.getItem('authToken')
      if (!token) {
        router.replace('/admin/login')
        return
      }

      const responses = await Promise.all(
        selectedOrders.map(orderId =>
          fetch(`/api/admin/orders/${orderId}`, {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json', 
              Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify({ status }),
          })
        )
      )

      const allSuccess = responses.every(res => res.ok)
      if (allSuccess) {
        showNotification(`Successfully updated ${selectedOrders.length} orders`)
        setSelectedOrders([])
        setShowBulkActions(false)
        await loadOrders(token)
      } else {
        throw new Error('Some updates failed')
      }
    } catch (e: any) {
      showNotification(e?.message || 'Bulk update failed', 'error')
    } finally {
      setLoadingId(null)
    }
  }

  const bulkDeleteOrders = async () => {
    if (selectedOrders.length === 0 || !confirm(`Are you sure you want to delete ${selectedOrders.length} orders?`)) {
      return
    }

    try {
      setLoadingId('bulk')
      const token = localStorage.getItem('authToken')
      if (!token) {
        router.replace('/admin/login')
        return
      }

      const responses = await Promise.all(
        selectedOrders.map(orderId =>
          fetch(`/api/admin/orders/${orderId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
          })
        )
      )

      const allSuccess = responses.every(res => res.ok)
      if (allSuccess) {
        showNotification(`Successfully deleted ${selectedOrders.length} orders`)
        setSelectedOrders([])
        setShowBulkActions(false)
        await loadOrders(token)
      } else {
        throw new Error('Some deletions failed')
      }
    } catch (e: any) {
      showNotification(e?.message || 'Bulk delete failed', 'error')
    } finally {
      setLoadingId(null)
    }
  }

  const exportOrders = () => {
    const data = filteredAndSortedOrders.map(order => ({
      ID: order.id,
      Date: order.created_at,
      Customer: order.user_name || order.user_email,
      Email: order.user_email,
      Status: order.status,
      Subtotal: order.subtotal,
      Total: order.total,
      Items: order.items?.length || 0
    }))

    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    showNotification('Orders exported successfully')
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
      if (!res.ok) throw new Error(data?.message || 'Action failed')
      
      showNotification(`Order status updated to ${status}`)
      await loadOrders(token)
    } catch (e: any) {
      showNotification(e?.message || 'Action failed', 'error')
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
        headers: { Authorization: `Bearer ${token}` }
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || 'Delete failed')
      
      showNotification('Order deleted successfully')
      await loadOrders(token)
    } catch (e: any) {
      showNotification(e?.message || 'Delete failed', 'error')
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

  const getRevenueGrowth = () => {
    // Simplified revenue growth calculation
    const currentMonthRevenue = orders
      .filter(order => {
        const orderDate = new Date(order.created_at)
        const currentMonth = new Date().getMonth()
        return (order.status === 'paid' || order.status === 'delivered') && 
               orderDate.getMonth() === currentMonth
      })
      .reduce((sum, order) => sum + order.total, 0)

    const previousMonthRevenue = orders
      .filter(order => {
        const orderDate = new Date(order.created_at)
        const previousMonth = new Date().getMonth() - 1
        return (order.status === 'paid' || order.status === 'delivered') && 
               orderDate.getMonth() === previousMonth
      })
      .reduce((sum, order) => sum + order.total, 0)

    if (previousMonthRevenue === 0) return 100
    return ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100
  }

  const tabs = [
    { id: 'all', name: 'All Orders', count: orders.length },
    { id: 'pending', name: 'Pending', count: stats.pending },
    { id: 'confirmed', name: 'Confirmed', count: stats.confirmed },
    { id: 'paid', name: 'Paid', count: stats.paid },
    { id: 'delivered', name: 'Delivered', count: stats.delivered },
    { id: 'cancelled', name: 'Cancelled', count: stats.cancelled }
  ]

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
          <div className="space-y-3">
            <button
              onClick={() => loadOrders()}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-600/90 text-white border-green-500/30' 
            : 'bg-red-600/90 text-white border-red-500/30'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md border-b border-blue-500/20 shadow-lg sticky top-0 z-40">
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
                Orders: <span className="font-bold text-white">{orders.length}</span>
                {' • '}
                Revenue: <span className="font-bold text-green-400">₹{getTotalRevenue()}</span>
                {' • '}
                Growth: <span className={`font-bold ${getRevenueGrowth() >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {getRevenueGrowth().toFixed(1)}%
                </span>
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

      {/* Enhanced Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-8 gap-4 mb-8">
          {/* Order Stats */}
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
          
          {/* User Stats */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-4 shadow-lg border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{userStats.totalUsers}</p>
                <p className="text-sm text-white/80">Total Users</p>
              </div>
            </div>
          </div>

          {/* Revenue Stats */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-4 shadow-lg border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">₹{getTotalRevenue()}</p>
                <p className="text-sm text-white/80">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-blue-500/20 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders by ID, email, or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              {/* Date Range */}
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="total">Sort by Total</option>
                <option value="status">Sort by Status</option>
              </select>

              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white hover:bg-gray-600/50 transition-all duration-300 backdrop-blur-sm"
              >
                {sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={exportOrders}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600/50 rounded-lg hover:bg-green-600/70 backdrop-blur-sm transition-all duration-300 border border-green-500/30"
              >
                <Download className="w-4 h-4" />
                Export
              </button>

              <button
                onClick={() => setViewMode(prev => prev === 'list' ? 'grid' : 'list')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600/50 rounded-lg hover:bg-purple-600/70 backdrop-blur-sm transition-all duration-300 border border-purple-500/30"
              >
                {viewMode === 'list' ? <BarChart3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
                {viewMode === 'list' ? 'Grid' : 'List'}
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-2xl p-4 mb-6 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckSquare className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">
                  {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => bulkUpdateStatus('confirmed')}
                  disabled={loadingId === 'bulk'}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600/50 text-white rounded-lg hover:bg-blue-600/70 disabled:opacity-50 transition-all duration-300 border border-blue-500/30"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm Selected
                </button>
                <button
                  onClick={() => bulkUpdateStatus('paid')}
                  disabled={loadingId === 'bulk'}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600/50 text-white rounded-lg hover:bg-green-600/70 disabled:opacity-50 transition-all duration-300 border border-green-500/30"
                >
                  <IndianRupee className="w-4 h-4" />
                  Mark Paid
                </button>
                <button
                  onClick={() => bulkUpdateStatus('cancelled')}
                  disabled={loadingId === 'bulk'}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-red-600/50 text-white rounded-lg hover:bg-red-600/70 disabled:opacity-50 transition-all duration-300 border border-red-500/30"
                >
                  <X className="w-4 h-4" />
                  Cancel Selected
                </button>
                <button
                  onClick={bulkDeleteOrders}
                  disabled={loadingId === 'bulk'}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-red-700/50 text-white rounded-lg hover:bg-red-700/70 disabled:opacity-50 transition-all duration-300 border border-red-600/30"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedOrders([])}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-600/50 text-white rounded-lg hover:bg-gray-600/70 transition-all duration-300 border border-gray-500/30"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

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

        {/* Orders List */}
        <div className="space-y-4">
          {filteredAndSortedOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status)
            const isSelected = selectedOrders.includes(order.id)
            const isExpanded = expandedOrder === order.id

            return (
              <div 
                key={order.id} 
                className={`bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border transition-all duration-300 ${
                  isSelected 
                    ? 'border-yellow-500/50 bg-yellow-500/10' 
                    : 'border-blue-500/20 hover:border-blue-500/40'
                } ${isExpanded ? 'scale-[1.02]' : ''}`}
              >
                {/* Order Header */}
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleSelectOrder(order.id)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-5 h-5 text-yellow-400" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-sm ${getStatusColor(order.status)}`}>
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-sm font-medium capitalize">{order.status}</span>
                      </div>
                      
                      <div className="text-sm text-gray-300 font-mono bg-gray-700/50 px-2 py-1 rounded">
                        #{order.id.slice(0, 8)}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-300 bg-gray-700/50 px-3 py-1 rounded">
                        {order.created_at && new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        className="p-2 hover:bg-white/10 rounded transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
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

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-4 space-y-4 border-t border-gray-700/50 pt-4">
                      {/* Order Items */}
                      {order.items && order.items.length > 0 && (
                        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
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
                                  {item.variant && (
                                    <span className="text-gray-400 ml-2">- {item.variant}</span>
                                  )}
                                </div>
                                <span className="text-green-400 font-medium">₹{item.unit_price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Shipping Address */}
                      {order.shipping_address && (
                        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                          <h4 className="text-sm font-bold mb-3 text-white flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            Shipping Address
                          </h4>
                          <div className="text-sm text-gray-300 space-y-1">
                            <div>{order.shipping_address.name}</div>
                            <div>{order.shipping_address.address_line1}</div>
                            {order.shipping_address.address_line2 && (
                              <div>{order.shipping_address.address_line2}</div>
                            )}
                            <div>
                              {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.pincode}
                            </div>
                            <div>Phone: {order.shipping_address.phone}</div>
                          </div>
                        </div>
                      )}

                      {/* Order Notes */}
                      {order.notes && (
                        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                          <h4 className="text-sm font-bold mb-3 text-white flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Order Notes
                          </h4>
                          <p className="text-sm text-gray-300">{order.notes}</p>
                        </div>
                      )}
                    </div>
                  )}

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
              </div>
            )
          })}
        </div>

        {filteredAndSortedOrders.length === 0 && (
          <div className="text-center py-12 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-blue-500/20">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No orders found</h3>
            <p className="text-gray-400 mb-6">
              {activeTab === 'all' 
                ? 'No orders match your search criteria.' 
                : `No ${activeTab} orders match your search criteria.`
              }
            </p>
            {(searchTerm || dateRange.start || dateRange.end) && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setDateRange({ start: '', end: '' })
                }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Missing icon component
function List(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}
