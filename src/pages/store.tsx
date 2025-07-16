import { useState, useEffect } from 'react';
import { ShoppingCart, Tag, Star, ShieldCheck, Send, History, Search, AlertTriangle, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import Link from 'next/link';

const products = {
  bundles: [
    {
      id: 'premium-pack',
      title: 'PREMIUM PACK (SPECIAL OFFER)',
      price: 350,
      originalPrice: 1000,
      description: 'Includes: 1 Netflix Account + 2 RC24 IDs + 2 RC Swap IDs + PRO Membership + 1 Free Item',
      image: '/store/premium-pack.jpg',
      tags: ['Bundle', 'Limited', 'Best Value'],
      isSpecialOffer: true,
      includes: [
        { id: 'netflix-premium', title: 'Netflix Premium Account', quantity: 1 },
        { id: 'rc24-id-level20', title: 'RC24 ID (Level 20)', quantity: 2 },
        { id: 'rc24-swap-id', title: 'RC Swap ID', quantity: 2 },
        { id: 'pro-membership', title: 'PRO Membership', quantity: 1 }
      ]
    }
  ],
  accounts: [
    {
      id: 'rc24-id-level20',
      title: 'RC24 ID (Level 20)',
      price: 30,
      originalPrice: 70,
      description: 'Real Cricket 24 account with level 20 progression',
      image: '/store/rc24-id.jpg',
      tags: ['Digital', 'Limited', 'Discount']
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
      id: 'rc24-swap-id',
      title: 'Real Cricket Swap ID',
      price: 130,
      originalPrice: 300,
      description: 'Premium account with exclusive items and unlocked features',
      image: '/store/rc24-id.jpg',
      tags: ['Digital', 'Limited']
    },
    {
      id: 'pro-membership',
      title: 'PRO Membership',
      price: 200,
      description: 'Exclusive membership with special benefits',
      image: '/store/membership.jpg',
      tags: ['Membership', 'Exclusive']
    },
    {
      id: 'rc24-id-level50',
      title: 'RC24 ID (Level 50)',
      price: 70,
      originalPrice: 150,
      description: 'Real Cricket 24 account with level 50 progression',
      image: '/store/rc24-id.jpg',
      tags: ['Digital', 'Limited', 'Discount']
    },
    {
      id: 'rc24-id-level85',
      title: 'RC24 ID (Level 85)',
      price: 110,
      originalPrice: 270,
      description: 'Real Cricket 24 account with level 85 progression',
      image: '/store/rc24-id.jpg',
      tags: ['Digital', 'Limited', 'Discount']
    }
  ],
  tools: [
    {
      id: 'all-in-one-checker',
      title: 'All-in-One Checker',
      price: 80,
      description: 'Comprehensive tool for verifying jerseys, helmets, bats and more across all games',
      image: '/store/checker.jpg',
      tags: ['Tool', 'Instant Delivery']
    },
    {
      id: 'boundary-hoarding-checker',
      title: 'Boundary Hoarding Checker',
      price: 70,
      description: 'Professional tool for verifying boundary hoardings in Real Cricket games',
      image: '/store/hoarding-checker.jpg',
      tags: ['Tool', 'Instant Delivery']
    }
  ],
  services: [
    {
      id: 'website',
      title: 'Custom webpage',
      price: 100,
      originalPrice: 2500,
      description: 'Premium website with hosting starting from 100RS per page',
      image: '/store/rc24-id.jpg',
      tags: ['Digital', 'Custom']
    },
    {
      id: 'obb',
      title: 'Personal OBB',
      price: 349,
      originalPrice: 700,
      description: 'Premium custom player obb.',
      image: '/store/rc24-id.jpg',
      tags: ['Digital', 'Custom']
    }
  ],
  mods: [
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
        }
      ]
    }
  ]
};

const sellers = [
  {
    id: 'd4vd',
    name: 'd4vd',
    role: 'Co-Owner',
    avatar: '/assets/d4vd-avatar.jpg',
    telegram: 'https://t.me/lyastral'
  },
  {
    id: 'shiva',
    name: 'Shiva',
    role: 'Owner',
    avatar: '/assets/shiva-avatar.jpg',
    telegram: 'https://t.me/shivaxd42'
  }
];

