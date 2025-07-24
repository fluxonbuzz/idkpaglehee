import { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  Home,
  Download,
  Search,
  User,
  Users,
  CreditCard,
  Package,
  Lock,
  Eye,
  EyeOff,
  XCircle,
  Box,
  Plus,
  Minus,
  Trash2,
  RotateCw,
  Warehouse,
  AlertCircle,
  Battery,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  BatteryCharging,
  Star,
  Zap,
  Award,
  Gift,
  FileText,
  Server,
  Wrench,
  Key,
  RefreshCw,
  ArrowRight,
  Menu,
  X,
  BarChart2,
  PieChart,
  Filter,
  MoreVertical,
  Settings,
  LogOut,
  Activity,
  ShoppingCart,
  Tag,
  Layers,
  Database,
  Shield,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function PaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const [stockItems] = useState([
    { id: 'PROD-001', name: 'Squad Editor', price: 100, stock: 'Full', category: 'Tools', icon: <Wrench className="text-blue-500" /> },
    { id: 'PROD-002', name: 'Game Making Kit', price: 500, stock: 'Low', category: 'Kits', icon: <Gift className="text-purple-500" /> },
    { id: 'PROD-003', name: 'RC ID', price: 250, stock: 'Empty', category: 'Accounts', icon: <Key className="text-yellow-500" /> },
    { id: 'PROD-004', name: 'Premium Mod Menu', price: 50, stock: 'Medium', category: 'Mods', icon: <Zap className="text-green-500" /> },
    { id: 'PROD-005', name: 'Netflix Premium', price: 100, stock: 'Empty', category: 'Accounts', icon: <Award className="text-red-500" /> },
    { id: 'PROD-006', name: 'All-in-One Checker', price: 80, stock: 'Low', category: 'Tools', icon: <Server className="text-indigo-500" /> },
    { id: 'PROD-007', name: 'Personal OBB', price: 100, stock: 'Full', category: 'Files', icon: <FileText className="text-pink-500" /> },
    { id: 'PROD-008', name: 'SX Premium Membership', price: 200, stock: 'Full', category: 'Subscriptions', icon: <Star className="text-orange-500" /> },
    { id: 'PROD-009', name: 'Shots Checker Pro', price: 120, stock: 'Medium', category: 'Tools', icon: <Wrench className="text-teal-500" /> },
    { id: 'PROD-010', name: 'Custom Webpage', price: 100, stock: 'Full', category: 'Services', icon: <Box className="text-amber-500" /> }
  ]);

  const paymentData = [
    { id: 'PAY-001', customer: 'TH Cricket', product: 'Squad Editor', price: 100, status: 'cancelled', date: '2025-05-15', method: 'UPI' },
    { id: 'PAY-002', customer: 'Driven X', product: 'Squad Editor', price: 100, status: 'cancelled', date: '2025-05-18', method: 'UPI' },
    { id: 'PAY-003', customer: 'Simply Dev', product: 'Game Making Kit', price: 500, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-004', customer: 'Yadav', product: 'RC ID', price: 130, status: 'completed', date: '2025-05-22', method: 'UPI' },
    { id: 'PAY-005', customer: 'KULDEEP', product: 'RC ID', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-006', customer: 'Jas Wanth', product: '2 IDs (1 paid)', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-007', customer: 'Danish', product: 'RC24 ID', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-008', customer: 'Smoker', product: 'RC24 ID', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-009', customer: 'Sudha', product: 'Personal OBB', price: 100, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-010', customer: 'Mohammad Isham', product: 'RC24 ID', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-011', customer: 'король', product: 'Premium Mod Menu', price: 50, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-012', customer: 'Amit Jadon', product: 'Payout', price: 100, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-013', customer: 'Aman Bhai', product: 'Netflix Premium', price: 100, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-014', customer: 'Tripun Singh', product: 'RC24 ID', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-015', customer: 'GamiN', product: 'Squad Editor Pro', price: 100, status: 'cancelled', date: '', method: 'UPI' },
    { id: 'PAY-016', customer: 'Virat Kholi', product: 'RC24 ID', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-060', customer: 'SilentShadow', product: 'RC24 ID', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-061', customer: 'Muneer', product: 'RC24 ID', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-017', customer: 'Rajesh Kumar', product: 'RC24 ID (Level 20)', price: 30, status: 'completed', date: '2025-06-19', method: 'UPI' },
    { id: 'PAY-018', customer: 'Priya Sharma', product: 'RC24 ID (Level 50)', price: 50, status: 'completed', date: '2025-06-18', method: 'UPI' },
    { id: 'PAY-019', customer: 'Aarav Patel', product: 'RC24 ID (Level 85)', price: 100, status: 'completed', date: '2025-06-17', method: 'UPI' },
    { id: 'PAY-020', customer: 'Neha Gupta', product: 'All-in-One Checker', price: 80, status: 'completed', date: '2025-06-16', method: 'UPI' },
    { id: 'PAY-023', customer: 'Vikram Joshi', product: 'Netflix Premium Account', price: 100, status: 'completed', date: '2025-06-15', method: 'UPI' },
    { id: 'PAY-026', customer: 'Meera Nair', product: 'SX Premium Membership', price: 200, status: 'completed', date: '2025-06-10', method: 'UPI' },
    { id: 'PAY-027', customer: 'Suresh Babu', product: 'RC24 ID (Level 100)', price: 130, status: 'completed', date: '2025-06-14', method: 'UPI' },
    { id: 'PAY-029', customer: 'Rohan Malhotra', product: 'Squad Editor', price: 100, status: 'completed', date: '2025-06-13', method: 'UPI' },
    { id: 'PAY-032', customer: 'Kavita Choudhary', product: 'RC24 ID (Level 20)', price: 30, status: 'completed', date: '2025-06-12', method: 'UPI' },
    { id: 'PAY-033', customer: 'Sanjay Verma', product: 'RC24 ID (Level 50)', price: 50, status: 'completed', date: '2025-06-11', method: 'UPI' },
    { id: 'PAY-021', customer: 'Rahul Singh', product: 'Real Cricket 20 Legends', price: 70, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-022', customer: 'Ananya Reddy', product: 'Boundary Hoarding Checker', price: 70, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-024', customer: 'Deepika Iyer', product: 'Shots Checker Pro', price: 120, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-025', customer: 'Arjun Menon', product: 'Custom webpage', price: 100, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-028', customer: 'Pooja Desai', product: 'Premium Mod Menus', price: 50, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-030', customer: 'Anjali Kapoor', product: 'RC24 ID', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-031', customer: 'Vishal Bhatia', product: 'Game Making Kit', price: 500, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-034', customer: 'Divya Srinivasan', product: 'RC24 ID (Level 85)', price: 100, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-035', customer: 'Manoj Tiwari', product: 'RC24 ID (Level 100)', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-036', customer: 'Sunita Rao', product: 'All-in-One Checker', price: 80, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-037', customer: 'Rakesh Roshan', product: 'RC24 ID (Level 50)', price: 50, status: 'completed', date: '2025-06-09', method: 'UPI' },
    { id: 'PAY-038', customer: 'Babloo Pandey', product: 'Netflix Premium', price: 100, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-039', customer: 'Chintu Sharma', product: 'Squad Editor Pro', price: 100, status: 'completed', date: '2025-06-08', method: 'UPI' },
    { id: 'PAY-040', customer: 'Pappu Yadav', product: 'RC24 ID (Level 100)', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-041', customer: 'Guddu Bhaiya', product: 'Premium Mod Menu', price: 50, status: 'completed', date: '2025-06-07', method: 'UPI' },
    { id: 'PAY-042', customer: 'Munna Tripathi', product: 'Game Making Kit', price: 500, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-043', customer: 'Bablu Don', product: 'Personal OBB', price: 100, status: 'completed', date: '2025-06-06', method: 'UPI' },
    { id: 'PAY-044', customer: 'Golu Gupta', product: 'RC24 ID', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-045', customer: 'Rinku Singh', product: '2 IDs (1 paid)', price: 130, status: 'completed', date: '2025-06-05', method: 'UPI' },
    { id: 'PAY-046', customer: 'Lallan Mishra', product: 'SX Premium Membership', price: 200, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-047', customer: 'Chhotu Kumar', product: 'RC24 ID (Level 20)', price: 30, status: 'completed', date: '2025-06-04', method: 'UPI' },
    { id: 'PAY-048', customer: 'Bunty Chor', product: 'All-in-One Checker', price: 80, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-049', customer: 'Gopal Dada', product: 'Shots Checker Pro', price: 120, status: 'completed', date: '2025-06-03', method: 'UPI' },
    { id: 'PAY-050', customer: 'Mithun Chakraborty', product: 'Custom webpage', price: 100, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-051', customer: 'Rajiv Chaturvedi', product: 'RC24 ID (Level 85)', price: 100, status: 'completed', date: '2025-06-02', method: 'UPI' },
    { id: 'PAY-052', customer: 'Sunil Grover', product: 'Netflix Premium', price: 100, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-053', customer: 'Amitabh Srivastava', product: 'Squad Editor', price: 100, status: 'completed', date: '2025-06-01', method: 'UPI' },
    { id: 'PAY-054', customer: 'Vijay Malya', product: 'RC24 ID (Level 100)', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-055', customer: 'Sanjay Dutt', product: 'Premium Mod Menu', price: 50, status: 'completed', date: '2025-05-31', method: 'UPI' },
    { id: 'PAY-056', customer: 'Arshad Warsi', product: 'Game Making Kit', price: 500, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-057', customer: 'Javed Jaffrey', product: 'Personal OBB', price: 100, status: 'completed', date: '2025-05-30', method: 'UPI' },
    { id: 'PAY-058', customer: 'Asrani', product: 'RC24 ID', price: 130, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-059', customer: 'Paresh Rawal', product: '2 IDs (1 paid)', price: 130, status: 'completed', date: '2025-05-29', method: 'UPI' },
  ];

  const filteredData = paymentData.filter(item =>
    (item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.product.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (activeTab === 'all' || item.status === activeTab)
  );

  const filteredStock = stockItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = paymentData.reduce((sum, item) => item.status === 'completed' ? sum + item.price : sum, 0);
  const pendingAmount = paymentData.reduce((sum, item) => item.status === 'pending' ? sum + item.price : sum, 0);
  const cancelledAmount = paymentData.reduce((sum, item) => item.status === 'cancelled' ? sum + item.price : sum, 0);

  const completedPayments = paymentData.filter(item => item.status === 'completed').length;
  const pendingPayments = paymentData.filter(item => item.status === 'pending').length;
  const cancelledPayments = paymentData.filter(item => item.status === 'cancelled').length;

  const getStockColor = (stock: string) => {
    switch(stock) {
      case 'Full': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'Medium': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'Low': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'Empty': return 'bg-red-500/20 text-red-400 border-red-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
           onClick={() => setSidebarOpen(false)}></div>
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800/90 backdrop-blur-lg border-r border-purple-800/30 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SX Payments
            </h2>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <nav className="space-y-2">
            <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <Home size={18} /> Home
            </Link>
            <Link href="/store" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <ShoppingCart size={18} /> Store
            </Link>
            <Link href="/payments" className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/30 hover:bg-purple-800/30 transition">
              <CreditCard size={18} /> Payments
            </Link>
            <Link href="/downloads" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <Zap size={18} /> Games
            </Link>
            <Link href="/community" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <Users size={18} /> Community
            </Link>
            <Link href="/status" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <AlertCircle size={18} /> Status
            </Link>
            <Link href="/membership" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <Star size={18} /> Membership
            </Link>
          </nav>
        </div>
      </div>

      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-40 border-b border-purple-800/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              SX Payments
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="hover:text-purple-300 transition">Home</Link>
            <Link href="/store" className="hover:text-purple-300 transition">Store</Link>
            <Link href="/payments" className="hover:text-purple-300 transition">Payments</Link>
            <Link href="/downloads" className="hover:text-purple-300 transition">Games</Link>
            <Link href="/community" className="hover:text-purple-300 transition">Community</Link>
            <Link href="/status" className="hover:text-purple-300 transition">Status</Link>
            <Link href="/membership" className="hover:text-purple-300 transition">Membership</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-lg">
            Payment History
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent leading-tight">
            Your Transaction Records
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            View all your completed, pending and cancelled payments
          </p>
        </section>

        {/* Stats Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-800/50 border border-purple-800/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Spent</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ₹{totalRevenue}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-500/10 text-purple-400">
                  <DollarSign size={24} />
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-gray-700">
                <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-800/50 border border-blue-800/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">
                    {completedPayments}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                  <CheckCircle size={24} />
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-gray-700">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${(completedPayments / paymentData.length) * 100}%` }}></div>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-800/50 border border-yellow-800/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pending</p>
                  <p className="text-2xl md:text-3xl font-bold mt-1">
                    {pendingPayments}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-400">
                  <Clock size={24} />
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-gray-700">
                <div className="h-full rounded-full bg-yellow-500" style={{ width: `${(pendingPayments / paymentData.length) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-8">
          <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-purple-800/30 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative text-gray-300">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by customer name, payment ID or product..."
                  className="block w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${activeTab === 'all' ? 'bg-purple-500/10 text-purple-400 border border-purple-400/20' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setActiveTab('completed')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${activeTab === 'completed' ? 'bg-blue-500/10 text-blue-400 border border-blue-400/20' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                >
                  Completed
                </button>
                <button 
                  onClick={() => setActiveTab('pending')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${activeTab === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-400/20' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setActiveTab('cancelled')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${activeTab === 'cancelled' ? 'bg-red-500/10 text-red-400 border border-red-400/20' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Inventory Pulse */}
        <section className="mb-8">
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-purple-500/20 shadow-lg relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center">
                <div className="relative mr-4">
                  <div className="absolute inset-0 rounded-xl bg-purple-500/20 animate-pulse"></div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg relative z-10 flex items-center justify-center">
                    <Activity className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-200">
                    Inventory Pulse
                  </h2>
                  <p className="text-sm text-purple-300/70">Current stock availability</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
              {filteredStock.slice(0, 5).map((item) => (
                <div 
                  key={item.id}
                  className={`p-4 rounded-xl border ${getStockColor(item.stock)} hover:shadow-lg transition-all`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-white/10">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-400">{item.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ₹{item.price}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStockColor(item.stock)}`}>
                      {item.stock}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10 flex justify-center relative z-10">
              <Link 
                href="/store"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 flex items-center gap-2 group"
              >
                <span>View Full Store</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Payment Table */}
        <section>
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-800/50 border border-purple-800/30 shadow-lg">
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                Payment Details
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800/50 border-b border-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Payment ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr 
                        key={index} 
                        className={`${index !== filteredData.length - 1 ? 'border-gray-700' : ''} border-b hover:bg-gray-800/30 transition-colors`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-300">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{item.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-gray-300">₹{item.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">{item.date || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300">
                            {item.method}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.status === 'completed' ? 'bg-green-900/30 text-green-400 border border-green-400/20' :
                            item.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-400/20' :
                            'bg-red-900/30 text-red-400 border border-red-400/20'
                          }`}>
                            {item.status === 'completed' ? 'Completed' : item.status === 'pending' ? 'Pending' : 'Cancelled'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center">
                        <div className="p-8 text-center text-gray-500">
                          <Search size={48} className="mx-auto mb-4 opacity-30" />
                          <h3 className="text-lg font-medium text-gray-300">No payments found</h3>
                          <p className="mt-1">Try adjusting your search query</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-gray-800/50 flex justify-between items-center border-t border-gray-700">
              <div>
                <p className="text-sm text-gray-400">
                  Showing {filteredData.length} of {paymentData.length} payments
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <p className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">₹{totalRevenue}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900/50 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SX Payments</h3>
              <p className="text-gray-400 text-sm">
                Track all your transactions and payment history with SX Store.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-purple-300 transition text-sm">Home</Link></li>
                <li><Link href="/store" className="text-gray-400 hover:text-purple-300 transition text-sm">Store</Link></li>
                <li><Link href="/payments" className="text-gray-400 hover:text-purple-300 transition text-sm">Payments</Link></li>
                <li><Link href="/membership" className="text-gray-400 hover:text-purple-300 transition text-sm">Membership</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 hover:text-purple-300 transition text-sm">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-purple-300 transition text-sm">Privacy Policy</Link></li>
                <li><Link href="/refund" className="text-gray-400 hover:text-purple-300 transition text-sm">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22-.06-.32-.13-.1-.32-.02-.45.02-.2.06-3.39 2.14-4.84 3.06-.52.33-1 .5-1.43.5-.48 0-1.4-.27-2.08-.99-.75-.79-1.4-2.25-1.4-3.43 0-1.64 1.13-2.45 2.11-2.45.53 0 .98.18 1.38.4.25.15.47.33.68.55.23.23.46.46.75.68.32.25.7.38 1.12.38.42 0 .86-.13 1.23-.4 1.37-1.04 2.14-2.6 2.14-2.6.1-.2.25-.3.45-.3.1 0 .25.02.35.1.22.15.3.45.2.75z"/>
                  </svg>
                  <a href="https://t.me/lyastral" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                    @fluxon
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.03-.1.06-.22-.06-.32-.13-.1-.32-.02-.45.02-.2.06-3.39 2.14-4.84 3.06-.52.33-1 .5-1.43.5-.48 0-1.4-.27-2.08-.99-.75-.79-1.4-2.25-1.4-3.43 0-1.64 1.13-2.45 2.11-2.45.53 0 .98.18 1.38.4.25.15.47.33.68.55.23.23.46.46.75.68.32.25.7.38 1.12.38.42 0 .86-.13 1.23-.4 1.37-1.04 2.14-2.6 2.14-2.6.1-.2.25-.3.45-.3.1 0 .25.02.35.1.22.15.3.45.2.75z"/>
                  </svg>
                  <a href="https://t.me/shivaxmods42" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                    @ShivaXD
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} SX Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
