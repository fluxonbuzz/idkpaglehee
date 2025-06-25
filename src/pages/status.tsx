import { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
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
  ArrowRight
} from 'lucide-react';

export default function PaymentsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'customer' | 'admin' | 'stock'>('customer');
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [stockItems, setStockItems] = useState([
    { id: 'PROD-001', name: 'Squad Editor', price: 100, stock: 12, category: 'Tools', icon: <Wrench className="text-blue-500" /> },
    { id: 'PROD-002', name: 'Game Making Kit', price: 500, stock: 0, category: 'Kits', icon: <Gift className="text-purple-500" /> },
    { id: 'PROD-003', name: 'RC ID', price: 130, stock: 3, category: 'Accounts', icon: <Key className="text-yellow-500" /> },
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
  ];

  const filteredData = paymentData.filter(item =>
    item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStock = stockItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = paymentData.reduce((sum, item) => item.status === 'completed' ? sum + item.price : sum, 0);
  const pendingAmount = paymentData.reduce((sum, item) => item.status === 'pending' ? sum + item.price : sum, 0);
  const cancelledAmount = paymentData.reduce((sum, item) => item.status === 'cancelled' ? sum + item.price : sum, 0);

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
      <div className={`min-h-screen flex items-center justify-center transition-colors ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center p-4 rounded-full ${darkMode ? 'bg-red-500/20' : 'bg-red-100'}`}>
              <Lock className={`${darkMode ? 'text-red-400' : 'text-red-500'}`} size={32} />
            </div>
            <h1 className="text-2xl font-bold mt-4">Admin Portal</h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Enter password to continue</p>
          </div>

          <form onSubmit={handleAdminLogin}>
            <div className="mb-6">
              <div className={`relative ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  className={`block w-full pl-10 pr-10 py-3 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400' : 'bg-white border-gray-300 placeholder-gray-500'} border focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-red-500' : 'focus:ring-orange-500'} focus:border-transparent`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  ) : (
                    <Eye size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  )}
                </button>
              </div>
              {loginError && (
                <p className="mt-2 text-sm text-red-500">{loginError}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg font-medium ${darkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'} transition-colors flex items-center justify-center`}
            >
              <Lock size={18} className="mr-2" />
              Unlock Admin Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setViewMode('customer')}
              className={`text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} flex items-center justify-center w-full`}
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
      <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <header className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-red-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}>
                    <Warehouse className="text-white" size={20} />
                  </div>
                  <span className="ml-3 text-xl font-bold">ShivaStock</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-1 ml-8">
                  <button 
                    onClick={() => setViewMode('admin')}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <CreditCard size={16} className="inline mr-1" /> Payments
                  </button>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                >
                  <Lock size={16} className="inline mr-1" /> Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <section className="mb-8">
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                  <Warehouse className="mr-3" size={28} /> Inventory Management
                </h1>
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <button
                    onClick={clearStock}
                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <RotateCw size={16} className="mr-2" /> Reset Stock
                  </button>
                  <button 
                    onClick={exportStockToCSV}
                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <Download size={16} className="mr-2" /> Export
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className={`relative ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className={`block w-full pl-10 pr-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400' : 'bg-white border-gray-300 placeholder-gray-500'} border focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-red-500' : 'focus:ring-orange-500'} focus:border-transparent`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredStock.map((item) => {
                  const status = getStockStatus(item.stock);
                  return (
                    <div 
                      key={item.id} 
                      className={`p-5 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm hover:shadow-md transition-shadow`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start">
                          <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.category}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          status.level === 0 ? (darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800') :
                          status.level === 1 ? (darkMode ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800') :
                          status.level === 2 ? (darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800') :
                          status.level === 3 ? (darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800') :
                          (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800')
                        }`}>
                          {status.text}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-mono text-lg">₹{item.price}</span>
                        <div className="flex items-center">
                          <span className={`text-xs font-medium mr-2 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Stock:
                          </span>
                          <span className="font-mono text-sm">
                            {item.stock}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => decreaseStock(item.id)}
                          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${item.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={item.stock <= 0}
                        >
                          <Minus size={16} />
                        </button>
                        
                        <div className={`px-4 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <span className="font-medium">{item.stock}</span>
                        </div>
                        
                        <button
                          onClick={() => increaseStock(item.id)}
                          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
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
        </main>

        <footer className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-t py-8 mt-12`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center">
                <Warehouse className={`${darkMode ? 'text-red-500' : 'text-orange-500'} mr-2`} size={20} />
                <span className="text-lg font-bold">ShivaStock</span>
              </div>
              <div className={`mt-4 md:mt-0 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2025 Shiva X Mods. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <header className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-red-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}>
                  <DollarSign className="text-white" size={20} />
                </div>
                <span className="ml-3 text-xl font-bold">ShivaPay</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-1 ml-8">
                <Link href="/" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}>
                  <Home size={16} className="inline mr-1" /> Home
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              {adminLoggedIn ? (
                <>
                  <button
                    onClick={() => setViewMode('stock')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <Package size={16} className="inline mr-1" /> Stock
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                  >
                    <Lock size={16} className="inline mr-1" /> Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setViewMode('admin')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <CreditCard size={16} className="inline mr-1" /> Admin View
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow`}>
            <h2 className="text-xl font-bold mb-4">Find Your Payments</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className={`flex-1 relative ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search by customer name, payment ID or product..."
                  className={`block w-full pl-10 pr-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400' : 'bg-white border-gray-300 placeholder-gray-500'} border focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-red-500' : 'focus:ring-orange-500'} focus:border-transparent`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {viewMode === 'admin' && (
                <button 
                  onClick={exportToCSV}
                  className={`px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <Download size={16} className="mr-2" /> Export
                </button>
              )}
            </div>
          </div>
        </section>

        {viewMode === 'customer' && (
          <>
            <section className="mb-8">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Your Payment Summary</h2>
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <User size={20} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center`}>
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-600'} mr-4`}>
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
                      <p className="text-lg font-bold">
                        {filteredData.filter(item => item.status === 'completed').length} payments
                      </p>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center`}>
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-100 text-yellow-600'} mr-4`}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
                      <p className="text-lg font-bold">
                        {filteredData.filter(item => item.status === 'pending').length} payments
                      </p>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center`}>
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'} mr-4`}>
                      <Package size={20} />
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Products</p>
                      <p className="text-lg font-bold">
                        {[...new Set(filteredData.map(item => item.product))].length} products
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12 relative overflow-hidden">
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(12)].map((_, i) => (
      <div 
        key={i} 
        className={`absolute rounded-full opacity-10 ${i % 2 ? 'bg-indigo-400' : 'bg-purple-400'}`}
        style={{
          width: `${Math.random() * 200 + 50}px`,
          height: `${Math.random() * 200 + 50}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out ${Math.random() * 5}s`
        }}
      />
    ))}
  </div>

  <div className={`p-6 rounded-2xl bg-gradient-to-br from-purple-900/80 via-indigo-900/80 to-gray-900/90 text-white border border-white/10 backdrop-blur-xl shadow-2xl shadow-purple-500/20 relative overflow-hidden`}>
    {/* Glow effects */}
    <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-purple-600/30 blur-3xl"></div>
    <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-indigo-600/30 blur-3xl"></div>
    
    {/* Header */}
    <div className="flex items-center justify-between mb-6 relative z-10">
      <div className="flex items-center">
        <div className="relative mr-4">
          <div className="absolute inset-0 rounded-xl bg-purple-500/30 animate-pulse"></div>
          <div className={`p-3 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg relative z-10 flex items-center justify-center`}>
            <BatteryCharging className="h-6 w-6" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-200">
            Inventory Pulse
          </h2>
          <p className="text-sm text-purple-300/80">Real-time stock monitoring</p>
        </div>
      </div>
      <div className={`p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:rotate-12`}>
        <RefreshCw className="h-5 w-5 text-purple-300" />
      </div>
    </div>

    {/* Product grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 relative z-10">
      {stockItems.map((item) => {
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
            <div className={`relative p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl h-full group-hover:rotate-y-3`}>
              {/* Hover shine effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>
              </div>
              
              <div className="flex items-start mb-4">
                <div className={`p-3 rounded-xl mr-4 ${statusColors[status.level].bg} shadow-md`}>
                  {React.cloneElement(item.icon, { className: "h-5 w-5" })}
                </div>
                <div>
                  <h3 className="font-bold text-white/90">{item.name}</h3>
                  <p className="text-xs text-purple-300/70">{item.category}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-200">
                  ₹{item.price}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full ${statusColors[status.level].bg} ${statusColors[status.level].text} backdrop-blur-sm`}>
                  {status.text}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>Stock</span>
                  <span>{item.stock} units</span>
                </div>
                <div className={`h-2 rounded-full bg-white/10 overflow-hidden`}>
                  <div 
                    className={`h-full rounded-full ${statusColors[status.level].bg} transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min(100, (item.stock / 20) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`absolute rounded-full ${i % 2 ? 'bg-purple-400/30' : 'bg-indigo-400/30'}`}
                    style={{
                      width: '6px',
                      height: '6px',
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      animation: `float ${Math.random() * 10 + 5}s infinite ease-in-out ${Math.random() * 3}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
    
    {/* Footer */}
    <div className="mt-8 pt-6 border-t border-white/10 flex justify-center relative z-10">
      <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-lg hover:shadow-xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:-translate-y-1 flex items-center group">
        <span>View Full Inventory</span>
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
</section>
          </>
        )}

        {viewMode === 'admin' && (
          <section className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
              <div className={`mt-4 md:mt-0 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center`}>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last Updated:</span>
                <span className="ml-2 text-sm font-medium">{new Date().toLocaleString()}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Revenue</p>
                    <p className="text-2xl md:text-3xl font-bold mt-1">₹{totalRevenue}</p>
                  </div>
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-600'}`}>
                    <DollarSign size={24} />
                  </div>
                </div>
                <div className={`mt-4 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-full rounded-full bg-green-500" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed Payments</p>
                    <p className="text-2xl md:text-3xl font-bold mt-1">
                      {paymentData.filter(item => item.status === 'completed').length}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    <CheckCircle size={24} />
                  </div>
                </div>
                <div className={`mt-4 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-full rounded-full bg-blue-500" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending Payments</p>
                    <p className="text-2xl md:text-3xl font-bold mt-1">₹{pendingAmount}</p>
                  </div>
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-100 text-yellow-600'}`}>
                    <Clock size={24} />
                  </div>
                </div>
                <div className={`mt-4 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-full rounded-full bg-yellow-500" style={{ width: '20%' }}></div>
                </div>
              </div>

              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cancelled Payments</p>
                    <p className="text-2xl md:text-3xl font-bold mt-1">₹{cancelledAmount}</p>
                  </div>
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600'}`}>
                    <XCircle size={24} />
                  </div>
                </div>
                <div className={`mt-4 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-full rounded-full bg-red-500" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section>
          <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow`}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
              <h2 className="text-xl font-bold">
                {viewMode === 'admin' ? 'Payment Details' : 'Your Payment History'}
              </h2>
              {viewMode === 'admin' && (
                <button 
                  onClick={exportToCSV}
                  className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <Download size={16} className="mr-2" /> Export CSV
                </button>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b`}>
                    {viewMode === 'admin' && (
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment ID</th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                    {viewMode === 'admin' && (
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Method</th>
                    )}
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr 
                        key={index} 
                        className={`${index !== filteredData.length - 1 ? (darkMode ? 'border-gray-700' : 'border-gray-200') : ''} border-b ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                      >
                        {viewMode === 'admin' && (
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{item.id}</td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{item.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.product}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right font-mono">₹{item.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.date || '-'}</td>
                        {viewMode === 'admin' && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'
                            }`}>
                              {item.method}
                            </span>
                          </td>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.status === 'completed' ? 
                              (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                              item.status === 'pending' ?
                              (darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800') :
                              (darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                          }`}>
                            {item.status === 'completed' ? 'Completed' : item.status === 'pending' ? 'Pending' : 'Cancelled'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={viewMode === 'admin' ? 7 : 5} className="px-6 py-4 text-center">
                        <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          <Search size={48} className="mx-auto mb-4" />
                          <h3 className="text-lg font-medium">No payments found</h3>
                          <p className="mt-1">Try adjusting your search query</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {viewMode === 'admin' && (
              <div className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex justify-between items-center`}>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Showing {filteredData.length} of {paymentData.length} payments
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="text-right mr-6">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Revenue</p>
                    <p className="text-lg font-bold">₹{totalRevenue}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} border-t py-8 mt-12`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <DollarSign className={`${darkMode ? 'text-red-500' : 'text-orange-500'} mr-2`} size={20} />
              <span className="text-lg font-bold">ShivaPay</span>
            </div>
            <div className={`mt-4 md:mt-0 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2025 Shiva X Mods. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
