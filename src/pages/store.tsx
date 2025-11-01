import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Zap, Star, Tag, Gift, ShieldCheck, Download, X, Check, ArrowRight, Home, Users, AlertCircle, Clock, Plus, Edit, Trash2, Search, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
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

// Toast notification component
const Toast = ({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-2xl backdrop-blur-lg border transition-all duration-300 transform translate-x-0 ${
      type === 'success' 
        ? 'bg-green-500/10 border-green-500/30 text-green-300' 
        : 'bg-red-500/10 border-red-500/30 text-red-300'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${type === 'success' ? 'bg-green-400' : 'bg-red-400'}`}></div>
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Loading skeleton component
const ProductSkeleton = () => (
  <div className="bg-gray-800/30 rounded-2xl border border-gray-700/50 overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-700/50"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-700/50 rounded mb-3"></div>
      <div className="h-4 bg-gray-700/50 rounded mb-2"></div>
      <div className="h-4 bg-gray-700/50 rounded w-2/3 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-700/50 rounded w-20"></div>
        <div className="h-10 bg-gray-700/50 rounded w-24"></div>
      </div>
    </div>
  </div>
);

// Image carousel component
const ImageCarousel = ({ images, productName }: { images: string[]; productName: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-64 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700/50 rounded-2xl mx-auto mb-2 flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <p className="text-sm">Product Image</p>
            </div>
          </div>
        </div>
      ))}
      
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </>
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
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  
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

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
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

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    showToast('Item removed from cart');
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
  };

  const applyDiscount = () => {
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
    showToast('Discount applied successfully!');
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
    showToast('Discount removed');
  };

  const calculateTotal = () => {
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
      const { subtotal, discount, total } = calculateTotal();
      
      const orderPayload = {
        items: cart.map((item) => ({
          product_id: item.id,
          name: item.selectedMod ? `${item.name} - ${item.selectedMod.name}` : item.name,
          quantity: item.quantity,
          unit_price: item.selectedMod ? item.selectedMod.price : item.price,
          selected_mod: item.selectedMod || null,
          category: item.category,
        })),
        discount: appliedDiscount ? { 
          code: appliedDiscount.code, 
          amount: discount 
        } : null,
        subtotal: subtotal,
        total: total,
        status: 'pending',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ order: orderPayload }),
      });

      if (!res.ok) {
        let errorMessage = `Failed to create order: ${res.status} ${res.statusText}`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {}
        throw new Error(errorMessage);
      }

      const data = await res.json();

      setCart([]);
      localStorage.removeItem('sx-cart');
      setShowCart(false);
      
      await loadOrders();
      
      showToast('Order placed successfully! Check "My Orders" for details.');
      
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to place order. Please try again.';
      setDiscountError(errorMessage);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const categoryNames = {
    bundle: 'Special Bundles',
    account: 'Premium Accounts',
    tool: 'Game Tools',
    service: 'Custom Services',
    mod: 'Mod Menus'
  };

  const filteredProducts = (category: string) => 
    products.filter(product => 
      product.category === category &&
      (searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );

  const allProducts = searchQuery ? 
    products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) : products;

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Enhanced Header */}
      <header className="bg-gray-800/30 backdrop-blur-xl sticky top-0 z-40 border-b border-purple-800/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-2xl bg-gray-700/50 hover:bg-gray-600/50 transition-all active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                SX Store
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600/50 rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-sm"
                />
              </div>
            </div>

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
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
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

        {/* User Profile & Orders */}
        {me ? (
          <section className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Your Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold">
                    {me.name?.charAt(0) || me.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold">{me.name || 'User'}</div>
                    <div className="text-sm text-gray-400">{me.email}</div>
                  </div>
                </div>
                <div className="text-sm text-purple-300 capitalize bg-purple-900/20 px-3 py-1 rounded-full inline-block">
                  {me.role}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Recent Orders</h3>
                {ordersLoading && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </div>
                )}
              </div>
              {myOrders.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="text-gray-400" size={24} />
                  </div>
                  <p className="text-gray-400">No orders yet</p>
                  <button
                    onClick={() => setShowCart(true)}
                    className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-2xl transition-all active:scale-95"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="rounded-xl border border-gray-700/50 p-4 bg-gray-900/20 backdrop-blur-sm hover:bg-gray-900/30 transition-all">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="text-xs text-gray-400">#{order.id?.slice(0, 8)}</div>
                        <div className="text-xs text-gray-500">
                          {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Unknown date'}
                        </div>
                        <div className={`text-xs px-3 py-1 rounded-full ${
                          order.status === 'confirmed' ? 'bg-green-500/20 text-green-300' :
                          order.status === 'paid' ? 'bg-blue-500/20 text-blue-300' :
                          order.status === 'delivered' ? 'bg-purple-500/20 text-purple-300' :
                          order.status === 'cancelled' ? 'bg-red-500/20 text-red-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {order.status || 'pending'}
                        </div>
                        <div className="text-sm font-semibold ml-auto">₹{order.total || 0}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="mb-12 bg-gray-800/40 backdrop-blur-sm border border-purple-800/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Welcome to SX Store</h3>
            <p className="text-gray-300 mb-6">Log in to access exclusive deals and manage your orders</p>
            <button
              onClick={() => router.push('/login?redirect=/store')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-2xl transition-all active:scale-95 shadow-lg"
            >
              Login to Continue
            </button>
          </section>
        )}

        {/* Products Grid */}
        {searchQuery && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">
              Search Results for "{searchQuery}" ({allProducts.length})
            </h2>
          </section>
        )}

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
                  <button className="text-sm text-gray-400 hover:text-white transition flex items-center gap-1">
                    View All <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map(product => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      onSelect={setSelectedProduct}
                      onWishlistToggle={toggleWishlist}
                      isInWishlist={wishlist.includes(product.id)}
                    />
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
                onWishlistToggle={toggleWishlist}
                isInWishlist={wishlist.includes(product.id)}
              />
            ))}
          </div>
        )}

        {productsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 && (
          <section className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-300 mb-4">No Products Available</h3>
            <p className="text-gray-400 mb-8">Products will appear here once they are added to the store.</p>
            {me?.role === 'admin' && (
              <button
                onClick={() => setShowAdminPanel(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-2xl transition-all active:scale-95"
              >
                Add Products
              </button>
            )}
          </section>
        )}
      </main>

      {/* Enhanced Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          selectedMod={selectedMod}
          onModSelect={setSelectedMod}
          onAddToCart={addToCart}
          onClose={() => {
            setSelectedProduct(null);
            setSelectedMod(null);
          }}
        />
      )}

      {/* Enhanced Cart Drawer */}
      {showCart && (
        <CartDrawer
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          discountCode={discountCode}
          onDiscountCodeChange={setDiscountCode}
          appliedDiscount={appliedDiscount}
          onApplyDiscount={applyDiscount}
          onRemoveDiscount={removeDiscount}
          discountError={discountError}
          agreeToTerms={agreeToTerms}
          onAgreeToTermsChange={setAgreeToTerms}
          onCheckout={handleCheckout}
          checkoutLoading={checkoutLoading}
          calculateTotal={calculateTotal}
        />
      )}

      {/* Enhanced Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SX Store</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium digital products for gaming enthusiasts. Get the best accounts, tools, and services with exclusive benefits.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'Store', 'Games', 'Membership'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-purple-300 transition text-sm flex items-center gap-2 group">
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-3">
                {['Terms of Service', 'Privacy Policy', 'Refund Policy'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-purple-300 transition text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect</h3>
              <div className="flex gap-3">
                <a href="https://t.me/shivaxsupportbot" target="_blank" rel="noopener noreferrer" 
                   className="w-10 h-10 bg-gray-700/50 rounded-2xl flex items-center justify-center hover:bg-purple-600/50 transition-all active:scale-95">
                  <span className="text-sm">📱</span>
                </a>
                <button className="w-10 h-10 bg-gray-700/50 rounded-2xl flex items-center justify-center hover:bg-blue-600/50 transition-all active:scale-95">
                  <span className="text-sm">💬</span>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} SX Store. Crafted for gamers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Enhanced Product Card Component
const ProductCard = ({ 
  product, 
  onSelect, 
  onWishlistToggle, 
  isInWishlist 
}: { 
  product: Product;
  onSelect: (product: Product) => void;
  onWishlistToggle: (productId: string) => void;
  isInWishlist: boolean;
}) => (
  <div 
    className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 transition-all hover:scale-[1.02] hover:shadow-2xl overflow-hidden group cursor-pointer"
    onClick={() => onSelect(product)}
  >
    <div className="relative">
      <ImageCarousel images={product.images || ['/product-placeholder.jpg']} productName={product.name} />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onWishlistToggle(product.id);
        }}
        className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
          isInWishlist 
            ? 'bg-pink-500/20 text-pink-400' 
            : 'bg-gray-900/30 text-gray-400 hover:bg-pink-500/20 hover:text-pink-400'
        }`}
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
      
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map((tag, index) => (
            <span 
              key={index} 
              className={`text-xs px-2 py-1 rounded-full ${
                tag === 'Pre-Order' 
                  ? 'bg-yellow-500/20 text-yellow-300' 
                  : 'bg-gray-700/50 text-gray-300'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
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

// Enhanced Product Modal Component
const ProductModal = ({ 
  product, 
  selectedMod, 
  onModSelect, 
  onAddToCart, 
  onClose 
}: { 
  product: Product;
  selectedMod: { name: string; price: number } | null;
  onModSelect: (mod: { name: string; price: number } | null) => void;
  onAddToCart: (product: Product) => void;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
    <div className="relative bg-gray-800/80 backdrop-blur-lg rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-800/30">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold">{product.name}</h3>
            {product.is_pre_order && (
              <div className="text-sm text-yellow-300 mt-2 flex items-center gap-2">
                <Clock size={16} /> Pre-Order Available
              </div>
            )}
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center hover:bg-gray-600/50 transition"
          >
            <X size={16} />
          </button>
        </div>
        
        <ImageCarousel images={product.images || ['/product-placeholder.jpg']} productName={product.name} />
        
        <p className="text-gray-300 my-6">{product.description}</p>
        
        {product.features && product.features.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold mb-3">Features</h4>
            <div className="space-y-2">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check size={16} className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {product.mod_options && product.mod_options.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold mb-3">Select Mod</h4>
            <div className="space-y-2">
              {product.mod_options.map((mod, index) => (
                <div 
                  key={index}
                  onClick={() => onModSelect(mod)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedMod?.name === mod.name 
                      ? 'border-purple-500 bg-purple-900/30' 
                      : 'border-gray-700 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{mod.name}</span>
                    <span className="text-purple-300 font-bold">₹{mod.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-6 border-t border-gray-700/50">
          <div>
            <span className="text-3xl font-bold">
              ₹{selectedMod ? selectedMod.price : product.price}
            </span>
            {product.original_price && (
              <span className="text-sm line-through text-gray-400 ml-2">₹{product.original_price}</span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.mod_options && product.mod_options.length > 0 && !selectedMod}
            className={`font-bold py-3 px-8 rounded-2xl transition-all active:scale-95 ${
              (product.mod_options && product.mod_options.length > 0 && !selectedMod) 
                ? 'opacity-50 cursor-not-allowed' 
                : product.is_pre_order
                  ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            }`}
          >
            {product.is_pre_order ? 'Pre-Order Now' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Enhanced Cart Drawer Component
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
    <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-800/80 backdrop-blur-lg border-l border-purple-800/30 shadow-xl overflow-y-auto">
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
                  className="rounded-2xl p-4 border border-gray-700/50 bg-gray-900/20 backdrop-blur-sm"
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
