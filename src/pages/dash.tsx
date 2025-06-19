// pages/payments.tsx
import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart2, 
  PieChart, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Sun,
  Moon
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

  // Chart data
  const monthlyData = [
    { month: 'Apr', revenue: 0 },
    { month: 'May', revenue: 830 },
    { month: 'Jun', revenue: 130 },
  ];

  const productRevenue = [
    { product: 'Squad Editor', revenue: 200 },
    { product: 'Game Making Kit', revenue: 500 },
    { product: 'RC ID', revenue: 130 },
  ];

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-md sticky top-0 z-10 border-b`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Shiva X Payments
          </Link>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link 
              href="/" 
              className={`px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition flex items-center gap-1`}
            >
              <ChevronRight size={16} /> Back Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Stats Overview */}
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-6">Payment Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Revenue</p>
                  <p className="text-3xl font-bold mt-1">₹{totalRevenue}</p>
                </div>
                <div className={`p-3 rounded-full ${darkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-600'}`}>
                  <DollarSign size={24} />
                </div>
              </div>
              <div className={`mt-4 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-full rounded-full bg-green-500" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed Payments</p>
                  <p className="text-3xl font-bold mt-1">4</p>
                </div>
                <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <CheckCircle size={24} />
                </div>
              </div>
              <div className={`mt-4 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-full rounded-full bg-blue-500" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending Payments</p>
                  <p className="text-3xl font-bold mt-1">₹{pendingAmount}</p>
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

        {/* Charts Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Revenue Bar Chart */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Monthly Revenue</h2>
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <BarChart2 size={20} />
                </div>
              </div>
              <div className="h-64">
                <div className="flex items-end h-48 gap-2 mt-4">
                  {monthlyData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className={`w-full rounded-t-sm ${index === monthlyData.length - 1 ? 'bg-gradient-to-t from-orange-500 to-red-500' : 'bg-gray-500'}`}
                        style={{ height: `${(item.revenue / 830) * 100}%` }}
                      ></div>
                      <span className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.month}</span>
                      <span className="text-xs font-medium mt-1">₹{item.revenue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Product Revenue Pie Chart */}
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Revenue by Product</h2>
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <PieChart size={20} />
                </div>
              </div>
              <div className="h-64 flex flex-col lg:flex-row items-center justify-center">
                <div className="relative w-40 h-40 mb-4 lg:mb-0 lg:mr-8">
                  {/* Pie chart representation */}
                  <div className="absolute inset-0 rounded-full border-8 border-transparent"
                    style={{
                      background: `conic-gradient(
                        #3b82f6 0% 24%,
                        #10b981 24% 82%,
                        #ef4444 82% 100%
                      )`
                    }}
                  ></div>
                  <div className={`absolute inset-4 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">₹{totalRevenue}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {productRevenue.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: 
                            index === 0 ? '#3b82f6' : 
                            index === 1 ? '#10b981' : '#ef4444'
                        }}
                      ></div>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.product}</span>
                      <span className="ml-auto text-sm font-medium">₹{item.revenue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Details Section */}
        <section>
          <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border`}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h2 className="text-2xl font-bold">Payment Details</h2>
            </div>
            
            {/* Customers Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                    <th className="px-6 py-3 text-left font-semibold">Customer</th>
                    <th className="px-6 py-3 text-left font-semibold">Product</th>
                    <th className="px-6 py-3 text-right font-semibold">Amount</th>
                    <th className="px-6 py-3 text-left font-semibold">Date</th>
                    <th className="px-6 py-3 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentData.map((item, index) => (
                    <tr 
                      key={index} 
                      className={`${index !== paymentData.length - 1 ? (darkMode ? 'border-gray-700' : 'border-gray-200') : ''} border-b`}
                    >
                      <td className="px-6 py-4 font-medium">{item.customer}</td>
                      <td className="px-6 py-4">{item.product}</td>
                      <td className="px-6 py-4 text-right font-mono">₹{item.price}</td>
                      <td className="px-6 py-4">{item.date || '-'}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                          item.status === 'completed' ? 
                            (darkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-800') :
                            (darkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-100 text-yellow-800')
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
            <div className={`p-6 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'} flex justify-between items-center`}>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Showing {paymentData.length} payments
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Revenue</p>
                  <p className="text-lg font-bold">₹{totalRevenue}</p>
                </div>
                <button className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}>
                  Export
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} border-t py-8`}>
        <div className="container mx-auto px-4 text-center">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>© 2025 Shiva X Mods. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
