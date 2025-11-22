import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { 
  Package, 
  Users, 
  FileText,
  Shield,
  MessageSquare,
  Settings,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

const adminPages = [
  {
    title: 'Orders',
    path: '/admin/orders',
    icon: <Package className="h-6 w-6" />,
    description: 'Manage customer orders',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: <Users className="h-6 w-6" />,
    description: 'Manage user accounts',
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Applications',
    path: '/admin/applications',
    icon: <FileText className="h-6 w-6" />,
    description: 'Review applications',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'License',
    path: '/admin/license',
    icon: <Shield className="h-6 w-6" />,
    description: 'License management',
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    title: 'Appeals',
    path: '/admin/appeals',
    icon: <MessageSquare className="h-6 w-6" />,
    description: 'Handle user appeals',
    color: 'bg-pink-100 text-pink-600'
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: <Settings className="h-6 w-6" />,
    description: 'System settings',
    color: 'bg-gray-100 text-gray-600'
  }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    const checkAuth = async () => {
      try {
        // In a real app, verify token with backend
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (err) {
        console.error('Auth check failed:', err);
        router.replace('/admin/login');
      }
    };
    
    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to access the admin dashboard.</p>
          <button
            onClick={() => router.push('/admin/login')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminPages.map((page, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md p-4 ${page.color}`}
              >
                <div className="flex items-center mb-2">
                  {page.icon}
                  <h3 className="text-lg font-semibold text-gray-800 ml-2">{page.title}</h3>
                </div>
                <p className="text-gray-600">{page.description}</p>
                <button
                  onClick={() => router.push(page.path)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4"
                >
                  Go to {page.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
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
