import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Zap, Star, Tag, Gift, ShieldCheck, Download, X, Check, ArrowRight, Home, Users, AlertCircle, Clock, Plus, Edit, Trash2, Search, Heart, ChevronRight, ChevronLeft, Menu, User, Package, Settings, MessageCircle, LogOut, Bell, CreditCard, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Product {
  id: string;
  name: string;
  category: 'bundle' | 'account' | 'tool' | 'service' | 'mod';
  price: number;
  original_price?: number;
  description: string;
  features?: string[];
  tags?: string[];
  seller_contact?: string;
  mod_options?: {
    name: string;
    price: number;
  }[];
  is_pre_order?: boolean;
  pre_order_discount?: {
    original_price: number;
    discount_price: number;
    end_date: string;
  };
  images?: string[];
}

interface CartItem extends Product {
  quantity: number;
  selectedMod?: {
    name: string;
    price: number;
  };
}

interface DiscountCode {
  code: string;
  discount: number;
  minPurchase: number;
  type: 'percentage' | 'fixed';
}

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

// Enhanced Toast Notification
const Toast = ({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error' | 'info'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-[100] p-4 rounded-2xl backdrop-blur-lg border transition-all duration-300 animate-slide-in ${
      type === 'success' 
        ? 'bg-green-500/10 border-green-500/30 text-green-300' 
        : type === 'error'
        ? 'bg-red-500/10 border-red-500/30 text-red-300'
        : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${
          type === 'success' ? 'bg-green-400' : type === 'error' ? 'bg-red-400' : 'bg-blue-400'
        }`}></div>
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Success Animation Component
const SuccessAnimation = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 text-center max-w-sm mx-4">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale">
          <Check size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Order Placed!</h3>
        <p className="text-gray-300">Your order has been confirmed</p>
      </div>
    </div>
  );
};

// Order Progress Tracker
const OrderProgress = ({ status }: { status: string }) => {
  const steps = [
    { key: 'pending', label: 'Ordered' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const currentIndex = steps.findIndex(step => step.key === status);

  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.key} className="flex flex-col items-center flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
            index <= currentIndex
              ? 'bg-green-500 border-green-500 text-white'
              : 'bg-gray-700 border-gray-600 text-gray-400'
          }`}>
            {index < currentIndex ? <Check size={14} /> : index + 1}
          </div>
          <span className={`text-xs mt-2 text-center ${
            index <= currentIndex ? 'text-green-400' : 'text-gray-400'
          }`}>
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div className={`h-1 flex-1 mt-4 -mx-4 z-0 ${
              index < currentIndex ? 'bg-green-500' : 'bg-gray-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

// Support Chat Component
const SupportChat = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = { id: Date.now(), text: newMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, 
        { id: Date.now() + 1, text: 'Thanks for your message. Our team will get back to you soon!', sender: 'bot' }
      ]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-end p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-gray-800/90 backdrop-blur-lg rounded-2xl w-full max-w-md h-96 shadow-xl border border-purple-800/30">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <MessageCircle size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold">Support Chat</h3>
              <p className="text-xs text-gray-400">@cumbacksxbot</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        
        <div className="h-64 p-4 overflow-y-auto space-y-3">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs p-3 rounded-2xl ${
                message.sender === 'user' 
                  ? 'bg-purple-600 text-white rounded-br-none' 
                  : 'bg-gray-700 text-gray-100 rounded-bl-none'
              }`}>
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 p-3 rounded-2xl rounded-bl-none">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-2xl transition-all active:scale-95"
            >
              <MessageCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Smart Search Component
const SearchBar = ({ onSearch, onResultSelect }: { onSearch: (query: string) => void; onResultSelect: (product: Product) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock search results - replace with actual API call
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Game Account',
      category: 'account',
      price: 299,
      description: 'Full access premium account',
      images: ['/placeholder.jpg']
    },
    {
      id: '2',
      name: 'Game Mod Tool',
      category: 'tool',
      price: 199,
      description: 'Advanced modification tool',
      images: ['/placeholder.jpg']
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
    
    if (value.length > 1) {
      const filtered = mockProducts.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
          className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-sm"
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {results.map(product => (
            <div
              key={product.id}
              onClick={() => {
                onResultSelect(product);
                setIsOpen(false);
                setQuery('');
              }}
              className="p-4 border-b border-gray-700/50 last:border-b-0 hover:bg-gray-700/50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-sm">📦</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{product.name}</h4>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-1">{product.description}</p>
                </div>
                <div className="text-purple-300 font-bold">₹{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Full-screen Search */}
      {isOpen && window.innerWidth < 768 && (
        <div className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => setIsOpen(false)} className="p-2">
                <ChevronLeft size={20} />
              </button>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                />
              </div>
            </div>
            
            <div className="space-y-2">
              {results.map(product => (
                <div
                  key={product.id}
                  onClick={() => {
                    onResultSelect(product);
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50 hover:bg-gray-700/50 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                      <span className="text-white">📦</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-gray-400 text-sm mt-1">{product.description}</p>
                      <div className="text-purple-300 font-bold mt-2">₹{product.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const discountCodes: DiscountCode[] = [
  { code: 'WELCOME10', discount: 10, minPurchase: 100, type: 'percentage' },
  { code: 'SX20', discount: 20, minPurchase: 200, type: 'percentage' },
  { code: 'SAVE50', discount: 50, minPurchase: 250, type: 'fixed' }
];

const isClient = typeof window !== 'undefined';

export default function StorePage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [discountError, setDiscountError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedMod, setSelectedMod] = useState<{ name: string; price: number } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [me, setMe] = useState<User | null>(null);
  const [myOrders, setMyOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [showSupport, setShowSupport] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [adminSection, setAdminSection] = useState('dashboard');
  
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'account',
    price: 0,
    description: '',
    tags: [],
    features: [],
    images: ['/product-placeholder.jpg']
  });

  // Cart animation ref
  const cartIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isClient) return;
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthLoading(false);
      router.push('/login?redirect=/store');
      return;
    }
    
    const savedCart = localStorage.getItem('sx-cart');
    const savedWishlist = localStorage.getItem('sx-wishlist');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        setCart([]);
      }
    }
    
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        setWishlist([]);
      }
    }
    
    loadProducts();
    loadUserProfile();
  }, []);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem('sx-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem('sx-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
  };

  const animateCart = () => {
    if (cartIconRef.current) {
      cartIconRef.current.classList.add('animate-bounce');
      setTimeout(() => {
        cartIconRef.current?.classList.remove('animate-bounce');
      }, 600);
    }
  };

  const loadProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await fetch('/api/products');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  const loadUserProfile = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuthLoading(false);
      return;
    }
    
    try {
      const meRes = await fetch('/api/auth/me', { 
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      });
      
      if (meRes.ok) {
        const meData = await meRes.json();
        const userData = meData.user || meData;
        
        setMe({ 
          id: userData.id, 
          email: userData.email, 
          name: userData.name, 
          role: userData.role 
        });
        
        await loadOrders();
      } else {
        localStorage.removeItem('authToken');
        setMe(null);
        setMyOrders([]);
      }
    } catch (e) {
      setMe(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const loadOrders = async () => {
    setOrdersLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setMyOrders([]);
        return;
      }

      const ordRes = await fetch('/api/orders', { 
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      });
      
      if (ordRes.ok) {
        const ordData = await ordRes.json();
        setMyOrders(ordData.orders || []);
      } else if (ordRes.status === 401) {
        localStorage.removeItem('authToken');
        setMe(null);
        setMyOrders([]);
      } else {
        setMyOrders([]);
      }
    } catch (e) {
      setMyOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const newWishlist = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      
      if (!prev.includes(productId)) {
        showToast('Added to wishlist');
      } else {
        showToast('Removed from wishlist', 'info');
      }
      
      return newWishlist;
    });
  };

  const addToCart = (product: Product) => {
    if (product.category === 'mod' && product.mod_options && product.mod_options.length > 0 && !selectedMod) {
      showToast('Please select a mod option first', 'error');
      return;
    }

    const existingItemIndex = cart.findIndex(
      item => item.id === product.id && 
      (!product.mod_options || item.selectedMod?.name === selectedMod?.name)
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      const cartItem: CartItem = {
        ...product,
        quantity: 1,
        selectedMod: selectedMod || undefined
      };
      setCart([...cart, cartItem]);
    }

    setSelectedProduct(null);
    setSelectedMod(null);
    animateCart();
    
    const itemName = selectedMod ? `${product.name} - ${selectedMod.name}` : product.name;
    showToast(`${itemName} added to cart!`);
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login?redirect=/store');
      return;
    }

    if (!agreeToTerms) {
      setDiscountError('You must agree to the terms and conditions');
      return;
    }

    if (cart.length === 0) {
      setDiscountError('Your cart is empty');
      return;
    }

    setCheckoutLoading(true);
    setDiscountError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setCart([]);
      localStorage.removeItem('sx-cart');
      setShowCart(false);
      setShowSuccess(true);
      
      showToast('Order placed successfully!');
      
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to place order. Please try again.';
      setDiscountError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Enhanced Slide Bar Component
  const SlideBar = () => (
    <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
      <div className="relative w-80 h-full bg-gray-800/90 backdrop-blur-lg border-r border-purple-800/30 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SX Store
            </h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-gray-600/50 transition"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* User Info */}
          {me && (
            <div className="mb-8 p-4 bg-gray-700/30 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold">
                  {me.name?.charAt(0) || me.email.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{me.name || 'User'}</div>
                  <div className="text-sm text-gray-400">{me.email}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Main Navigation */}
          <nav className="space-y-2 mb-8">
            <button 
              onClick={() => { setActiveTab('home'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                activeTab === 'home' ? 'bg-purple-600/20 text-purple-300' : 'hover:bg-gray-700/50'
              }`}
            >
              <Home size={20} /> Home
            </button>
            <button 
              onClick={() => { setActiveTab('orders'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                activeTab === 'orders' ? 'bg-purple-600/20 text-purple-300' : 'hover:bg-gray-700/50'
              }`}
            >
              <Package size={20} /> My Orders
            </button>
            <button 
              onClick={() => { setActiveTab('wishlist'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                activeTab === 'wishlist' ? 'bg-purple-600/20 text-purple-300' : 'hover:bg-gray-700/50'
              }`}
            >
              <Heart size={20} /> Wishlist
            </button>
            <button 
              onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${
                activeTab === 'profile' ? 'bg-purple-600/20 text-purple-300' : 'hover:bg-gray-700/50'
              }`}
            >
              <User size={20} /> Profile
            </button>
          </nav>

          {/* Admin Navigation */}
          {me?.role === 'admin' && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Admin</h3>
              <nav className="space-y-2">
                {['dashboard', 'products', 'orders', 'users', 'settings'].map((section) => (
                  <button
                    key={section}
                    onClick={() => {
                      setAdminSection(section);
                      setShowAdminPanel(true);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${
                      adminSection === section ? 'bg-purple-600/20 text-purple-300' : 'hover:bg-gray-700/50'
                    }`}
                  >
                    {section === 'dashboard' && <BarChart3 size={18} />}
                    {section === 'products' && <Package size={18} />}
                    {section === 'orders' && <ShoppingCart size={18} />}
                    {section === 'users' && <Users size={18} />}
                    {section === 'settings' && <Settings size={18} />}
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Support & Actions */}
          <div className="space-y-2">
            <button 
              onClick={() => { setShowSupport(true); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-700/50 transition-all"
            >
              <MessageCircle size={20} /> Support Chat
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('authToken');
                setMe(null);
                setMyOrders([]);
                router.push('/login');
              }}
              className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-red-500/20 text-red-400 transition-all"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Bottom Navigation Component
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800/90 backdrop-blur-lg border-t border-gray-700/50 z-40 md:hidden">
      <div className="flex justify-around items-center p-3">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'orders', icon: Package, label: 'Orders' },
          { id: 'wishlist', icon: Heart, label: 'Wishlist' },
          { id: 'profile', icon: User, label: 'Profile' }
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center p-2 rounded-2xl transition-all flex-1 mx-1 ${
              activeTab === id ? 'text-purple-400 bg-purple-600/20' : 'text-gray-400'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Render different sections based on active tab
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'orders':
        return <OrdersSection orders={myOrders} />;
      case 'wishlist':
        return <WishlistSection 
          products={products.filter(p => wishlist.includes(p.id))}
          onProductSelect={setSelectedProduct}
          onWishlistToggle={toggleWishlist}
        />;
      case 'profile':
        return <ProfileSection user={me} />;
      default:
        return <HomeSection 
          products={products}
          searchQuery={searchQuery}
          onProductSelect={setSelectedProduct}
          onWishlistToggle={toggleWishlist}
          wishlist={wishlist}
          productsLoading={productsLoading}
        />;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading store...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white pb-16 md:pb-0">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showSuccess && <SuccessAnimation onComplete={() => setShowSuccess(false)} />}
      {showSupport && <SupportChat onClose={() => setShowSupport(false)} />}

      <SlideBar />

      {/* Enhanced Header */}
      <header className="bg-gray-800/30 backdrop-blur-xl sticky top-0 z-40 border-b border-purple-800/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-2xl bg-gray-700/50 hover:bg-gray-600/50 transition-all active:scale-95"
              >
                <Menu size={20} />
              </button>
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                SX Store
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile when not on home */}
            {activeTab === 'home' && (
              <div className="hidden md:flex flex-1 max-w-md mx-4">
                <SearchBar 
                  onSearch={setSearchQuery}
                  onResultSelect={setSelectedProduct}
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              {me?.role === 'admin' && (
                <button 
                  onClick={() => setShowAdminPanel(true)}
                  className="p-2 rounded-2xl bg-purple-700/50 hover:bg-purple-600/50 transition-all active:scale-95"
                >
                  <ShieldCheck size={20} />
                </button>
              )}
              <button 
                ref={cartIconRef}
                onClick={() => setShowCart(true)}
                className="relative p-2 rounded-2xl bg-purple-700/50 hover:bg-purple-600/50 transition-all active:scale-95"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search - Only show on home tab */}
          {activeTab === 'home' && (
            <div className="mt-3 md:hidden">
              <SearchBar 
                onSearch={setSearchQuery}
                onResultSelect={setSelectedProduct}
              />
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {renderActiveSection()}
      </main>

      <BottomNav />

      {/* Enhanced Cart Drawer */}
      {showCart && (
        <CartDrawer
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={(index: number, quantity: number) => {
            const newCart = [...cart];
            newCart[index].quantity = quantity;
            setCart(newCart);
          }}
          onRemoveItem={(index: number) => {
            const newCart = [...cart];
            newCart.splice(index, 1);
            setCart(newCart);
          }}
          discountCode={discountCode}
          onDiscountCodeChange={setDiscountCode}
          appliedDiscount={appliedDiscount}
          onApplyDiscount={() => {
            const code = discountCodes.find(dc => dc.code === discountCode.toUpperCase());
            if (!code) {
              setDiscountError('Invalid discount code');
              return;
            }
            const subtotal = cart.reduce((sum, item) => sum + (item.selectedMod ? item.selectedMod.price : item.price) * item.quantity, 0);
            if (subtotal < code.minPurchase) {
              setDiscountError(`Minimum purchase of ₹${code.minPurchase} required`);
              return;
            }
            setAppliedDiscount(code);
            setDiscountError('');
          }}
          onRemoveDiscount={() => {
            setAppliedDiscount(null);
            setDiscountCode('');
          }}
          discountError={discountError}
          agreeToTerms={agreeToTerms}
          onAgreeToTermsChange={setAgreeToTerms}
          onCheckout={handleCheckout}
          checkoutLoading={checkoutLoading}
          calculateTotal={() => {
            const subtotal = cart.reduce((sum, item) => sum + (item.selectedMod ? item.selectedMod.price : item.price) * item.quantity, 0);
            let discount = 0;
            if (appliedDiscount) {
              if (appliedDiscount.type === 'percentage') {
                discount = subtotal * (appliedDiscount.discount / 100);
              } else {
                discount = appliedDiscount.discount;
              }
            }
            const total = Math.max(0, subtotal - discount);
            return { subtotal, discount, total };
          }}
        />
      )}
    </div>
  );
}

// Additional Section Components
const HomeSection = ({ products, searchQuery, onProductSelect, onWishlistToggle, wishlist, productsLoading }: any) => {
  const categoryNames = {
    bundle: 'Special Bundles',
    account: 'Premium Accounts',
    tool: 'Game Tools',
    service: 'Custom Services',
    mod: 'Mod Menus'
  };

  const filteredProducts = (category: string) => 
    products.filter((product: any) => 
      product.category === category &&
      (searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const allProducts = searchQuery ? 
    products.filter((product: any) => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) : products;

  if (productsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-2xl text-sm font-medium mb-6 shadow-lg backdrop-blur-sm">
          🎮 Premium Digital Products
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent leading-tight">
          Game Like A Pro
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Exclusive accounts, tools, and services for serious gamers
        </p>
      </section>

      {/* Products Grid */}
      {!searchQuery ? (
        Object.entries(categoryNames).map(([categoryKey, categoryName]) => {
          const categoryProducts = filteredProducts(categoryKey);
          if (categoryProducts.length === 0) return null;
          
          return (
            <section key={categoryKey} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  {categoryKey === 'bundle' && <Gift size={24} className="text-pink-400" />}
                  {categoryKey === 'account' && <ShieldCheck size={24} className="text-purple-400" />}
                  {categoryKey === 'tool' && <Zap size={24} className="text-blue-400" />}
                  {categoryKey === 'service' && <Star size={24} className="text-yellow-400" />}
                  {categoryKey === 'mod' && <Download size={24} className="text-green-400" />}
                  {categoryName}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map((product: any) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onSelect={onProductSelect}
                    onWishlistToggle={onWishlistToggle}
                    isInWishlist={wishlist.includes(product.id)}
                  />
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.map((product: any) => (
            <ProductCard 
              key={product.id}
              product={product}
              onSelect={onProductSelect}
              onWishlistToggle={onWishlistToggle}
              isInWishlist={wishlist.includes(product.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

const OrdersSection = ({ orders }: any) => (
  <div>
    <h2 className="text-2xl font-bold mb-8">My Orders</h2>
    {orders.length === 0 ? (
      <div className="text-center py-16">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">No orders yet</p>
      </div>
    ) : (
      <div className="space-y-6">
        {orders.map((order: any) => (
          <div key={order.id} className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <OrderProgress status={order.status} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Order ID</div>
                <div className="font-medium">#{order.id?.slice(0, 8)}</div>
              </div>
              <div>
                <div className="text-gray-400">Date</div>
                <div className="font-medium">
                  {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Total</div>
                <div className="font-medium">₹{order.total || 0}</div>
              </div>
              <div>
                <div className="text-gray-400">Status</div>
                <div className={`font-medium ${
                  order.status === 'delivered' ? 'text-green-400' : 
                  order.status === 'cancelled' ? 'text-red-400' : 
                  'text-yellow-400'
                }`}>
                  {order.status || 'pending'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const WishlistSection = ({ products, onProductSelect, onWishlistToggle }: any) => (
  <div>
    <h2 className="text-2xl font-bold mb-8">My Wishlist</h2>
    {products.length === 0 ? (
      <div className="text-center py-16">
        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Your wishlist is empty</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <ProductCard 
            key={product.id}
            product={product}
            onSelect={onProductSelect}
            onWishlistToggle={onWishlistToggle}
            isInWishlist={true}
          />
        ))}
      </div>
    )}
  </div>
);

const ProfileSection = ({ user }: any) => (
  <div>
    <h2 className="text-2xl font-bold mb-8">My Profile</h2>
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
          {user?.name?.charAt(0) || user?.email.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="text-xl font-bold">{user?.name || 'User'}</h3>
          <p className="text-gray-400">{user?.email}</p>
          <div className="text-sm text-purple-300 mt-1 capitalize">{user?.role}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold">Account Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Member since</span>
              <span>2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Orders</span>
              <span>12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Wishlist</span>
              <span>8</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Quick Actions</h4>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-700/50 hover:bg-gray-600/50 transition">
              <CreditCard size={18} /> Payment Methods
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-700/50 hover:bg-gray-600/50 transition">
              <MapPin size={18} /> Addresses
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-700/50 hover:bg-gray-600/50 transition">
              <Bell size={18} /> Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Keep the existing ProductCard, ProductModal, and CartDrawer components from previous implementation
// (They should be included in your actual code)

// Add these missing imports at the top
import { BarChart3 } from 'lucide-react';

// Enhanced Product Card with proper wishlist animation
const ProductCard = ({ product, onSelect, onWishlistToggle, isInWishlist }: any) => {
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlistAnimating(true);
    onWishlistToggle(product.id);
    setTimeout(() => setIsWishlistAnimating(false), 600);
  };

  return (
    <div 
      className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 transition-all hover:scale-[1.02] hover:shadow-2xl overflow-hidden group cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <div className="relative">
        {/* Image placeholder */}
        <div className="h-48 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700/50 rounded-2xl mx-auto mb-2 flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-sm text-gray-400">Product Image</p>
          </div>
        </div>
        
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
            isInWishlist 
              ? 'bg-pink-500/20 text-pink-400' 
              : 'bg-gray-900/30 text-gray-400 hover:bg-pink-500/20 hover:text-pink-400'
          } ${isWishlistAnimating ? 'animate-ping' : ''}`}
        >
          <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
        
        {product.is_pre_order && (
          <div className="absolute top-3 left-3 bg-yellow-500/20 backdrop-blur-sm text-yellow-300 px-3 py-1 rounded-full text-xs font-medium">
            PRE-ORDER
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold line-clamp-2">{product.name}</h3>
          <div className="text-right">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
            {product.original_price && (
              <span className="text-sm line-through text-gray-400 block">₹{product.original_price}</span>
            )}
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(product);
          }}
          className={`w-full font-bold py-3 rounded-2xl transition-all active:scale-95 ${
            product.is_pre_order
              ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
          }`}
        >
          {product.is_pre_order ? 'Pre-Order Now' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// Enhanced Cart Drawer with smooth animations
const CartDrawer = ({
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  discountCode,
  onDiscountCodeChange,
  appliedDiscount,
  onApplyDiscount,
  onRemoveDiscount,
  discountError,
  agreeToTerms,
  onAgreeToTermsChange,
  onCheckout,
  checkoutLoading,
  calculateTotal
}: any) => (
  <div className="fixed inset-0 z-50 overflow-hidden">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
    <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-800/80 backdrop-blur-lg border-l border-purple-800/30 shadow-xl overflow-y-auto animate-slide-in-right">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <ShoppingCart size={24} /> Your Cart
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-gray-600/50 transition"
          >
            <X size={16} />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-700/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-400 mb-6">Your cart is empty</p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-2xl transition-all active:scale-95"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.map((item: any, index: number) => (
                <div 
                  key={index} 
                  className="rounded-2xl p-4 border border-gray-700/50 bg-gray-900/20 backdrop-blur-sm animate-fade-in"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold line-clamp-2">
                        {item.selectedMod ? `${item.name} - ${item.selectedMod.name}` : item.name}
                      </h3>
                      {item.is_pre_order && (
                        <span className="text-xs text-yellow-300 bg-yellow-500/10 px-2 py-1 rounded-full">Pre-Order</span>
                      )}
                    </div>
                    <button 
                      onClick={() => onRemoveItem(index)}
                      className="w-6 h-6 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition ml-2"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-700/50 rounded-xl hover:bg-gray-600/50 transition"
                      >
                        -
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-700/50 rounded-xl hover:bg-gray-600/50 transition"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-lg">
                      ₹{(item.selectedMod ? item.selectedMod.price : item.price) * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              {/* Discount code section */}
              <div>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Tag size={16} /> Discount Code
                </h3>
                {appliedDiscount ? (
                  <div className="bg-green-900/20 border border-green-800/50 rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <span className="font-bold">{appliedDiscount.code}</span>
                      <span className="text-sm text-gray-300 ml-2">
                        ({appliedDiscount.discount}{appliedDiscount.type === 'percentage' ? '% off' : '₹ off'})
                      </span>
                    </div>
                    <button 
                      onClick={onRemoveDiscount}
                      className="text-gray-300 hover:text-white transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => onDiscountCodeChange(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-sm"
                    />
                    <button
                      onClick={onApplyDiscount}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-2xl transition-all active:scale-95"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {discountError && (
                  <p className="text-red-400 text-sm mt-2">{discountError}</p>
                )}
              </div>
              
              {/* Order summary */}
              <div className="bg-gray-700/30 rounded-2xl p-5 border border-gray-600/30">
                <h3 className="font-bold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal</span>
                    <span>₹{calculateTotal().subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between">
                      <span className="text-gray-300">Discount</span>
                      <span className="text-green-400">
                        -₹{calculateTotal().discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-gray-600/30">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                      ₹{calculateTotal().total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms agreement */}
              <div className="bg-gray-700/20 rounded-2xl p-4 border border-gray-600/20">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={() => onAgreeToTermsChange(!agreeToTerms)}
                    className="mt-1 rounded"
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the terms and understand that digital products are non-refundable after delivery.
                  </span>
                </label>
              </div>
              
              {/* Checkout button */}
              <button
                onClick={onCheckout}
                disabled={!agreeToTerms || checkoutLoading}
                className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl transition-all active:scale-95 ${
                  !agreeToTerms || checkoutLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {checkoutLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);
