import { useState, useEffect } from 'react';
import { ShoppingCart, Tag, Star, ShieldCheck, Send, History, Search, AlertTriangle, ChevronDown, ChevronUp, Check } from 'lucide-react';
import Link from 'next/link';

// Type definitions
interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  tags: string[];
  modMenuItems?: ModMenuItem[];
}

interface ModMenuItem {
  id: string;
  title: string;
  price: number;
  color: string;
}

interface CartItem extends Product {
  quantity: number;
  selectedModItem?: ModMenuItem;
}

interface ReceiptItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  selectedModItem?: ModMenuItem;
}

interface ReceiptData {
  date: string;
  items: ReceiptItem[];
  total: number;
  discountApplied: number;
  transactionId: string;
  status: 'pending' | 'completed';
}

interface Seller {
  id: string;
  name: string;
  role: string;
  avatar: string;
  telegram: string;
}

// Product data
const storeData: Product[] = [
  {
    id: 'rc24-id',
    title: 'Real Cricket 24 ID',
    price: 100,
    originalPrice: 300,
    description: 'Premium account with exclusive items and unlocked features',
    image: '/store/rc24-id.jpg',
    tags: ['Digital', 'Limited']
  },
  {
    id: 'all-in-one-checker',
    title: 'All-in-One Checker',
    price: 80,
    description: 'Comprehensive tool for verifying jerseys, helmets, bats and more across all games',
    image: '/store/checker.jpg',
    tags: ['Tool', 'Instant Delivery']
  },
  {
    id: 'rc20-legends',
    title: 'Real Cricket 20 Legends',
    price: 70,
    description: 'Unlock exclusive hero legends pack with rare players',
    image: '/store/rc20-legends.jpg',
    tags: ['DLC', 'Popular']
  },
  {
    id: 'boundary-hoarding-checker',
    title: 'Boundary Hoarding Checker',
    price: 70,
    description: 'Professional tool for verifying boundary hoardings in Real Cricket games',
    image: '/store/hoarding-checker.jpg',
    tags: ['Tool', 'Instant Delivery']
  },
  {
    id: 'netflix-premium',
    title: 'Netflix Premium Account',
    price: 100,
    description: '1-month premium account with 4K UHD streaming and multiple screens',
    image: '/store/netflix.jpg',
    tags: ['Digital', 'Popular']
  },
  {
    id: 'squad-editor',
    title: 'Squad Editor Pro',
    price: 100,
    description: 'Advanced squad editing tool for all Real Cricket games',
    image: '/store/squad-editor.jpg',
    tags: ['Tool', 'Instant Delivery']
  },
  {
    id: 'shots-checker',
    title: 'Shots Checker Pro',
    price: 120,
    description: 'Complete shots verification tool for Real Cricket series',
    image: '/store/shots-checker.jpg',
    tags: ['Tool', 'Instant Delivery', 'New']
  },
  {
    id: 'mod-menus',
    title: 'Premium Mod Menus',
    price: 0,
    description: 'Advanced modification menus for popular mobile games with regular updates',
    image: '/store/mod-menus.jpg',
    tags: ['Digital', 'Instant Delivery', 'Exclusive'],
    modMenuItems: [
      {
        id: 'among-us',
        title: 'Among Us Mod Menu',
        price: 150,
        color: 'from-red-500 to-pink-500'
      },
      {
        id: 'subway-surfers',
        title: 'Subway Surfers Mod Menu',
        price: 50,
        color: 'from-yellow-500 to-orange-500'
      },
      {
        id: 'real-cricket-go',
        title: 'Real Cricket GO Mod Menu',
        price: 180,
        color: 'from-green-500 to-teal-500'
      },
      {
        id: 'wcc-lite',
        title: 'WCC Lite Mod Menu',
        price: 120,
        color: 'from-blue-500 to-indigo-500'
      }
    ]
  }
];

// Sellers data
const sellers: Seller[] = [
  {
    id: 'd4vd',
    name: 'd4vd',
    role: 'Co-Owner',
    avatar: '/store/d4vd-avatar.jpg',
    telegram: 'https://t.me/lyastral'
  },
  {
    id: 'shiva',
    name: 'Shiva',
    role: 'Owner',
    avatar: '/store/shiva-avatar.jpg',
    telegram: 'https://t.me/shivaxd42'
  }
];

function isCartItem(item: unknown): item is CartItem {
  if (typeof item !== 'object' || item === null) return false;
  
  const cartItem = item as Record<string, unknown>;
  return (
    typeof cartItem.id === 'string' &&
    typeof cartItem.title === 'string' &&
    typeof cartItem.price === 'number' &&
    typeof cartItem.quantity === 'number' &&
    (cartItem.originalPrice === undefined || typeof cartItem.originalPrice === 'number') &&
    typeof cartItem.description === 'string' &&
    typeof cartItem.image === 'string' &&
    Array.isArray(cartItem.tags) &&
    cartItem.tags.every((tag: unknown) => typeof tag === 'string')
  );
}

