// src/pages/store.tsx
import { useState, useEffect } from 'react';
import { ShoppingCart, Zap, Star, Tag, Gift, ShieldCheck, Download, X, Check, ArrowRight, Home, Users, AlertCircle, Clock, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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

const discountCodes: DiscountCode[] = [
  { code: 'WELCOME10', discount: 10, minPurchase: 100, type: 'percentage' },
  { code: 'SX20', discount: 20, minPurchase: 200, type: 'percentage' },
  { code: 'SAVE50', discount: 50, minPurchase: 250, type: 'fixed' }
];

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
  const [me, setMe] = useState<{ id: string; email: string; name?: string; role?: string } | null>(null);
  const [myOrders, setMyOrders] = useState<any[] | null>(null);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Admin states
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'account',
    price: 0,
    description: '',
    tags: [],
    features: []
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('sx-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    loadProducts();
    loadUserProfile();
  }, []);

  useEffect(() => {
    localStorage.setItem('sx-cart', JSON.stringify(cart));
  }, [cart]);

  const loadProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products || []);
      } else {
        console.error('Failed to load products:', data.message);
      }
    } catch (error) {
      console.error('Failed to load products:', error);
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
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      if (meRes.ok) {
        const meData = await meRes.json();
        setMe({ 
          id: meData.user?.id || meData.id, 
          email: meData.user?.email || meData.email, 
          name: meData.user?.name || meData.name, 
          role: meData.user?.role || meData.role 
        });
        loadOrders(token);
      } else {
        // Token might be invalid, clear it
        localStorage.removeItem('authToken');
        setMe(null);
      }
    } catch (e) {
      console.error('Failed to load user profile:', e);
      localStorage.removeItem('authToken');
      setMe(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const loadOrders = async (token: string) => {
    setOrdersLoading(true);
    try {
      const ordRes = await fetch('/api/orders', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      if (ordRes.ok) {
        const ordData = await ordRes.json();
        setMyOrders(ordData.orders || []);
      }
    } catch (e) {
      console.error('Failed to load orders:', e);
      setMyOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  // Admin functions
  const saveProduct = async (product: Partial<Product>) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please login to manage products');
      return;
    }

    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data?.message || 'Failed to save product');
      }

      await loadProducts();
      setEditingProduct(null);
      setNewProduct({
        name: '',
        category: 'account',
        price: 0,
        description: '',
        tags: [],
        features: []
      });
      alert('Product saved successfully!');
    } catch (error: any) {
      alert('Failed to save product: ' + error.message);
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please login to manage products');
      return;
    }

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || 'Failed to delete product');
      }

      await loadProducts();
      alert('Product deleted successfully!');
    } catch (error: any) {
      alert('Failed to delete product: ' + error.message);
    }
  };

  const addToCart = (product: Product) => {
    if (product.category === 'mod' && product.mod_options && product.mod_options.length > 0 && !selectedMod) {
      alert('Please select a mod option first');
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
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          selectedMod: selectedMod || undefined
        }
      ]);
    }

    setSelectedProduct(null);
    setSelectedMod(null);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
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
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
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
          id: item.id,
          name: item.name,
          qty: item.quantity,
          unitPrice: item.selectedMod ? item.selectedMod.price : item.price,
          selectedMod: item.selectedMod || null,
          category: item.category,
        })),
        discount: appliedDiscount ? { 
          code: appliedDiscount.code, 
          amount: discount 
        } : null,
        subtotal,
        total,
        status: 'pending',
      };

      console.log('Sending order payload:', orderPayload);

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order: orderPayload }),
      });

      const data = await res.json();
      console.log('Order API response:', data);

      if (!res.ok) {
        throw new Error(data?.message || `Failed to create order: ${res.status}`);
      }

      // Clear cart and show success
      setCart([]);
      localStorage.removeItem('sx-cart');
      setShowCart(false);
      
      // Reload orders to show the new one
      await loadOrders(token);
      
      alert('Order placed successfully! You can view your order in "My Orders" section.');
      
    } catch (error: any) {
      console.error('Checkout error:', error);
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
    products.filter(product => product.category === category);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
           onClick={() => setSidebarOpen(false)}></div>
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800/90 backdrop-blur-lg border-r border-purple-800/30 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SX Store
            </h2>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <nav className="space-y-2">
            <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition">
              <Home size={18} /> Home
            </Link>
            <Link href="/store" className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/30 hover:bg-purple-800/30 transition">
              <ShoppingCart size={18} /> Store
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
            {me?.role === 'admin' && (
              <button 
                onClick={() => setShowAdminPanel(true)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition w-full text-left"
              >
                <ShieldCheck size={18} /> Admin Panel
              </button>
            )}
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              SX Store
            </Link>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="hover:text-purple-300 transition">Home</Link>
            <Link href="/store" className="hover:text-purple-300 transition">Store</Link>
            <Link href="/downloads" className="hover:text-purple-300 transition">Games</Link>
            <Link href="/community" className="hover:text-purple-300 transition">Community</Link>
            <Link href="/status" className="hover:text-purple-300 transition">Status</Link>
            <Link href="/membership" className="hover:text-purple-300 transition">Membership</Link>
            {me?.role === 'admin' && (
              <button 
                onClick={() => setShowAdminPanel(true)}
                className="hover:text-purple-300 transition flex items-center gap-1"
              >
                <ShieldCheck size={16} /> Admin
              </button>
            )}
            <button 
              onClick={() => setShowCart(true)}
              className="relative p-2 rounded-full bg-purple-700/50 hover:bg-purple-600/50 transition"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </nav>
          <div className="flex items-center gap-4 md:hidden">
            {me?.role === 'admin' && (
              <button 
                onClick={() => setShowAdminPanel(true)}
                className="p-2 rounded-full bg-purple-700/50 hover:bg-purple-600/50 transition"
              >
                <ShieldCheck size={20} />
              </button>
            )}
            <button 
              onClick={() => setShowCart(true)}
              className="relative p-2 rounded-full bg-purple-700/50 hover:bg-purple-600/50 transition"
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-lg">
            Premium Digital Products
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent leading-tight">
            Exclusive Gaming Products & Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get premium accounts, tools, and custom services for your favorite games
          </p>
        </section>

        {me ? (
          <section className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-gray-800/40 border border-purple-800/30 rounded-xl p-5">
              <h3 className="text-lg font-bold mb-2">Your Profile</h3>
              <div className="text-sm text-gray-300">{me.name || 'User'}</div>
              <div className="text-sm text-gray-400">{me.email}</div>
              <div className="text-sm text-purple-300 capitalize">{me.role}</div>
              <div className="mt-3 text-xs text-gray-500">You are logged in.</div>
              <button
                onClick={() => {
                  localStorage.removeItem('authToken');
                  setMe(null);
                  setMyOrders(null);
                  router.reload();
                }}
                className="mt-4 text-sm text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </div>
            <div className="lg:col-span-2 bg-gray-800/40 border border-purple-800/30 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">My Orders</h3>
                {ordersLoading && <span className="text-xs text-gray-400">Loading…</span>}
              </div>
              {(!myOrders || myOrders.length === 0) ? (
                <div className="text-sm text-gray-400">No orders yet.</div>
              ) : (
                <div className="space-y-3">
                  {myOrders.slice(0, 5).map((o) => (
                    <div key={o.id} className="rounded-lg border border-gray-700/50 p-3 bg-gray-900/40">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="text-xs text-gray-500">ID: {o.id?.slice(0, 8)}...</div>
                        <div className="text-xs text-gray-400">
                          {o.created_at ? new Date(o.created_at).toLocaleString() : 'Unknown date'}
                        </div>
                        <div className={`text-xs px-2 py-0.5 rounded-full ${
                          o.status === 'confirmed' ? 'bg-green-500/20 text-green-300' :
                          o.status === 'paid' ? 'bg-blue-500/20 text-blue-300' :
                          o.status === 'delivered' ? 'bg-purple-500/20 text-purple-300' :
                          o.status === 'cancelled' ? 'bg-red-500/20 text-red-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {o.status || 'pending'}
                        </div>
                        <div className="text-sm font-semibold ml-auto">₹{o.total || 0}</div>
                      </div>
                      {o.items && Array.isArray(o.items) && (
                        <div className="mt-2 text-xs text-gray-400 line-clamp-2">
                          {o.items.map((it: any) => it.name).join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                  {myOrders.length > 5 && (
                    <div className="text-xs text-gray-400">Showing latest 5 orders</div>
                  )}
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="mb-12 bg-gray-800/40 border border-purple-800/30 rounded-xl p-6 text-center">
            <h3 className="text-lg font-bold mb-2">Welcome to SX Store</h3>
            <p className="text-gray-300 mb-4">Please log in to view your orders and make purchases.</p>
            <button
              onClick={() => router.push('/login?redirect=/store')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Login to Continue
            </button>
          </section>
        )}

        {Object.entries(categoryNames).map(([categoryKey, categoryName]) => {
          const categoryProducts = filteredProducts(categoryKey);
          if (categoryProducts.length === 0) return null;
          
          return (
            <section key={categoryKey} id={categoryKey === 'bundle' ? 'bundles' : categoryKey} className="mb-16">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                {categoryKey === 'bundle' && <Gift size={20} className="text-pink-400" />}
                {categoryKey === 'account' && <ShieldCheck size={20} className="text-purple-400" />}
                {categoryKey === 'tool' && <Zap size={20} className="text-blue-400" />}
                {categoryKey === 'service' && <Star size={20} className="text-yellow-400" />}
                {categoryKey === 'mod' && <Download size={20} className="text-green-400" />}
                {categoryName}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map(product => (
                  <div 
                    key={product.id} 
                    className={`bg-gray-800/30 backdrop-blur-sm rounded-xl border transition-all hover:shadow-lg overflow-hidden ${
                      product.is_pre_order 
                        ? 'border-yellow-500/50 hover:border-yellow-500/70 hover:shadow-yellow-500/10' 
                        : 'border-gray-700/50 hover:border-purple-500/50 hover:shadow-purple-500/10'
                    }`}
                  >
                    {product.is_pre_order && (
                      <div className="bg-yellow-600/20 text-yellow-300 px-4 py-2 flex items-center gap-2">
                        <Clock size={16} />
                        <span className="text-sm font-medium">PRE-ORDER</span>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold">{product.name}</h3>
                        {product.original_price && (
                          <span className="text-xs line-through text-gray-400">₹{product.original_price}</span>
                        )}
                      </div>
                      
                      {product.tags && product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className={`text-xs px-2 py-1 rounded-full ${
                                tag === 'Pre-Order' 
                                  ? 'bg-yellow-500/20 text-yellow-300' 
                                  : 'bg-gray-700/50'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-gray-300 text-sm mb-4">{product.description}</p>
                      
                      {product.features && product.features.length > 0 && (
                        <ul className="space-y-2 mb-4">
                          {product.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check size={14} className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <div className="flex justify-between items-center mt-6">
                        <div>
                          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ₹{product.price}
                          </span>
                          {product.is_pre_order && product.pre_order_discount && (
                            <div className="text-xs text-yellow-300 mt-1">
                              Save ₹{product.pre_order_discount.original_price - product.price} until {new Date(product.pre_order_discount.end_date).toLocaleDateString()}
                            </div>
                          )}
                          {product.mod_options && product.mod_options.length > 0 && (
                            <span className="text-xs text-gray-400 block">+ mod options</span>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className={`font-bold py-2 px-4 rounded-lg transition text-sm ${
                            product.is_pre_order
                              ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700'
                              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                          }`}
                        >
                          {product.is_pre_order ? 'Pre-Order Now' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {products.length === 0 && (
          <section className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-300 mb-2">No Products Available</h3>
            <p className="text-gray-400">Products will appear here once they are added to the store.</p>
            {me?.role === 'admin' && (
              <button
                onClick={() => setShowAdminPanel(true)}
                className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                Add Products
              </button>
            )}
          </section>
        )}
      </main>

      {/* Admin Panel Modal */}
      {showAdminPanel && me?.role === 'admin' && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-800/50">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Admin Product Management</h2>
                <button 
                  onClick={() => {
                    setShowAdminPanel(false);
                    setEditingProduct(null);
                    setNewProduct({
                      name: '',
                      category: 'account',
                      price: 0,
                      description: '',
                      tags: [],
                      features: []
                    });
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Product Form */}
              <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-bold mb-4">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={editingProduct ? editingProduct.name : newProduct.name || ''}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({...editingProduct, name: e.target.value})
                      : setNewProduct({...newProduct, name: e.target.value})
                    }
                    className="bg-gray-600/50 border border-gray-500/50 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                  />
                  <select
                    value={editingProduct ? editingProduct.category : newProduct.category}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({...editingProduct, category: e.target.value as any})
                      : setNewProduct({...newProduct, category: e.target.value as any})
                    }
                    className="bg-gray-600/50 border border-gray-500/50 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="account">Premium Account</option>
                    <option value="tool">Game Tool</option>
                    <option value="service">Custom Service</option>
                    <option value="mod">Mod Menu</option>
                    <option value="bundle">Bundle</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price"
                    value={editingProduct ? editingProduct.price : newProduct.price || ''}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({...editingProduct, price: Number(e.target.value)})
                      : setNewProduct({...newProduct, price: Number(e.target.value)})
                    }
                    className="bg-gray-600/50 border border-gray-500/50 rounded-lg px-3 py-2 text-white"
                  />
                  <input
                    type="number"
                    placeholder="Original Price (optional)"
                    value={editingProduct ? editingProduct.original_price || '' : newProduct.original_price || ''}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({...editingProduct, original_price: e.target.value ? Number(e.target.value) : undefined})
                      : setNewProduct({...newProduct, original_price: e.target.value ? Number(e.target.value) : undefined})
                    }
                    className="bg-gray-600/50 border border-gray-500/50 rounded-lg px-3 py-2 text-white"
                  />
                  <textarea
                    placeholder="Description"
                    value={editingProduct ? editingProduct.description : newProduct.description || ''}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({...editingProduct, description: e.target.value})
                      : setNewProduct({...newProduct, description: e.target.value})
                    }
                    rows={3}
                    className="bg-gray-600/50 border border-gray-500/50 rounded-lg px-3 py-2 text-white md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={((editingProduct ? editingProduct.tags : newProduct.tags) || []).join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                      editingProduct 
                        ? setEditingProduct({...editingProduct, tags})
                        : setNewProduct({...newProduct, tags})
                    }}
                    className="bg-gray-600/50 border border-gray-500/50 rounded-lg px-3 py-2 text-white md:col-span-2"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => editingProduct ? saveProduct(editingProduct) : saveProduct(newProduct)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  {editingProduct && (
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Products List */}
              <div>
                <h3 className="text-lg font-bold mb-4">Existing Products ({products.length})</h3>
                <div className="space-y-3">
                  {products.map(product => (
                    <div key={product.id} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{product.name}</h4>
                          <p className="text-sm text-gray-300">{product.description}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                              {product.category}
                            </span>
                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                              ₹{product.price}
                            </span>
                            {product.original_price && (
                              <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full">
                                Was ₹{product.original_price}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="p-2 bg-blue-600/50 hover:bg-blue-600/70 rounded-lg transition"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 bg-red-600/50 hover:bg-red-600/70 rounded-lg transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No products yet. Add your first product above!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`bg-gray-800/80 backdrop-blur-lg rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto ${
            selectedProduct.is_pre_order ? 'border border-yellow-500/50' : 'border border-purple-800/50'
          }`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                  {selectedProduct.is_pre_order && (
                    <div className="text-sm text-yellow-300 mt-1 flex items-center gap-1">
                      <Clock size={14} /> Pre-Order
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => {
                    setSelectedProduct(null);
                    setSelectedMod(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{selectedProduct.description}</p>
              
              {selectedProduct.is_pre_order && selectedProduct.pre_order_discount && (
                <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-yellow-300 mb-1">
                    <Tag size={16} />
                    <span className="font-medium">Pre-Order Discount</span>
                  </div>
                  <p className="text-sm text-yellow-200">
                    Book before {new Date(selectedProduct.pre_order_discount.end_date).toLocaleDateString()} to get this product for ₹{selectedProduct.price} (original price ₹{selectedProduct.pre_order_discount.original_price}).
                  </p>
                </div>
              )}
              
              {selectedProduct.mod_options && selectedProduct.mod_options.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold mb-3 text-gray-300">SELECT MOD:</h4>
                  <div className="space-y-2">
                    {selectedProduct.mod_options.map((mod, index) => (
                      <div 
                        key={index}
                        onClick={() => setSelectedMod(mod)}
                        className={`p-3 rounded-lg border cursor-pointer transition ${selectedMod?.name === mod.name ? 'border-purple-500 bg-purple-900/30' : 'border-gray-700 hover:border-purple-500/50'}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{mod.name}</span>
                          <span className="text-purple-300">₹{mod.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold">
                    ₹{selectedMod ? selectedMod.price : selectedProduct.price}
                  </span>
                  {selectedProduct.original_price && (
                    <span className="text-sm line-through text-gray-400 ml-2">₹{selectedProduct.original_price}</span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(selectedProduct)}
                  disabled={selectedProduct.mod_options && selectedProduct.mod_options.length > 0 && !selectedMod}
                  className={`font-bold py-2 px-6 rounded-lg transition ${
                    (selectedProduct.mod_options && selectedProduct.mod_options.length > 0 && !selectedMod) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : selectedProduct.is_pre_order
                        ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  {selectedProduct.is_pre_order ? 'Pre-Order Now' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-800/80 backdrop-blur-lg border-l border-purple-800/30 shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <ShoppingCart size={24} /> Your Cart
                </h2>
                <button 
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">Your cart is empty</p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-lg transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item, index) => (
                      <div 
                        key={index} 
                        className={`rounded-lg p-4 border ${
                          item.is_pre_order 
                            ? 'bg-yellow-900/10 border-yellow-700/50' 
                            : 'bg-gray-700/30 border-gray-600/30'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold">
                              {item.selectedMod ? `${item.name} - ${item.selectedMod.name}` : item.name}
                            </h3>
                            {item.is_pre_order && (
                              <span className="text-xs text-yellow-300">Pre-Order</span>
                            )}
                          </div>
                          <button 
                            onClick={() => removeFromCart(index)}
                            className="text-gray-400 hover:text-pink-500"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-600/50 rounded hover:bg-gray-500/50"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-600/50 rounded hover:bg-gray-500/50"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold">
                            ₹{(item.selectedMod ? item.selectedMod.price : item.price) * item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
                      <Tag size={16} /> Discount Code
                    </h3>
                    {appliedDiscount ? (
                      <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-3 flex justify-between items-center">
                        <div>
                          <span className="font-bold">{appliedDiscount.code}</span>
                          <span className="text-sm text-gray-300 ml-2">
                            ({appliedDiscount.discount}{appliedDiscount.type === 'percentage' ? '% off' : '₹ off'})
                          </span>
                        </div>
                        <button 
                          onClick={removeDiscount}
                          className="text-gray-300 hover:text-white"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                        <button
                          onClick={applyDiscount}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                    {discountError && (
                      <p className="text-red-400 text-sm mt-2">{discountError}</p>
                    )}
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 mb-6">
                    <h3 className="font-bold mb-3">Order Summary</h3>
                    <div className="space-y-2">
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
                      <div className="flex justify-between pt-2 border-t border-gray-600/30 mt-2">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-lg">
                          ₹{calculateTotal().total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={() => setAgreeToTerms(!agreeToTerms)}
                        className="mt-1"
                      />
                      <span className="text-sm text-gray-300">
                        I agree to the <Link href="/terms" className="text-purple-400 hover:underline">Terms of Service</Link>, 
                        <Link href="/privacy" className="text-purple-400 hover:underline"> Privacy Policy</Link>, and 
                        <Link href="/refund" className="text-purple-400 hover:underline"> Refund Policy</Link>. 
                        I understand that digital products are non-refundable after delivery.
                      </span>
                    </label>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={!agreeToTerms || checkoutLoading}
                    className={`w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition ${
                      !agreeToTerms || checkoutLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {checkoutLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900/50 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SX Store</h3>
              <p className="text-gray-400 text-sm">
                Premium digital products for gaming enthusiasts. Get the best accounts, tools, and services.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-purple-300 transition text-sm">Home</Link></li>
                <li><Link href="/store" className="text-gray-400 hover:text-purple-300 transition text-sm">Store</Link></li>
                <li><Link href="/downloads" className="text-gray-400 hover:text-purple-300 transition text-sm">Games</Link></li>
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
                  <a href="https://t.me/shivaxsupportbot" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                    @shivaxsupportbot
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
