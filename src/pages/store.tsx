import { useState, useEffect } from 'react';
import { ShoppingCart, Tag, BadgeIndianRupee, Download, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// Product data type
type Product = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  tags: string[];
};

// Cart item type
type CartItem = Product & {
  quantity: number;
};

// Store data (can be moved to a separate JSON file later)
const storeData: Product[] = [
  {
    id: 'rc24-id',
    title: 'Real Cricket 24 ID',
    price: 100,
    originalPrice: 300,
    description: 'Premium account with exclusive items',
    image: '/store/rc24-id.jpg',
    tags: ['Digital', 'Limited']
  },
  {
    id: 'all-in-one-checker',
    title: 'All-in-One Checker',
    price: 80,
    description: 'Jersey, Helmet, Bat etc checker for all games',
    image: '/store/checker.jpg',
    tags: ['Tool', 'Instant Delivery']
  },
  {
    id: 'rc20-legends',
    title: 'Real Cricket 20 Legends',
    price: 70,
    description: 'Unlock hero legends pack',
    image: '/store/rc20-legends.jpg',
    tags: ['DLC', 'Popular']
  }
];

export default function StorePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('gameStoreCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('gameStoreCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const generateReceipt = () => {
    const receipt = {
      date: new Date().toLocaleString(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      transactionId: `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    };
    setReceiptData(receipt);
    setCart([]);
  };

  const downloadReceipt = () => {
    const receiptText = `
      OFFICIAL GAME STORE RECEIPT
      ---------------------------
      Transaction ID: ${receiptData.transactionId}
      Date: ${receiptData.date}
      
      ITEMS:
      ${receiptData.items.map(item => `
      - ${item.title} x${item.quantity}: ₹${item.price * item.quantity}
      `).join('')}
      
      TOTAL: ₹${receiptData.total}
      
      DIGITALLY SIGNED:
      ${new Date().toISOString()}
      🏏 Real Cricket Store
    `;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${receiptData.transactionId}.txt`;
    link.click();
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md sticky top-0 z-10 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Game Store
          </Link>
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
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Premium Game Items
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get exclusive in-game content and upgrades at unbeatable prices
          </p>
        </section>

        {/* Products Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {storeData.map(product => (
            <div key={product.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-orange-400 transition-all hover:shadow-lg hover:shadow-orange-500/10">
              <div className="h-48 bg-gray-700 relative overflow-hidden">
                {/* Replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="text-lg">Product Image</span>
                </div>
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-xs font-bold px-2 py-1 rounded">
                    SALE
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{product.title}</h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-orange-400">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="block text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
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
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Premium Membership Banner */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Premium Membership</h2>
              <p className="text-gray-200 mb-4">
                Get exclusive discounts, early access to new items, and special rewards!
              </p>
              <button className="bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition">
                Learn More
              </button>
            </div>
            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-300" size={24} />
                <div>
                  <div className="font-bold">Members Only Deal</div>
                  <div className="text-sm">20% OFF all items</div>
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
                    <h2 className="text-2xl font-bold">Your Cart</h2>
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
                      <p className="text-gray-400">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-700">
                          {cart.map(item => (
                            <li key={item.id} className="py-6 flex">
                              <div className="h-16 w-16 flex-shrink-0 bg-gray-700 rounded-md overflow-hidden">
                                {/* Product image placeholder */}
                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                  <Tag size={20} />
                                </div>
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex justify-between text-base">
                                  <h3 className="font-medium">{item.title}</h3>
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
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span>Total</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    {receiptData ? (
                      <div className="bg-gray-700/50 p-4 rounded-lg mb-4">
                        <div className="flex items-center gap-2 text-green-400 mb-2">
                          <ShieldCheck size={20} />
                          <span>Purchase Complete!</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">
                          Transaction ID: {receiptData.transactionId}
                        </p>
                        <button
                          onClick={downloadReceipt}
                          className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition flex items-center justify-center gap-2 mt-2"
                        >
                          <Download size={18} /> Download Receipt
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={generateReceipt}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded transition"
                      >
                        Checkout
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