function isReceiptData(item: unknown): item is ReceiptData {
  if (typeof item !== 'object' || item === null) return false;
  
  const receipt = item as Record<string, unknown>;
  return (
    typeof receipt.date === 'string' &&
    typeof receipt.total === 'number' &&
    typeof receipt.discountApplied === 'number' &&
    typeof receipt.transactionId === 'string' &&
    (receipt.status === 'pending' || receipt.status === 'completed') &&
    Array.isArray(receipt.items)
  );
}

export default function StorePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [receiptHistory, setReceiptHistory] = useState<ReceiptData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewHistory, setViewHistory] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');
  const [selectedModProduct, setSelectedModProduct] = useState<Product | null>(null);
  const [selectedModItem, setSelectedModItem] = useState<ModMenuItem | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('sx-store-cart');
    if (savedCart) {
      try {
        const parsed: unknown = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          const validCart = parsed.filter(isCartItem);
          setCart(validCart);
        }
      } catch (e) {
        console.error('Failed to parse cart data', e);
      }
    }
  }, []);

  // Load receipt history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('sx-store-receipts');
    if (savedHistory) {
      try {
        const parsed: unknown = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) {
          const validReceipts = parsed.filter(isReceiptData);
          setReceiptHistory(validReceipts);
        }
      } catch (e) {
        console.error('Failed to parse receipt history', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('sx-store-cart', JSON.stringify(cart));
  }, [cart]);

  // Save receipt history to localStorage
  useEffect(() => {
    localStorage.setItem('sx-store-receipts', JSON.stringify(receiptHistory));
  }, [receiptHistory]);

  const addToCart = (product: Product) => {
    if (product.id === 'mod-menus') {
      setSelectedModProduct(product);
      return;
    }
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const selectModMenuItem = (item: ModMenuItem) => {
    setSelectedModItem(item);
  };

  const confirmModMenuSelection = () => {
    if (!selectedModProduct || !selectedModItem) return;
    
    const productToAdd = {
      ...selectedModProduct,
      price: selectedModItem.price,
      selectedModItem: selectedModItem
    };
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === productToAdd.id && 
        item.selectedModItem?.id === productToAdd.selectedModItem?.id
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id && 
          item.selectedModItem?.id === productToAdd.selectedModItem?.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
    
    setSelectedModProduct(null);
    setSelectedModItem(null);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    if (discountApplied && calculateSubtotal() - 50 < 250) {
      setDiscountApplied(false);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    if (discountApplied && calculateSubtotal() - 50 < 250) {
      setDiscountApplied(false);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return discountApplied ? subtotal - 50 : subtotal;
  };

  const applyDiscount = () => {
    const subtotal = calculateSubtotal();
    const code = discountCode.trim().toUpperCase();
    
    if (code !== 'SX50') {
      setDiscountError('Invalid discount code');
      return;
    }
    
    const currentDate = new Date();
    const discountValidUntil = new Date();
    discountValidUntil.setDate(currentDate.getDate() + 3);
    
    if (currentDate > discountValidUntil) {
      setDiscountError('Discount code has expired');
      return;
    }
    
    if (subtotal < 250) {
      setDiscountError('Minimum purchase of ₹250 required');
      return;
    }
    
    setDiscountApplied(true);
    setDiscountError('');
  };

  const removeDiscount = () => {
    setDiscountApplied(false);
    setDiscountCode('');
    setDiscountError('');
  };

  const generateReceipt = () => {
    const receipt: ReceiptData = {
      date: new Date().toLocaleString(),
      items: cart.map(item => ({
        id: item.id,
        title: item.selectedModItem 
          ? `${item.title} (${item.selectedModItem.title})`
          : item.title,
        price: item.price,
        quantity: item.quantity,
        selectedModItem: item.selectedModItem || undefined
      })),
      total: calculateTotal(),
      discountApplied: discountApplied ? 50 : 0,
      transactionId: `SX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      status: 'pending'
    };
    setReceiptData(receipt);
    setReceiptHistory(prev => [receipt, ...prev]);
    setCart([]);
    setDiscountApplied(false);
    setDiscountCode('');
  };

  const copyReceiptToClipboard = () => {
    if (!receiptData) return;
    
    const receiptText = `
      SX STORE - OFFICIAL RECEIPT
      ---------------------------
      Transaction ID: ${receiptData.transactionId}
      Date: ${receiptData.date}
      
      ITEMS:
      ${receiptData.items.map(item => `
      - ${item.title} x${item.quantity}: ₹${item.price * item.quantity}
      `).join('')}
      
      ${receiptData.discountApplied > 0 ? `
      DISCOUNT: -₹${receiptData.discountApplied}
      ` : ''}
      
      TOTAL: ₹${receiptData.total}
      
      CONTACT SELLERS:
      - d4vd (Co-Owner): https://t.me/lyastral
      - Shiva (Owner): https://t.me/shivaxd2
      
      IMPORTANT RULES:
      - Please allow 24-48 hours for order processing
      - Avoid duplicate messages to ensure faster response
      - All transactions are final and non-refundable
      
      DIGITALLY SIGNED:
      ${new Date().toISOString()}
      🚀 SX Store - Premium Digital Marketplace
    `;

    navigator.clipboard.writeText(receiptText)
      .then(() => alert('Receipt copied to clipboard! Share it with the seller.'))
      .catch(() => alert('Failed to copy receipt. Please manually copy the transaction ID.'));
    
    setReceiptData({ ...receiptData, status: 'completed' });
    setReceiptHistory(prev => 
      prev.map(r => 
        r.transactionId === receiptData.transactionId 
          ? { ...r, status: 'completed' } 
          : r
      )
    );
  };

  const filteredReceipts = receiptHistory.filter(receipt =>
    receipt.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.items.some(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = calculateSubtotal();
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            SX Store
          </Link>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setViewHistory(true)}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition flex items-center gap-1"
              title="Purchase History"
            >
              <History size={20} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            SX Premium Store
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Exclusive digital products and premium game modifications
          </p>
        </section>

        {/* Store Rules Section */}
        <section className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-yellow-400 mt-1 flex-shrink-0" size={24} />
            <div>
              <h2 className="text-xl font-bold mb-3 text-yellow-300">Purchase Guidelines</h2>
              <ul className="space-y-2 text-yellow-100">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Please allow 24-48 hours for order processing and delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Avoid duplicate messages to ensure faster response times</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>All digital product sales are final and non-refundable</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {storeData.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-400 transition-all hover:shadow-lg hover:shadow-purple-500/10">
              <div className="h-48 bg-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="text-lg">SX Product</span>
                </div>
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-purple-500 text-xs font-bold px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <div className="text-right">
                    {product.modMenuItems ? (
                      <span className="text-sm text-gray-400">Starting at ₹{Math.min(...product.modMenuItems.map(i => i.price))}</span>
                    ) : (
                      <>
                        <span className="text-2xl font-bold text-purple-400">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="block text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-700 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> {product.modMenuItems ? 'Select Options' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Premium Membership Banner */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">SX Premium Membership</h2>
              <p className="text-gray-200 mb-4">
                Enjoy exclusive discounts, early access to new products, and priority support
              </p>
              <Link href="/membership" className="bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition">
                Learn More
              </Link>
            </div>
            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-300" size={24} />
                <div>
                  <div className="font-bold">Members Only</div>
                  <div className="text-sm">Exclusive 5% discount</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-gray-800 shadow-xl">
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-bold">Your Shopping Cart</h2>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <span className="sr-only">Close</span>
                      &times;
                    </button>
                  </div>

                  {cart.length === 0 ? (
                    <div className="mt-12 text-center">
                      <ShoppingCart size={48} className="mx-auto text-gray-600 mb-4" />
                      <p className="text-gray-400">Your cart is currently empty</p>
                    </div>
                  ) : (
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-700">
                          {cart.map(item => (
                            <li key={item.id + (item.selectedModItem?.id || '')} className="py-6 flex">
                              <div className={`h-16 w-16 flex-shrink-0 rounded-md overflow-hidden ${
                                item.selectedModItem 
                                  ? `bg-gradient-to-r ${item.selectedModItem.color}`
                                  : 'bg-gray-700'
                              }`}>
                                <div className="h-full w-full flex items-center justify-center text-white">
                                  <Tag size={20} />
                                </div>
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex justify-between text-base">
                                  <h3 className="font-medium">
                                    {item.title}
                                    {item.selectedModItem && (
                                      <span className="block text-sm text-gray-400">{item.selectedModItem.title}</span>
                                    )}
                                  </h3>
                                  <p className="ml-4 font-bold">₹{item.price * item.quantity}</p>
                                </div>
                                <div className="flex items-center mt-2">
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="text-gray-400 hover:text-white px-2"
                                  >
                                    -
                                  </button>
                                  <span className="mx-2">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="text-gray-400 hover:text-white px-2"
                                  >
                                    +
                                  </button>
                                  <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto text-sm text-red-400 hover:text-red-300"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-gray-700 p-6">
                    {/* Discount Code Section */}
                    {!discountApplied ? (
                      <div className="mb-4">
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Discount code"
                            className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                          />
                          <button
                            onClick={applyDiscount}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition"
                          >
                            Apply
                          </button>
                        </div>
                        {discountError && (
                          <p className="text-red-400 text-sm">{discountError}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">
                          Use code <span className="font-bold">SX50</span> for ₹50 off on orders above ₹250
                        </p>
                      </div>
                    ) : (
                      <div className="bg-gray-700/50 p-3 rounded-lg mb-4 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-green-400">
                          <Tag size={16} />
                          <span>Discount applied: -₹50 (SX50)</span>
                        </div>
                        <button
                          onClick={removeDiscount}
                          className="text-sm text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    {/* Price Summary */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                      </div>
                      {discountApplied && (
                        <div className="flex justify-between text-green-400">
                          <span>Discount</span>
                          <span>-₹50</span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold border-t border-gray-700 pt-2">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                    </div>

                    {receiptData ? (
                      <div className="space-y-4">
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 text-green-400 mb-2">
                            <ShieldCheck size={20} />
                            <span>Order Processed Successfully</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">
                            Transaction ID: {receiptData.transactionId}
                          </p>
                          <button
                            onClick={copyReceiptToClipboard}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition flex items-center justify-center gap-2 mt-2"
                          >
                            Copy Receipt to Clipboard
                          </button>
                        </div>

                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <h3 className="font-bold mb-3 text-center">Contact Our Team</h3>
                          <div className="flex flex-col gap-4">
                            {sellers.map(seller => (
                              <div key={seller.id} className="flex items-center gap-3">
                                <div className="relative">
                                  <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                      {seller.name.charAt(0)}
                                    </div>
                                  </div>
                                  <span className="absolute -bottom-1 -right-1 bg-purple-500 text-xs px-1 rounded-full">
                                    {seller.role}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{seller.name}</h4>
                                  <p className="text-xs text-gray-400">{seller.role} of SX Store</p>
                                </div>
                                <a
                                  href={seller.telegram}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                                >
                                  <Send size={18} />
                                </a>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 mt-3 text-center">
                            Please share your receipt with our team to complete your order
                          </p>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={generateReceipt}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition"
                        disabled={total <= 0}
                      >
                        Proceed to Checkout
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mod Menu Selection Modal */}
      {selectedModProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setSelectedModProduct(null)}></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div 
              className="relative bg-gray-800 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Configure Your Mod Menu</h2>
                  <button 
                    onClick={() => setSelectedModProduct(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{selectedModProduct.title}</h3>
                  <p className="text-gray-300">{selectedModProduct.description}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-gray-400">Available Game Modifications:</h4>
                  {selectedModProduct.modMenuItems?.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => selectModMenuItem(item)}
                      className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                        selectedModItem?.id === item.id 
                          ? `border-transparent bg-gradient-to-r ${item.color} shadow-lg`
                          : 'border-gray-700 hover:border-purple-500'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.title}</span>
                        <span className="font-bold">₹{item.price}</span>
                      </div>
                      {selectedModItem?.id === item.id && (
                        <div className="flex items-center mt-2 text-sm">
                          <Check className="mr-1" size={16} />
                          <span>Selected</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center bg-gray-700/50 p-4 rounded-lg mb-6">
                  <div>
                    <div className="text-sm text-gray-400">Total Price</div>
                    <div className="text-2xl font-bold">
                      ₹{selectedModItem?.price || 'Select an option'}
                    </div>
                  </div>
                  <button
                    onClick={confirmModMenuSelection}
                    disabled={!selectedModItem}
                    className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 ${
                      selectedModItem 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90'
                        : 'bg-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
                
                <div className="text-xs text-gray-500 text-center">
                  <p>Premium game modifications with regular updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
{/* Receipt History Modal */}
      {viewHistory && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50" onClick={() => setViewHistory(false)}></div>
          <div className="relative max-w-2xl mx-auto my-8 bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Purchase History</h2>
                <button 
                  onClick={() => setViewHistory(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <span className="sr-only">Close</span>
                  &times;
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="text-gray-400" size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {filteredReceipts.length === 0 ? (
                <div className="text-center py-8">
                  <History size={48} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400">
                    {searchTerm ? 'No matching transactions found' : 'No purchase history yet'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredReceipts.map(receipt => (
                    <div key={receipt.transactionId} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{receipt.transactionId}</h3>
                          <p className="text-sm text-gray-400">{receipt.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          receipt.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {receipt.status}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Items:</span>
                          <span>{receipt.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                        </div>
                        {receipt.discountApplied > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Discount:</span>
                            <span className="text-green-400">-₹{receipt.discountApplied}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm font-bold">
                          <span>Total:</span>
                          <span>₹{receipt.total}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setReceiptData(receipt);
                            setIsCartOpen(true);
                          }}
                          className="text-sm bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setReceiptData(receipt);
                            copyReceiptToClipboard();
                          }}
                          className="text-sm bg-purple-600 hover:bg-purple-500 px-3 py-1 rounded"
                        >
                          Copy Receipt
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
