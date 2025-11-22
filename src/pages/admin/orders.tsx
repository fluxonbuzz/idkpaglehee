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
}

interface UserStats {
  totalUsers: number
  newUsers: number
  activeUsers: number
}

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

  // Rest of the component code...
  // [Previous code continues...]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => loadOrders()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {notification.show && (
          <div className={`mb-4 p-4 rounded-md ${notification.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {notification.type === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${notification.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats and Filters */}
        <div className="mb-6">
          {/* Add your stats and filters here */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {/* Stats cards */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.total}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            {/* Add more stat cards here */}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              List of all recent orders
            </p>
          </div>
          <div className="border-t border-gray-200">
            {/* Add your orders table here */}
            <div className="px-4 py-5 sm:p-6">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating a new order.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.user_name || 'Guest'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => router.push(`/admin/orders/${order.id}`)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              View
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <MoreVertical className="h-4 w-4 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