const discountCodes = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    minPurchase: 100,
    validUntil: new Date(Date.now() + 1000 * 60 * 60 * 3)
  },
  {
    code: 'SX20',
    discountType: 'percentage',
    value: 20,
    minPurchase: 200,
    validUntil: new Date(Date.now() + 1000 * 60 * 60 * 3)
  },
  {
    code: 'SAVE50',
    discountType: 'fixed',
    value: 50,
    minPurchase: 250,
    validUntil: new Date(Date.now() + 1000 * 60 * 60 * 3)
  }
];

const categories = [
  'All',
  'Bundles',
  'Accounts',
  'Tools',
  'Services',
  'Mods'
];

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'discount', label: 'Best Discount' }
];

export default function StorePage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [receiptHistory, setReceiptHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewHistory, setViewHistory] = useState(false);
  const [selectedModProduct, setSelectedModProduct] = useState(null);
  const [selectedModItem, setSelectedModItem] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountError, setDiscountError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const [showCategories, setShowCategories] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('sx-store-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      } catch (e) {
        console.error('Failed to parse cart data', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sx-store-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (product.isSpecialOffer && product.includes) {
      const itemsToAdd = product.includes.map(included => {
        const foundProduct = Object.values(products)
          .flat()
          .find(p => p.id === included.id);
        return {
          ...foundProduct,
          quantity: included.quantity,
          isBundleItem: true
        };
      });
      setCart(prev => [...prev, ...itemsToAdd]);
      return;
    }
    
    if (product.id === 'mod-menus') {
      setSelectedModProduct(product);
      return;
    }
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const selectModMenuItem = (item) => {
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

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDiscount = (subtotal) => {
    if (!appliedDiscount) return 0;
    
    if (appliedDiscount.discountType === 'percentage') {
      return subtotal * (appliedDiscount.value / 100);
    } else {
      return appliedDiscount.value;
    }
  };

  const applyDiscountCode = () => {
    setDiscountError('');
    const code = discountCode.trim().toUpperCase();
    
    if (!code) {
      setDiscountError('Please enter a discount code');
      return;
    }
    
    const validCode = discountCodes.find(dc => 
      dc.code === code && 
      (!dc.validUntil || new Date(dc.validUntil) > new Date())
    );
    
    if (!validCode) {
      setDiscountError('Invalid or expired discount code');
      return;
    }
    
    const subtotal = calculateSubtotal();
    if (validCode.minPurchase && subtotal < validCode.minPurchase) {
      setDiscountError(`Minimum purchase of ₹${validCode.minPurchase} required`);
      return;
    }
    
    setAppliedDiscount(validCode);
    setDiscountCode('');
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountError('');
  };

  const generateReceipt = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = appliedDiscount ? calculateDiscount(subtotal) : 0;
    const total = subtotal - discountAmount;
    
    const receipt = {
      date: new Date().toLocaleString(),
      items: cart.map(item => ({
        id: item.id,
        title: item.selectedModItem 
          ? `${item.title} (${item.selectedModItem.title})`
          : item.title,
        price: item.price,
        quantity: item.quantity,
        selectedModItem: item.selectedModItem ?? undefined
      })),
      total: total,
      discountAmount: discountAmount,
      discountCode: appliedDiscount?.code,
      transactionId: `SX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      status: 'pending'
    };
    
    setReceiptData(receipt);
    setReceiptHistory(prev => [receipt, ...prev]);
    setCart([]);
    setAppliedDiscount(null);
    setAcceptedTerms(false);
    
    const receiptText = `
      SX STORE RECEIPT
      Transaction ID: ${receipt.transactionId}
      Date: ${receipt.date}
      
      ITEMS:
      ${receipt.items.map(item => `
      - ${item.title} x${item.quantity}: ₹${item.price * item.quantity}
      `).join('')}
      
      ${receipt.discountCode ? `
      DISCOUNT (${receipt.discountCode}): -₹${receipt.discountAmount}
      ` : ''}
      
      TOTAL: ₹${receipt.total}
      
      CONTACT SELLERS:
      ${sellers.map(seller => `
      - ${seller.name} (${seller.role}): ${seller.telegram}
      `).join('')}
    `;
    
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SX-Receipt-${receipt.transactionId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredProducts = () => {
    let allProducts = [];
    if (selectedCategory === 'All') {
      allProducts = Object.values(products).flat();
    } else {
      const categoryKey = selectedCategory.toLowerCase();
      allProducts = products[categoryKey] || [];
    }

    return allProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  };

  const sortedProducts = [...filteredProducts()].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      case 'discount':
        const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discountB - discountA;
      default:
        return 0;
    }
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = calculateSubtotal();
  const discountAmount = appliedDiscount ? calculateDiscount(subtotal) : 0;
  const total = subtotal - discountAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white relative overflow-hidden">
      <div className="particles-background">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <style jsx>{`
        .particles-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          background-color: rgba(167, 139, 250, 0.3);
          border-radius: 50%;
          pointer-events: none;
        }
        
        .particle:nth-child(1) {
          width: 3px;
          height: 3px;
          top: 10%;
          left: 20%;
          animation: float 15s infinite linear;
        }
        
        .particle:nth-child(2) {
          width: 2px;
          height: 2px;
          top: 30%;
          left: 50%;
          animation: float 20s infinite linear;
        }
        
        .particle:nth-child(3) {
          width: 1px;
          height: 1px;
          top: 60%;
          left: 30%;
          animation: float 25s infinite linear;
        }
        
        .particle:nth-child(4) {
          width: 2px;
          height: 2px;
          top: 80%;
          left: 70%;
          animation: float 18s infinite linear;
        }
        
        .particle:nth-child(5) {
          width: 3px;
          height: 3px;
          top: 40%;
          left: 80%;
          animation: float 22s infinite linear;
        }
        
        .particle:nth-child(6) {
          width: 1px;
          height: 1px;
          top: 70%;
          left: 10%;
          animation: float 17s infinite linear;
        }
        
        .particle:nth-child(7) {
          width: 2px;
          height: 2px;
          top: 20%;
          left: 60%;
          animation: float 19s infinite linear;
        }
        
        .particle:nth-child(8) {
          width: 3px;
          height: 3px;
          top: 50%;
          left: 40%;
          animation: float 21s infinite linear;
        }
        
        .particle:nth-child(9) {
          width: 1px;
          height: 1px;
          top: 90%;
          left: 30%;
          animation: float 16s infinite linear;
        }
        
        .particle:nth-child(10) {
          width: 2px;
          height: 2px;
          top: 10%;
          left: 90%;
          animation: float 24s infinite linear;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-50px) translateX(50px);
          }
          50% {
            transform: translateY(0) translateX(100px);
          }
          75% {
            transform: translateY(50px) translateX(50px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>

      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-purple-900/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-mono tracking-tighter">
            SX STORE
          </Link>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setViewHistory(true)}
              className="p-2 rounded-full bg-purple-600/30 hover:bg-purple-600/50 transition flex items-center gap-1 border border-purple-500/20"
              title="Purchase History"
            >
              <History size={20} className="text-purple-300" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-purple-600/30 hover:bg-purple-600/50 transition border border-purple-500/20"
            >
              <ShoppingCart size={24} className="text-purple-300" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-mono tracking-tight">
            SPECIAL OFFERS <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full">ENDS TODAY 3:00 IST</span>
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {products.bundles
              .filter(product => product.isSpecialOffer)
              .map(product => (
                <div key={product.id} className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl overflow-hidden border-2 border-purple-500/30 shadow-lg shadow-purple-500/10 backdrop-blur-sm">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="h-48 bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg overflow-hidden flex items-center justify-center">
                          <span className="text-xl font-bold text-white/80">PREMIUM BUNDLE</span>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-bold text-white/90">{product.title}</h3>
                          <div className="text-right">
                            <span className="text-3xl font-bold text-green-400">₹{product.price}</span>
                            <span className="block text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-bold mb-2 text-white/80">Includes:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {product.includes?.map(item => (
                              <li key={item.id} className="flex items-center gap-2 text-white/70">
                                <span className="text-green-400">✓</span>
                                <span>{item.quantity}x {item.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/30"
                        >
                          Add Premium Pack to Cart - ₹350
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-purple-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-900/50 text-white/90"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <button 
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-lg transition border border-purple-900/50 backdrop-blur-sm"
              >
                {selectedCategory}
                {showCategories ? <ChevronUp size={18} className="text-purple-400" /> : <ChevronDown size={18} className="text-purple-400" />}
              </button>
              {showCategories && (
                <div className="absolute z-10 mt-1 w-48 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-purple-900/50">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowCategories(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-purple-900/30 ${category === selectedCategory ? 'bg-purple-600/50' : ''}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-lg transition border border-purple-900/50 backdrop-blur-sm"
              >
                {sortOptions.find(opt => opt.value === sortOption)?.label || 'Sort'}
                {showSortOptions ? <ChevronUp size={18} className="text-purple-400" /> : <ChevronDown size={18} className="text-purple-400" />}
              </button>
              {showSortOptions && (
                <div className="absolute z-10 right-0 mt-1 w-48 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-purple-900/50">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortOption(option.value);
                        setShowSortOptions(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-purple-900/30 ${option.value === sortOption ? 'bg-purple-600/50' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedProducts.length > 0 ? (
            sortedProducts
              .filter(product => !product.isSpecialOffer)
              .map(product => (
                <div key={product.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-900/30 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                  <div className="h-48 bg-gradient-to-br from-purple-900/50 to-blue-900/50 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <span className="text-lg">SX Product</span>
                    </div>
                    {product.originalPrice && (
                      <div className="absolute top-4 left-4 bg-pink-500 text-xs font-bold px-2 py-1 rounded">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white/90">{product.title}</h3>
                      <div className="text-right">
                        {product.modMenuItems ? (
                          <span className="text-sm text-purple-300">Starting at ₹{Math.min(...product.modMenuItems.map(i => i.price))}</span>
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
                        <span key={tag} className="text-xs bg-purple-900/30 px-2 py-1 rounded text-purple-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} /> {product.modMenuItems ? 'Select Options' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search size={48} className="mx-auto text-purple-500/50 mb-4" />
              <p className="text-gray-400">No products found matching your search</p>
            </div>
          )}
        </section>

        <section className="bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-xl p-6 mb-12 backdrop-blur-sm border border-purple-500/30">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2 text-white/90">SX Premium Membership</h2>
              <p className="text-gray-200 mb-4">
                Enjoy exclusive discounts, early access to new products, and priority support
              </p>
              <Link href="/membership" className="bg-white/90 text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-white transition">
                Learn More
              </Link>
            </div>
            <div className="bg-white/10 p-4 rounded-lg border border-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-300" size={24} />
                <div>
                  <div className="font-bold text-white/90">Members Only</div>
                  <div className="text-sm text-purple-300">Exclusive 5% discount</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800/50 border-t border-purple-900/50 py-8 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-mono tracking-tight">
                SX STORE
              </Link>
              <p className="text-gray-400 text-sm mt-1">Premium Digital Marketplace</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <div className="text-center">
                <h3 className="font-bold text-gray-300 mb-2">Legal</h3>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li>
                    <Link href="/terms" className="hover:text-purple-400 transition">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/refund" className="hover:text-purple-400 transition">
                      Refund Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-purple-400 transition">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-purple-900/50 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} SX Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-gray-800/90 backdrop-blur-lg shadow-xl border-l border-purple-900/50">
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-bold text-white/90">Your Shopping Cart</h2>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-gray-400 hover:text-white text-2xl"
                    >
                      &times;
                    </button>
                  </div>

                  {cart.length === 0 ? (
                    <div className="mt-12 text-center">
                      <ShoppingCart size={48} className="mx-auto text-purple-500/50 mb-4" />
                      <p className="text-gray-400">Your cart is currently empty</p>
                    </div>
                  ) : (
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-purple-900/50">
                          {cart.map(item => (
                            <li key={item.id + (item.selectedModItem?.id ?? '')} className="py-6 flex">
                              <div className={`h-16 w-16 flex-shrink-0 rounded-md overflow-hidden ${
                                item.selectedModItem 
                                  ? `border-transparent bg-gradient-to-r ${item.selectedModItem.color} shadow-lg`
                                  : 'bg-gradient-to-br from-purple-900/50 to-blue-900/50'
                              }`}>
                                <div className="h-full w-full flex items-center justify-center text-white">
                                  <Tag size={20} />
                                </div>
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex justify-between text-base">
                                  <h3 className="font-medium text-white/90">
                                    {item.title}
                                    {item.selectedModItem && (
                                      <span className="block text-sm text-purple-300">{item.selectedModItem.title}</span>
                                    )}
                                  </h3>
                                  <p className="ml-4 font-bold text-purple-400">₹{item.price * item.quantity}</p>
                                </div>
                                <div className="flex items-center mt-2">
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="text-gray-400 hover:text-white px-2"
                                  >
                                    -
                                  </button>
                                  <span className="mx-2 text-white/80">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="text-gray-400 hover:text-white px-2"
                                  >
                                    +
                                  </button>
                                  <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto text-sm text-pink-400 hover:text-pink-300"
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
                  <div className="border-t border-purple-900/50 p-6">
                    {!receiptData && !appliedDiscount && (
                      <div className="mb-4">
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Discount code"
                            className="flex-1 px-3 py-2 bg-gray-700/50 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-900/50 text-white/90"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                          />
                          <button
                            onClick={applyDiscountCode}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg"
                          >
                            Apply
                          </button>
                        </div>
                        {discountError && (
                          <p className="text-pink-400 text-sm">{discountError}</p>
                        )}
                      </div>
                    )}

                    {appliedDiscount && !receiptData && (
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4 flex justify-between items-center backdrop-blur-sm">
                        <div>
                          <div className="font-medium text-green-400">
                            Discount Applied: {appliedDiscount.code}
                          </div>
                          <div className="text-sm text-green-300">
                            {appliedDiscount.discountType === 'percentage' 
                              ? `${appliedDiscount.value}% off`
                              : `₹${appliedDiscount.value} off`}
                          </div>
                        </div>
                        <button 
                          onClick={removeDiscount}
                          className="text-green-300 hover:text-green-200"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-white/80">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                      </div>
                      {appliedDiscount && (
                        <div className="flex justify-between text-green-400">
                          <span>Discount ({appliedDiscount.code})</span>
                          <span>-₹{discountAmount}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold border-t border-purple-900/50 pt-2 text-white/90">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                    </div>

                    {receiptData ? (
                      <div className="space-y-4">
                        <div className="bg-gray-700/50 p-4 rounded-lg backdrop-blur-sm border border-purple-900/50">
                          <div className="flex items-center gap-2 text-green-400 mb-2">
                            <ShieldCheck size={20} />
                            <span>Order Processed Successfully</span>
                          </div>
                          <p className="text-sm text-purple-300 mb-2">
                            Transaction ID: {receiptData.transactionId}
                          </p>
                          <p className="text-xs text-gray-400 mb-4">
                            Receipt downloaded as TXT file
                          </p>

                          <div className="mt-6">
                            <h3 className="font-bold mb-3 text-center text-white/90">Contact Our Team</h3>
                            <div className="flex flex-col gap-4">
                              {sellers.map(seller => (
                                <div key={seller.id} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg border border-purple-900/30">
                                  <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-900 to-blue-900 overflow-hidden">
                                      <div className="w-full h-full flex items-center justify-center text-white">
                                        {seller.name.charAt(0)}
                                      </div>
                                    </div>
                                    <span className="absolute -bottom-1 -right-1 bg-pink-500 text-xs px-1 rounded-full">
                                      {seller.role}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-white/90">{seller.name}</h4>
                                    <p className="text-xs text-purple-300">{seller.role} of SX Store</p>
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
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="accept-terms"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="mt-1 mr-2 accent-purple-500"
                          />
                          <label htmlFor="accept-terms" className="text-sm text-gray-300">
                            I agree to the{' '}
                            <Link href="/terms" className="text-purple-400 hover:underline" target="_blank">
                              Terms & Conditions
                            </Link>
                            ,{' '}
                            <Link href="/privacy" className="text-purple-400 hover:underline" target="_blank">
                              Privacy Policy
                            </Link>
                            , and{' '}
                            <Link href="/refund" className="text-purple-400 hover:underline" target="_blank">
                              Refund Policy
                            </Link>
                            . I understand all purchases are final and non-refundable.
                          </label>
                        </div>
                        <button
                          onClick={generateReceipt}
                          className={`w-full text-white font-bold py-3 px-4 rounded transition ${
                            total <= 0 || !acceptedTerms
                              ? 'bg-gray-600 cursor-not-allowed'
                              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                          }`}
                          disabled={total <= 0 || !acceptedTerms}
                        >
                          Complete Purchase
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedModProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedModProduct(null)}></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div 
              className="relative bg-gray-800/90 backdrop-blur-lg rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-900/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white/90">Configure Your Mod Menu</h2>
                  <button 
                    onClick={() => setSelectedModProduct(null)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2 text-white/90">{selectedModProduct.title}</h3>
                  <p className="text-gray-300">{selectedModProduct.description}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-purple-300">Available Game Modifications:</h4>
                  {selectedModProduct.modMenuItems?.map(item => (
                    <div 
                      key={item.id}
                      onClick={() => selectModMenuItem(item)}
                      className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                        selectedModItem?.id === item.id 
                          ? `border-transparent bg-gradient-to-r ${item.color} shadow-lg`
                          : 'border-purple-900/50 hover:border-purple-500/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-white/90">{item.title}</span>
                        <span className="font-bold text-purple-400">₹{item.price}</span>
                      </div>
                      {selectedModItem?.id === item.id && (
                        <div className="flex items-center mt-2 text-sm text-green-400">
                          <Check className="mr-1" size={16} />
                          <span>Selected</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center bg-gray-700/50 p-4 rounded-lg mb-6 border border-purple-900/50">
                  <div>
                    <div className="text-sm text-purple-300">Total Price</div>
                    <div className="text-2xl font-bold text-white/90">
                      ₹{selectedModItem?.price ?? 'Select an option'}
                    </div>
                  </div>
                  <button
                    onClick={confirmModMenuSelection}
                    disabled={!selectedModItem}
                    className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 ${
                      selectedModItem 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90'
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

      {viewHistory && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setViewHistory(false)}></div>
          <div className="relative max-w-2xl mx-auto my-8 bg-gray-800/90 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden border border-purple-900/50">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white/90">Purchase History</h2>
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
                  <Search className="text-purple-400" size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-900/50 text-white/90"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {receiptHistory.length === 0 ? (
                <div className="text-center py-8">
                  <History size={48} className="mx-auto text-purple-500/50 mb-4" />
                  <p className="text-gray-400">
                    {searchTerm ? 'No matching transactions found' : 'No purchase history yet'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {receiptHistory.map(receipt => (
                    <div key={receipt.transactionId} className="bg-gray-700/50 rounded-lg p-4 border border-purple-900/50 backdrop-blur-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-white/90">{receipt.transactionId}</h3>
                          <p className="text-sm text-purple-300">{receipt.date}</p>
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
                        <div className="flex justify-between text-sm mb-1 text-white/80">
                          <span>Items:</span>
                          <span>{receipt.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                        </div>
                        {receipt.discountCode && (
                          <div className="flex justify-between text-sm text-green-400">
                            <span>Discount ({receipt.discountCode}):</span>
                            <span>-₹{receipt.discountAmount}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm font-bold text-white/90">
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
                          className="text-sm bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-white/90"
                        >
                          View Details
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
