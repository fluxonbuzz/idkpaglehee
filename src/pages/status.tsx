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
  const [viewMode, setViewMode] = useState<'customer' | 'admin' | 'stock'>('customer');
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [stockItems, setStockItems] = useState([
    { id: 'PROD-001', name: 'Squad Editor', price: 100, stock: 12, category: 'Tools', icon: <Wrench className="text-blue-500" /> },
    { id: 'PROD-002', name: 'Game Making Kit', price: 500, stock: 0, category: 'Kits', icon: <Gift className="text-purple-500" /> },
    { id: 'PROD-003', name: 'RC ID', price: 250, stock: 3, category: 'Accounts', icon: <Key className="text-yellow-500" /> },
    { id: 'PROD-004', name: 'Premium Mod Menu', price: 50, stock: 8, category: 'Mods', icon: <Zap className="text-green-500" /> },
    { id: 'PROD-005', name: 'Netflix Premium', price: 100, stock: 5, category: 'Accounts', icon: <Award className="text-red-500" /> },
    { id: 'PROD-006', name: 'All-in-One Checker', price: 80, stock: 0, category: 'Tools', icon: <Server className="text-indigo-500" /> },
    { id: 'PROD-007', name: 'Personal OBB', price: 100, stock: 15, category: 'Files', icon: <FileText className="text-pink-500" /> },
    { id: 'PROD-008', name: 'SX Premium Membership', price: 200, stock: 20, category: 'Subscriptions', icon: <Star className="text-orange-500" /> },
    { id: 'PROD-009', name: 'Shots Checker Pro', price: 120, stock: 2, category: 'Tools', icon: <Wrench className="text-teal-500" /> },
    { id: 'PROD-010', name: 'Custom Webpage', price: 100, stock: 10, category: 'Services', icon: <Box className="text-amber-500" /> }
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
  ]);

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

  const exportToCSV = () => {
    let csv = 'ID,Customer,Product,Price,Date,Status,Method\n';
    paymentData.forEach(item => {
      csv += `"${item.id}","${item.customer}","${item.product}",${item.price},"${item.date}","${item.status}","${item.method}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `payments_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportStockToCSV = () => {
    let csv = 'ID,Name,Category,Price,Stock\n';
    stockItems.forEach(item => {
      csv += `"${item.id}","${item.name}","${item.category}",${item.price},${item.stock}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `stock_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'shivaxadmins009') {
      setAdminLoggedIn(true);
      setViewMode('admin');
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setAdminLoggedIn(false);
    setViewMode('customer');
    setPassword('');
  };

  const increaseStock = (id: string) => {
    setStockItems(stockItems.map(item => 
      item.id === id ? { ...item, stock: item.stock + 1 } : item
    ));
  };

  const decreaseStock = (id: string) => {
    setStockItems(stockItems.map(item => 
      item.id === id ? { ...item, stock: Math.max(0, item.stock - 1) } : item
    ));
  };

  const clearStock = () => {
    setStockItems(stockItems.map(item => ({
      ...item,
      stock: item.name === 'Squad Editor' ? 12 : 
             item.name === 'Personal OBB' ? 15 :
             item.name === 'SX Premium Membership' ? 20 :
             item.name === 'Custom Webpage' ? 10 :
             item.name === 'Premium Mod Menu' ? 8 :
             item.name === 'Netflix Premium' ? 5 :
             item.name === 'RC ID' ? 3 :
             item.name === 'Shots Checker Pro' ? 2 : 0
    })));
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Empty', color: 'bg-red-500', level: 0 };
    if (stock <= 2) return { text: 'Very Low', color: 'bg-orange-500', level: 1 };
    if (stock <= 5) return { text: 'Low', color: 'bg-yellow-500', level: 2 };
    if (stock <= 10) return { text: 'Medium', color: 'bg-blue-500', level: 3 };
    return { text: 'High', color: 'bg-green-500', level: 4 };
  };

  if ((viewMode === 'admin' || viewMode === 'stock') && !adminLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-red-500 to-pink-600 shadow-lg">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold mt-6 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              Admin Portal
            </h1>
            <p className="mt-2 text-gray-400">Enter password to continue</p>
          </div>

          <form onSubmit={handleAdminLogin}>
            <div className="mb-6">
              <div className="relative text-gray-300">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  className="block w-full pl-10 pr-10 py-3 rounded-lg bg-gray-700/50 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye size={18} className="text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
              {loginError && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <AlertCircle className="mr-1" size={16} /> {loginError}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg font-medium bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white transition-all shadow-lg hover:shadow-red-500/20 flex items-center justify-center"
            >
              <Lock size={18} className="mr-2" />
              Unlock Admin Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setViewMode('customer')}
              className="text-sm text-gray-400 hover:text-gray-300 flex items-center justify-center w-full transition-colors"
            >
              <ChevronLeft size={16} className="mr-1" />
              Return to Customer View
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'stock') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700 hidden md:block z-50">
          <div className="p-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <Warehouse className="h-5 w-5 text-gray-950" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ShivaStock
              </span>
            </Link>
          </div>
          
          <nav className="px-4 space-y-1">
            <button 
              onClick={() => setViewMode('admin')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
            >
              <CreditCard className="h-5 w-5" /> 
              <span>Payments</span>
            </button>
            <button 
              onClick={() => setViewMode('stock')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-700/30 text-white transition-colors"
            >
              <Package className="h-5 w-5" /> 
              <span>Inventory</span>
            </button>
            <button 
              onClick={() => setViewMode('customer')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
            >
              <User className="h-5 w-5" /> 
              <span>Customer View</span>
            </button>
          </nav>
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-5 w-5" /> 
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Header */}
        <header className="fixed w-full z-40 bg-gray-800/80 backdrop-blur-md border-b border-gray-700 md:hidden">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-md flex items-center justify-center">
                <Warehouse className="h-5 w-5 text-gray-950" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ShivaStock
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </header>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-gray-800 border-l border-gray-700 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-md flex items-center justify-center">
                <Warehouse className="h-5 w-5 text-gray-950" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ShivaStock
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col p-6 space-y-2">
            <button
              onClick={() => {
                setViewMode('admin');
                setSidebarOpen(false);
              }}
              className="px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium text-left flex items-center gap-3"
            >
              <CreditCard className="h-5 w-5" /> Payments
            </button>
            <button
              onClick={() => {
                setViewMode('stock');
                setSidebarOpen(false);
              }}
              className="px-4 py-3 rounded-lg bg-gray-700/30 text-white transition-colors font-medium text-left flex items-center gap-3"
            >
              <Package className="h-5 w-5" /> Inventory
            </button>
            <button
              onClick={() => {
                setViewMode('customer');
                setSidebarOpen(false);
              }}
              className="px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium text-left flex items-center gap-3"
            >
              <User className="h-5 w-5" /> Customer View
            </button>
            <button
              onClick={() => {
                handleLogout();
                setSidebarOpen(false);
              }}
              className="px-4 py-3 rounded-lg hover:bg-gray-700 text-red-400 transition-colors font-medium text-left flex items-center gap-3 mt-8"
            >
              <LogOut className="h-5 w-5" /> Logout
            </button>
          </nav>
        </div>

        <main className="md:ml-64">
          <div className="container mx-auto px-4 py-8 pt-20 md:pt-8">
            <section className="mb-8">
              <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                      <Warehouse className="text-emerald-400" size={28} /> 
                      <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        Inventory Management
                      </span>
                    </h1>
                    <p className="text-gray-400 mt-1">Monitor and manage your product stock levels</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={clearStock}
                      className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                      <RotateCw size={16} /> Reset Stock
                    </button>
                    <button 
                      onClick={exportStockToCSV}
                      className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                      <Download size={16} /> Export
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="relative text-gray-300">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="block w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredStock.map((item) => {
                    const status = getStockStatus(item.stock);
                    const statusColors = {
                      0: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-400/30' },
                      1: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-400/30' },
                      2: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-400/30' },
                      3: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-400/30' },
                      4: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-400/30' }
                    };
                    
                    return (
                      <div 
                        key={item.id} 
                        className={`p-5 rounded-xl border ${statusColors[status.level].border} ${statusColors[status.level].bg} hover:shadow-lg transition-all`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-start gap-3">
                            <div className="p-3 rounded-lg bg-gray-700/50">
                              {item.icon}
                            </div>
                            <div>
                              <h3 className="font-bold">{item.name}</h3>
                              <p className="text-sm text-gray-400">{item.category}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status.level].text} ${statusColors[status.level].bg}`}>
                            {status.text}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-mono text-lg bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            ₹{item.price}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400">Stock:</span>
                            <span className="font-mono text-sm">
                              {item.stock}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center gap-2">
                          <button
                            onClick={() => decreaseStock(item.id)}
                            className={`p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors ${item.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={item.stock <= 0}
                          >
                            <Minus size={16} />
                          </button>
                          
                          <div className="flex-1 h-2 rounded-full bg-gray-700 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${status.color}`}
                              style={{ width: `${Math.min(100, (item.stock / 20) * 100)}%` }}
                            ></div>
                          </div>
                          
                          <button
                            onClick={() => increaseStock(item.id)}
                            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700 hidden md:block z-50">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <DollarSign className="h-5 w-5 text-gray-950" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ShivaPay
            </span>
          </Link>
        </div>
        
        <nav className="px-4 space-y-1">
          <Link 
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
          >
            <Home className="h-5 w-5" /> 
            <span>Home</span>
          </Link>
          {adminLoggedIn ? (
            <>
              <button 
                onClick={() => setViewMode('admin')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${viewMode === 'admin' ? 'bg-gray-700/30 text-white' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'} transition-colors`}
              >
                <CreditCard className="h-5 w-5" /> 
                <span>Payments</span>
              </button>
              <button 
                onClick={() => setViewMode('stock')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${viewMode === 'stock' ? 'bg-gray-700/30 text-white' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'} transition-colors`}
              >
                <Package className="h-5 w-5" /> 
                <span>Inventory</span>
              </button>
            </>
          ) : (
            <button 
              onClick={() => setViewMode('admin')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
            >
              <CreditCard className="h-5 w-5" /> 
              <span>Admin View</span>
            </button>
          )}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {adminLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700/50 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-5 w-5" /> 
              <span>Logout</span>
            </button>
          ) : (
            <div className="text-xs text-gray-500 p-4">
              <p>© 2025 Shiva X Mods</p>
              <p className="mt-1">All rights reserved</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <header className="fixed w-full z-40 bg-gray-800/80 backdrop-blur-md border-b border-gray-700 md:hidden">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-md flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-gray-950" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ShivaPay
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 bg-gray-800 border-l border-gray-700 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-md flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-gray-950" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ShivaPay
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col p-6 space-y-2">
          <Link
            href="/"
            className="px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium text-left flex items-center gap-3"
            onClick={() => setSidebarOpen(false)}
          >
            <Home className="h-5 w-5" /> Home
          </Link>
          {adminLoggedIn ? (
            <>
              <button
                onClick={() => {
                  setViewMode('admin');
                  setSidebarOpen(false);
                }}
                className={`px-4 py-3 rounded-lg ${viewMode === 'admin' ? 'bg-gray-700/30 text-white' : 'hover:bg-gray-700'} transition-colors font-medium text-left flex items-center gap-3`}
              >
                <CreditCard className="h-5 w-5" /> Payments
              </button>
              <button
                onClick={() => {
                  setViewMode('stock');
                  setSidebarOpen(false);
                }}
                className={`px-4 py-3 rounded-lg ${viewMode === 'stock' ? 'bg-gray-700/30 text-white' : 'hover:bg-gray-700'} transition-colors font-medium text-left flex items-center gap-3`}
              >
                <Package className="h-5 w-5" /> Inventory
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setSidebarOpen(false);
                }}
                className="px-4 py-3 rounded-lg hover:bg-gray-700 text-red-400 transition-colors font-medium text-left flex items-center gap-3 mt-8"
              >
                <LogOut className="h-5 w-5" /> Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setViewMode('admin');
                setSidebarOpen(false);
              }}
              className="px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium text-left flex items-center gap-3"
            >
              <CreditCard className="h-5 w-5" /> Admin View
            </button>
          )}
        </nav>
      </div>

      <main className="md:ml-64">
        <div className="container mx-auto px-4 py-8 pt-20 md:pt-8">
          {/* Search Section */}
          <section className="mb-8">
            <div className="p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 shadow-lg">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    {viewMode === 'admin' ? (
                      <>
                        <BarChart2 className="text-emerald-400" size={28} />
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                          Admin Dashboard
                        </span>
                      </>
                    ) : (
                      <>
                        <DollarSign className="text-emerald-400" size={28} />
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                          Payment Portal
                        </span>
                      </>
                    )}
                  </h2>
                  <p className="text-gray-400 mt-1">
                    {viewMode === 'admin' ? 'Manage all payment transactions' : 'View your payment history'}
                  </p>
                </div>
                {viewMode === 'admin' && (
                  <button 
                    onClick={exportToCSV}
                    className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    <Download size={16} /> Export CSV
                  </button>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative text-gray-300">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by customer name, payment ID or product..."
                    className="block w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          {viewMode === 'admin' && (
            <section className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-800/50 border border-gray-700 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Revenue</p>
                      <p className="text-2xl md:text-3xl font-bold mt-1 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        ₹{totalRevenue}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400">
                      <DollarSign size={24} />
                    </div>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-gray-700">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-800/50 border border-gray-700 shadow-lg">
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
                
                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-800/50 border border-gray-700 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Pending</p>
                      <p className="text-2xl md:text-3xl font-bold mt-1">
                        ₹{pendingAmount}
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

                <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-800/50 border border-gray-700 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Cancelled</p>
                      <p className="text-2xl md:text-3xl font-bold mt-1">
                        ₹{cancelledAmount}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-red-500/10 text-red-400">
                      <XCircle size={24} />
                    </div>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-gray-700">
                    <div className="h-full rounded-full bg-red-500" style={{ width: `${(cancelledPayments / paymentData.length) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Customer Summary */}
          {viewMode === 'customer' && (
            <section className="mb-8">
              <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-800/50 border border-gray-700 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-3">
                    <User className="text-emerald-400" size={24} />
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      Your Payment Summary
                    </span>
                  </h2>
                  <div className="p-2 rounded-lg bg-gray-700/50">
                    <User size={20} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-5 rounded-lg bg-gray-700/30 border border-gray-600 flex items-center hover:border-emerald-400/30 hover:shadow-lg transition-all">
                    <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400 mr-4">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Completed</p>
                      <p className="text-lg font-bold">
                        {filteredData.filter(item => item.status === 'completed').length} payments
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-5 rounded-lg bg-gray-700/30 border border-gray-600 flex items-center hover:border-yellow-400/30 hover:shadow-lg transition-all">
                    <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-400 mr-4">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Pending</p>
                      <p className="text-lg font-bold">
                        {filteredData.filter(item => item.status === 'pending').length} payments
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-5 rounded-lg bg-gray-700/30 border border-gray-600 flex items-center hover:border-blue-400/30 hover:shadow-lg transition-all">
                    <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 mr-4">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Products</p>
                      <p className="text-lg font-bold">
                        {[...new Set(filteredData.map(item => item.product))].length} products
                      </p>
                    </div>
                  </div>
                </div>

                {/* Inventory Pulse */}
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
                        <p className="text-sm text-purple-300/70">Real-time stock monitoring</p>
                      </div>
                    </div>
                    <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:rotate-12">
                      <RefreshCw className="h-5 w-5 text-purple-300" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
                    {stockItems.slice(0, 5).map((item) => {
                      const status = getStockStatus(item.stock);
                      const statusColors = {
                        0: { bg: 'bg-red-500/90', text: 'text-red-100', border: 'border-red-400/50' },
                        1: { bg: 'bg-amber-500/90', text: 'text-amber-100', border: 'border-amber-400/50' },
                        2: { bg: 'bg-blue-500/90', text: 'text-blue-100', border: 'border-blue-400/50' },
                        3: { bg: 'bg-green-500/90', text: 'text-green-100', border: 'border-green-400/50' },
                        4: { bg: 'bg-emerald-500/90', text: 'text-emerald-100', border: 'border-emerald-400/50' }
                      };
                      
                      return (
                        <div 
                          key={item.id}
                          className="group transition-all duration-500 hover:z-10"
                        >
                          <div className={`relative p-4 rounded-xl ${statusColors[status.level].bg} ${statusColors[status.level].border} border shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl h-full`}>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 rounded-lg bg-white/10">
                                {item.icon}
                              </div>
                              <div>
                                <h3 className="font-bold text-white/90 text-sm">{item.name}</h3>
                                <p className="text-xs text-white/70">{item.category}</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-mono text-sm font-bold text-white">
                                ₹{item.price}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status.level].border} border bg-white/10 text-white`}>
                                {status.text}
                              </span>
                            </div>
                            
                            <div className="mt-3">
                              <div className="flex justify-between text-xs text-white/80 mb-1">
                                <span>Stock</span>
                                <span>{item.stock} units</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${statusColors[status.level].border} border`}
                                  style={{ width: `${Math.min(100, (item.stock / 20) * 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10 flex justify-center relative z-10">
                    <button 
                      onClick={() => setViewMode('stock')}
                      className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium shadow-lg hover:shadow-xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span>View Full Inventory</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Payment Table */}
          <section>
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-800/50 border border-gray-700 shadow-lg">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {viewMode === 'admin' ? 'Payment Details' : 'Your Payment History'}
                </h2>
                {viewMode === 'customer' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setActiveTab('all')}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${activeTab === 'all' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20' : 'bg-gray-700/50 hover:bg-gray-700'}`}
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
                  </div>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-800/50 border-b border-gray-700">
                      {viewMode === 'admin' && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Payment ID</th>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      {viewMode === 'admin' && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
                      )}
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
                          {viewMode === 'admin' && (
                            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-300">{item.id}</td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{item.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-300">{item.product}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right font-mono text-gray-300">₹{item.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400">{item.date || '-'}</td>
                          {viewMode === 'admin' && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300">
                                {item.method}
                              </span>
                            </td>
                          )}
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
                        <td colSpan={viewMode === 'admin' ? 7 : 5} className="px-6 py-4 text-center">
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
              
              {viewMode === 'admin' && (
                <div className="p-4 bg-gray-800/50 flex justify-between items-center border-t border-gray-700">
                  <div>
                    <p className="text-sm text-gray-400">
                      Showing {filteredData.length} of {paymentData.length} payments
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Total Revenue</p>
                      <p className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">₹{totalRevenue}</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
