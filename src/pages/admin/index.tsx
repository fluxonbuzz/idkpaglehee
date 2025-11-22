import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { 
  Package, 
  Users, 
  FileText,
  Shield,
  MessageSquare,
  Settings,
  LogOut,
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  Eye,
  Key,
  UserCheck,
  AlertTriangle,
  Store,
  Crown
} from 'lucide-react';

const adminPages = [
  {
    title: 'Orders',
    path: '/admin/orders',
    icon: <Package className="h-8 w-8" />,
    description: 'Manage customer orders and transactions',
    color: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20'
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: <Users className="h-8 w-8" />,
    description: 'Manage user accounts and permissions',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20'
  },
  {
    title: 'Applications',
    path: '/admin/applications',
    icon: <FileText className="h-8 w-8" />,
    description: 'Review and process applications',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20'
  },
  {
    title: 'License',
    path: '/admin/license',
    icon: <Key className="h-8 w-8" />,
    description: 'License key management system',
    color: 'from-yellow-400 to-yellow-600',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20'
  },
  {
    title: 'Appeals',
    path: '/admin/appeals',
    icon: <MessageSquare className="h-8 w-8" />,
    description: 'Handle user ban appeals',
    color: 'from-amber-400 to-amber-600',
    bgColor: 'bg-amber-400/10',
    borderColor: 'border-amber-400/20'
  },
  {
    title: 'Analytics',
    path: '/admin/analytics',
    icon: <BarChart3 className="h-8 w-8" />,
    description: 'View business insights and metrics',
    color: 'from-orange-400 to-orange-600',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/20'
  }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Particle Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }> = [];

    // Create yellow-themed particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: `hsl(${Math.random() * 20 + 40}, 70%, 60%)`, // Yellow to orange range
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 0, 0.05)'; // Dark yellow-ish background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (120 - distance) / 120 * 0.1;
            ctx.lineWidth = 0.3;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    const checkAuth = async () => {
      try {
        // Verify token with backend
        const response = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          throw new Error('Invalid token');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('authToken');
        router.replace('/admin/login');
      } finally {
        setIsLoading(false);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-yellow-200 text-lg">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 p-4">
        <div className="bg-yellow-900/50 backdrop-blur-xl p-8 rounded-3xl border border-yellow-500/30 shadow-2xl max-w-md w-full text-center">
          <Shield className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-yellow-100 mb-2">Access Denied</h2>
          <p className="text-yellow-200 mb-6">You need to be logged in to access the admin dashboard.</p>
          <button
            onClick={() => router.push('/admin/login')}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-900 transition-all transform hover:scale-105"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-900 relative overflow-hidden">
      {/* 3D Animated Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite linear`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="bg-yellow-900/30 backdrop-blur-xl border-b border-yellow-500/20">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-20 rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-yellow-500 to-amber-600 p-3 rounded-2xl border border-yellow-400/30">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 bg-clip-text text-transparent">
                    SX STORE ADMIN PANEL
                  </h1>
                  <p className="text-yellow-200 text-sm mt-1">Complete Store Management System</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 text-yellow-200">
                  <UserCheck className="h-5 w-5" />
                  <span className="text-sm font-medium">Admin</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 text-red-200 rounded-xl hover:bg-red-600/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Stats */}
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-yellow-900/40 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6 text-center">
              <div className="bg-yellow-500/20 p-3 rounded-xl inline-flex mb-3">
                <TrendingUp className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-yellow-100 font-semibold">Total Revenue</h3>
              <p className="text-2xl font-bold text-yellow-300 mt-2">₹2,45,678</p>
            </div>
            
            <div className="bg-amber-900/40 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 text-center">
              <div className="bg-amber-500/20 p-3 rounded-xl inline-flex mb-3">
                <Users className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-amber-100 font-semibold">Total Users</h3>
              <p className="text-2xl font-bold text-amber-300 mt-2">1,234</p>
            </div>
            
            <div className="bg-orange-900/40 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 text-center">
              <div className="bg-orange-500/20 p-3 rounded-xl inline-flex mb-3">
                <Package className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-orange-100 font-semibold">Orders Today</h3>
              <p className="text-2xl font-bold text-orange-300 mt-2">47</p>
            </div>
            
            <div className="bg-red-900/40 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 text-center">
              <div className="bg-red-500/20 p-3 rounded-xl inline-flex mb-3">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-red-100 font-semibold">Pending Actions</h3>
              <p className="text-2xl font-bold text-red-300 mt-2">12</p>
            </div>
          </div>

          {/* Admin Modules Grid */}
          <div className="bg-yellow-900/20 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-yellow-100 mb-3">Admin Modules</h2>
              <p className="text-yellow-200 max-w-2xl mx-auto">
                Manage all aspects of your store from one centralized dashboard
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminPages.map((page, index) => (
                <div
                  key={index}
                  className={`group relative backdrop-blur-sm border rounded-2xl p-6 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${page.bgColor} ${page.borderColor}`}
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"></div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${page.color} shadow-lg`}>
                      {page.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{page.title}</h3>
                      <p className="text-yellow-200 text-sm mb-4">{page.description}</p>
                      <button
                        onClick={() => router.push(page.path)}
                        className={`w-full py-3 bg-gradient-to-r ${page.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
                      >
                        <span>Access Module</span>
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-yellow-400/60 text-sm">
              SX Store Admin Panel v2.0 • Secure Management System
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0px) translateX(0);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
