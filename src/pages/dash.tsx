// pages/payments.tsx
import { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Sun,
  Moon,
  Home,
  Download
} from 'lucide-react';

export default function PaymentsPage() {
  const [darkMode, setDarkMode] = useState(true);

  // Sample data
  const paymentData = [
    { customer: 'TH Cricket', product: 'Squad Editor', price: 100, status: 'completed', date: '2025-05-15' },
    { customer: 'Driven X', product: 'Squad Editor', price: 100, status: 'completed', date: '2025-05-18' },
    { customer: 'Simply Dev', product: 'Game Making Kit', price: 500, status: 'completed', date: '2025-05-20' },
    { customer: 'Yadav', product: 'RC ID', price: 130, status: 'completed', date: '2025-05-22' },
    { customer: 'KULDEEP', product: 'RC ID', price: 130, status: 'pending', date: '' },
  ];

  const totalRevenue = paymentData.reduce((sum, item) => item.status === 'completed' ? sum + item.price : sum, 0);
  const pendingAmount = paymentData.reduce((sum, item) => item.status === 'pending' ? sum + item.price : sum, 0);

  // Function to export data as CSV
  const exportToCSV = () => {
    // CSV header
    let csv = 'Customer,Product,Price,Date,Status\n';
    
    // Add data rows
    paymentData.forEach(item => {
      csv += `"${item.customer}","${item.product}",${item.price},"${item.date}","${item.status}"\n`;
    });

    // Create download link
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

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
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
              <Link 
                href="/status" 
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <ChevronRight size={16} className="mr-1" /> Status
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Payment Dashboard</h1>
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
                  <p className="text-2xl md:text-3xl font-bold mt-1">4</p>
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

        {/* Revenue Summary Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Revenue Summary */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Monthly Revenue</h2>
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <DollarSign size={20} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>April</span>
                  <span className="font-medium">₹0</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>May</span>
                  <span className="font-medium">₹830</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>June</span>
                  <span className="font-medium">₹130</span>
                </div>
              </div>
            </div>
            
            {/* Product Revenue Summary */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Revenue by Product</h2>
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <DollarSign size={20} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Squad Editor</span>
                  <span className="font-medium">₹200</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Game Making Kit</span>
                  <span className="font-medium">₹500</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>RC ID</span>
                  <span className="font-medium">₹130</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Details Section */}
        <section>
          <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow`}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
              <h2 className="text-xl font-bold">Payment Details</h2>
              <button 
                onClick={exportToCSV}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <Download size={16} className="mr-2" /> Export CSV
              </button>
            </div>
            
            {/* Customers Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border-b`}>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentData.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`${index !== paymentData.length - 1 ? (darkMode ? 'border-gray-700' : 'border-gray-200') : ''} border-b ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium">{item.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.product}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right font-mono">₹{item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{item.date || '-'}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Summary */}
            <div className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex justify-between items-center`}>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Showing {paymentData.length} of {paymentData.length} payments
                </p>
              </div>
              <div className="flex items-center">
                <div className="text-right mr-6">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Revenue</p>
                  <p className="text-lg font-bold">₹{totalRevenue}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
