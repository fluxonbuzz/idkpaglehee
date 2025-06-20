import { useState, useEffect } from 'react';
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
  EyeOff
} from 'lucide-react';

export default function PaymentsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'customer' | 'admin'>('customer');
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const paymentData = [
    { id: 'PAY-001', customer: 'TH Cricket', product: 'Squad Editor', price: 100, status: 'completed', date: '2025-05-15', method: 'UPI' },
    { id: 'PAY-002', customer: 'Driven X', product: 'Squad Editor', price: 100, status: 'completed', date: '2025-05-18', method: 'UPI' },
    { id: 'PAY-003', customer: 'Simply Dev', product: 'Game Making Kit', price: 500, status: 'pending', date: '', method: 'UPI' },
    { id: 'PAY-004', customer: 'Yadav', product: 'RC ID', price: 130, status: 'completed', date: '2025-05-22', method: 'UPI' },
    { id: 'PAY-005', customer: 'KULDEEP', product: 'RC ID', price: 130, status: 'pending', date: '', method: 'UPI' },
  ];

  const filteredData = paymentData.filter(item =>
    item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = paymentData.reduce((sum, item) => item.status === 'completed' ? sum + item.price : sum, 0);
  const pendingAmount = paymentData.reduce((sum, item) => item.status === 'pending' ? sum + item.price : sum, 0);

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

  if (viewMode === 'admin' && !adminLoggedIn) {
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
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                >
                  <Lock size={16} className="inline mr-1" /> Logout
                </button>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                              (darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                          }`}>
                            {item.status === 'completed' ? 'Completed' : 'Pending'}
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
